const adminService = require("./service");
module.exports = class AdminController {
  async networkUsers(req, res) {
    try {
      const result = await adminService.networkUsers(req, res);
      res.status(200).send(Util.success({ data: result }));
    } catch (err) {
      console.log("error in admin controller || networkUsers");
      Util.sendExceptionResponse(res, e);
    }
  }
  async setAdmin(req, res) {
    try {
      const result = await adminService.setAdmin(req, res);
      res.status(200).send(Util.success({ data: result }));
    } catch (err) {
      console.log("error in admin controller || networkUsers");
      Util.sendExceptionResponse(res, e);
    }
  }
 
};
