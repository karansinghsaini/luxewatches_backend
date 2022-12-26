const express = require('express');
const app = express();
const server = require('http').Server(app);
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/index');
const path = require('path');

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://luxe-watches.onrender.com"],
    credentials: true
  })
);

dotenv.config();

app.use(express.json());
-app.use(express.urlencoded({ extended: false }));
require('./user/route')(app);
require('./admin/routes')(app);
require('./product/route')(app);
Util = require('./shared/util');
Config = require('./config');
connectDB();

app.get("/", (req, res) => {
    res.send("Home page");
  });




server.listen(port, () => {
    console.log('Application running on port no', server.address().port);
});
