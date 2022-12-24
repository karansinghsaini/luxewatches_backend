const users = require("../db/models/user");
const Util = require("../shared/util");
const validator = require("email-validator");
const authHandler = require("../shared/authHandler.js");
const AesEncryption = require("aes-encryption");
const aes = new AesEncryption();

aes.setSecretKey(
  "11122233344455566677788822244455555555555555555231231321313aaaff"
);
module.exports = class UserService {
  static async deleteUserById(req, res) {
    try {
     
      const user = await users.findOne({ _id: req.params.id});
      if (!user) throw { errorCode: 1014 };
      await users.deleteOne({ _id: req.params.id})
      return {message: 'User deleted successfully'};
    } catch (err) {
      
      return err;
    }
  }
  static async forgotPassword(req, res) {
    try {
     
      const user = await users.findOne({ _id: req.body.id});
      if (!user) throw { errorCode: 1014 };
      if (user.password !== aes.encrypt(req.body.password)) throw { errorCode: 1015 };
      await users.updateOne({ _id:user._id}, { $set: { password: aes.encrypt(req.body.newPassword) } });
      
      return { message:"password updated successfully"};
    } catch (err) {
      
      return err;
    }
  }
  static async getUserById(req, res) {
    try {
     
      const user = await users.findOne({ _id: req.params.id});
     
      return user;
    } catch (err) {
      
      return err;
    }
  }
  static async signup(req, res) {
    try {
      const user = await users.findOne({ email: req.body.email });
      if (user) throw { errorCode: 1011 };
      const params = await this.createUserParams(req.body);
      var userModel = new users(params);
      const response = await userModel.save();
      return response;
    } catch (err) {
      return err;
    }
  }
  static async createUserParams(params) {
    const userParams = {
      name: params.name,
      email: params.email,
      password: await aes.encrypt(params.password),
      gender: params.gender,
      contact_no: params.contact_no,
      is_admin: params.is_admin,
      image_url: params.image_url,
    };

    return Util.filterUndefinedValues(userParams);
  }

  static async login(req, res) {
    const isEmail = validator.validate(req.body.email);
    if (!isEmail) {
      throw { errorCode: 1054 };
    }
    const user = await users.findOne({ email: req.body.email });
    if (!user) throw { errorCode: 1014 };

    if (user.password !== aes.encrypt(req.body.password))
      throw { errorCode: 1015 };
    //    if (!user.is_active) throw { errorCode: 1012 };

    return {
      token: await authHandler.generateToken(user.id),
    };
  }
};
