const User = require("./controller");
const user = new User();
const authHandler=require("../shared/authHandler");

module.exports = function (app) {
  app.post("/luxerange/signup", (req, res) => {
    user.signup(req, res);
  });
  app.post("/luxerange/login", (req, res) => {
    user.login(req, res);
  });
  app.get("/luxerange/user/:id",(req, res) => {
    user.getUserById(req, res);
  })
  app.delete("/luxerange/user/:id",authHandler.verifyToken,(req, res) => {
    user.deleteUserById(req, res);
  })
  app.put("/luxerange/user/forgot_password",authHandler.verifyToken,(req, res) => {
    user.forgotPassword(req, res);
  })
};
