const watches = require("../db/models/watches");
const Util = require("../shared/util");

module.exports = class UserService {
  
  static async getProducts(req, res) {
    try {
      const whereArray=[];
      var sort={};
      if (req.query.brand_name) {
        // console.log(req.query.brand_name.toLowerCase().split(','))
        whereArray.push({ brand_name: { $in: req.query.brand_name.toLowerCase().split(',') } });        
      }
      if (req.query.strap_type) {
        // console.log(req.query.brand_name.split(','))
        whereArray.push({ strap_type: { $in: req.query.strap_type.toLowerCase().split(',') } });        
      }
      if (req.query.gender) {
        // console.log(req.query.brand_name.split(','))
        whereArray.push({ gender: { $in: req.query.gender.toLowerCase().split(',') } });        
      }
      if (req.query.price) {
        // console.log(req.query.brand_name.split(','))
        if(req.query.price=='asc') sort["price"]=1;
        else sort["price"]=-1;
              
      }

      // console.log("whereArray",whereArray);
      const whereString=Object.assign({},...whereArray);
      // console.log(whereString);
      const response = await watches.find(whereString).sort(sort);
      const brands = await watches.distinct("brand_name");
      return ({
        response: response,
        brands: brands
      });
    } catch (err) {
      console.error(err);

      return err;
    }
  }
  static async addProduct(req, res) {
    try {
      
      const params = await this.createWatchParams(req.body);
      var watchesModel = new watches(params);
      const response = await watchesModel.save();
      return response;
    } catch (err) {
      return err;
    }
  }
  static async createWatchParams(params) {
    const watchParams = {
      brand_name: params.brand_name.toLowerCase(), 
      model_name: params.model_name.toLowerCase(),
      price: params.price,
      description: params.description,
      strap_type: params.strap_type.toLowerCase(),
      gender: params.gender.toLowerCase(),
      shape: params.shape.toLowerCase(),
      type: params.type.toLowerCase(),
      image_url: params.image_url,
    };

    return Util.filterUndefinedValues(watchParams);
  }

  static async deleteProduct(req, res) {
    try {
      const response = await watches.deleteOne({_id:req.query.product_id});
      return "Product deleted successfully";
    } catch (err) {
      return err;
    }
  }

  static async updateProduct(req, res) {
    try {
      
      const params = await this.createWatchParams(req.body);
     
      const response = await watches.findByIdAndUpdate(req.query.product_id,{ $set: params });
      return response;
    } catch (err) {
      return err;
    }
  }
  static async createWatchParams(params) {
    try{
   
    const watchParams = {
      brand_name: params.brand_name.toLowerCase(), 
      model_name: params.model_name.toLowerCase(),
      price: params.price,
      description: params.description,
      strap_type: params.strap_type.toLowerCase(),
      gender: params.gender.toLowerCase(),
      shape: params.shape.toLowerCase(),
      type: params.type.toLowerCase(),
      image_url: params.image_url,
    };
    

    return Util.filterUndefinedValues(watchParams);
  }
  catch(err){
    console.log(err);
  }
  }
};
