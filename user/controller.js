const { error } = require("../shared/util");
const userService = require("./service");
module.exports = class UserController {
  async signup(req, res) {
    try {
      if (req.body.email && req.body.password) {
        const result = await userService.signup(req, res);
        res.status(200).send(Util.success({ data: result }));
      } else {
        res.status(400).send(Util.error(1019));
      }
    } catch (err) {
      console.log("error in user signup controller");
      Util.sendExceptionResponse(res, err);
    }
  }

  async login(req, res) {
    try {
      if (req.body.email && req.body.password) {
        const result = await userService.login(req, res);
        res.status(200).send(Util.success(result));
      } else {
        res.status(400).send(Util.error(1019));
      }
    } catch (err) {
        console.log("error in user login controller");
        Util.sendExceptionResponse(res, err);
    }
  }
  
  async getUserById(req, res) {
    try {
      if (req.params.id) {
        const result = await userService.getUserById(req, res);
        
        res.status(200).send(Util.success({data: result}));
      } else {
        res.status(400).send(Util.error(1019));
      }
    } catch (err) {
        console.log(err);
        console.log("error in get user controller");
        Util.sendExceptionResponse(res, err);
    }
  }
  async deleteUserById(req, res) {
    try {
      if (req.params.id) {
        const result = await userService.deleteUserById(req, res);
        
        res.status(200).send(Util.success({data: result}));
      } else {
        res.status(400).send(Util.error(1019));
      }
    } catch (err) {
        console.log(err);
        console.log("error in get user controller");
        Util.sendExceptionResponse(res, err);
    }
  }
  async forgotPassword(req, res) {
    try {
      // console.log(req.body.id && req.body.password && req.body.newPassword);
      if (req.body.id  && req.body.password && req.body.newPassword) {
        const result = await userService.forgotPassword(req, res);
        
        res.status(200).send(Util.success({data: result}));
      } else {
        res.status(400).send(Util.error(1019));
      }
    } catch (err) {
        console.log(err);
        console.log("error in get user controller");
        Util.sendExceptionResponse(res, err);
    }
  }
};
