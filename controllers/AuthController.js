const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // password match validation
    if (password !== confirmpassword) {
      req.flash("message", "As senhas não conferem, tente novamente!");
      res.render("auth/register");

      return;
    }

    // check if user exists
    const checkifUserExists = await User.findOne({ where: { email } });

    if (checkifUserExists) {
      req.flash("message", "O e-mail já está cadastrado!");
      res.render("auth/register");

      return;
    }

    // create a password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);

      //initialize session
      req.session.userid = createdUser.id;

      req.flash("message", "Usuário cadastrado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }
  }
};
