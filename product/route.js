const Watches = require("./controller");
const watches = new Watches();

module.exports = function (app) {
  app.post("/luxerange/add_product", (req, res) => {
    watches.addProduct(req, res);
  });
  app.get("/luxerange/getProducts", (req, res) => {
    watches.getProducts(req, res);
  });
  app.put("/luxerange/updateProducts", (req, res) => {
    watches.updateProduct(req, res);
  });
  app.delete("/luxerange/deleteProducts", (req, res) => {
    watches.deleteProduct(req, res);
  });
};
