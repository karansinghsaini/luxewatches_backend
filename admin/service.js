const { trusted } = require("mongoose");
const users = require("../db/models/user");

module.exports = class VendorService {
  static async networkUsers(req, res) {
    try {
      const whereArray = [];

      if (req.query.type === "users") {
        whereArray.push({ is_admin: false, is_vendor: false });
      }
      if (req.query.type === "admin") {
        whereArray.push({ is_admin: true });
      }
      if (req.query.type === "vendor") {
        whereArray.push({ is_vendor: true });
      }
      const whereString = whereArray.length ? whereArray[0] : null;
      const user = await users.find(whereString);

      return user;
    } catch (err) {
      return err;
    }
  }

  static async setAdmin(req, res) {
    try {
      const whereArray = [];
      const whereClause = req.query.user_id ? { _id: req.query.user_id } : "";

      if (req.query.is_admin !== undefined) {
        whereArray.push({ $set: { is_admin: req.query.is_admin } });
      }
      if (req.query.is_vendor !== undefined) {
        whereArray.push({ $set: { is_vendor: req.query.is_vendor } });
      }
      if (req.query.is_active !== undefined) {
        whereArray.push({ $set: { is_active: req.query.is_active } });
      }

      const whereString = whereArray.length
        ? whereArray[0]
        : null;

      // console.log(whereString);
      const user = await users.updateOne(whereClause, whereString);

      return user;
    } catch (err) {
      return err;
    }
  }
};
