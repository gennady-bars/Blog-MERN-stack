const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Укажите правильный email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.password = "Укажите email";
  }

  if (data.password.length < 6) {
    errors.password = "Пароль должен состоять не менее чем из 6 символов";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Укажите пароль";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
