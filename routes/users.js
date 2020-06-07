const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const config = require("../configs/config");
const Users = require("../models/users");
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");

router.post("/register", async (req, res) => {
  let { name, email, password, password2 } = req.body;
  email = email && email.toLowerCase();

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await Users.findOne({ email });

    if (user) {
      errors.email = "Пользователь с таким email уже зарегистрирован!";
      return res.status(400).json(errors);
    } else {
      if (password !== password2) {
        errors.password2 = "Пароли не совпадают!";
        return res.status(400).json(errors);
      }

      const newUser = new Users({ name, email, password });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          try {
            const user = await newUser.save();

            const payload = {
              id: user.id,
              name: user.name,
              email: user.email
            };

            jwt.sign(
              payload,
              config.key,
              { expiresIn: 3600 * 24 * 30 },
              (err, token) => {
                res.cookie("jwt", token);
                return res.json({ token, user: payload });
              }
            );
          } catch (e) {
            return res.json({ error: "Ошибка" });
          }
        });
      });
    }
  } catch (e) {
    return res.send({ error: "Ошибка" });
  }
});

router.post("/login", async (req, res) => {
  
  let { email, password } = req.body;
  email = email && email.toLowerCase();

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      errors.email = "Польльзователя с таким email не найдено!";
      return res.status(400).json(errors);
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        jwt.sign(
          payload,
          config.key,
          { expiresIn: 3600 * 24 * 30 },
          (err, token) => {
            res.cookie("jwt", token);
            return res.json({ token, user: payload });
          }
        );
      } else {
        errors.password = "Неправильный пароль!";
        return res.status(400).json(errors);
      }
    } catch (e) {
      return res.json(e);
    }
  } catch (e) {
    return res.json(e);
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
