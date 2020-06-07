const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Укажите свое имя";
  }

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

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Повторите пароль";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
