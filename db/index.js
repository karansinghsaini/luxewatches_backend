const mongoose = require("mongoose");

const uri ="mongodb+srv://admin:WRqu1qQTlOpSqn8E@Luxerange.lvzn9xu.mongodb.net/luxerangedb?retryWrites=true&w=majority";

const connectDB = async () => {

    await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

    console.log("db connected");

}



module.exports = connectDB;


