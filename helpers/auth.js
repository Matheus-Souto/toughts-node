module.exports.checkAuth = function (req, res, next) {
  const userId = req.session.userid;

  if (userId) {
    next();
  } else {
    res.redirect("/login");
  }
};
