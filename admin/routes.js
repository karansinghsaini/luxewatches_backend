const Admin = require("./controller");
const admin = new Admin();
const authHandler=require("../shared/authHandler");

module.exports = function (app) {
  app.get("/luxerange/networkUsers",authHandler.verifyToken, (req, res) => {
    admin.networkUsers(req, res);
  });
  app.put("/luxerange/setAdmin",authHandler.verifyToken, (req, res) => {
    admin.setAdmin(req, res);
  });
  
};
