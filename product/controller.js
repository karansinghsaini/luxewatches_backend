const watchService = require("./service");
module.exports = class UserController {
  async addProduct(req, res) {
    try {
      if (req.body.brand_name && req.body.model_name && req.body.price) {
        const result = await watchService.addProduct(req, res);
        res.status(200).send(Util.success({ data: result }));
      } else {
        res.status(400).send(Util.error(1019));
      }
    } catch (err) {
      console.log("error in add Product controller");
      Util.sendExceptionResponse(res, err);
    }
  }

  async updateProduct(req, res) {
    try {
      if (req.query.product_id) {
        const result = await watchService.updateProduct(req, res);
        res.status(200).send(Util.success({ data: result }));
      } else {
        res.status(400).send(Util.error(1019));
      }
    } catch (err) {
      console.log("error in update Product controller");
      Util.sendExceptionResponse(res, err);
    }
  }

  async deleteProduct(req, res) {
    try {
      if (req.query.product_id) {
        const result = await watchService.deleteProduct(req, res);
        res.status(200).send(Util.success({ data: result }));
      } else {
        res.status(400).send(Util.error(1019));
      }
    } catch (err) {
      console.log("error in delete Product controller");
      Util.sendExceptionResponse(res, err);
    }
  }
  
  async getProducts(req, res) {
    try {
        const result = await watchService.getProducts(req, res);
        res.status(200).send(Util.success({ data: result}));
    } catch (err) {
      console.log("error in add Product controller");
      Util.sendExceptionResponse(res, err);
    }
  }
};
