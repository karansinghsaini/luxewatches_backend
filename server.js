const express = require('express');
const app = express();
const server = require('http').Server(app);
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/index');
const path = require('path');

const port = process.env.PORT || 5000;

app.use(cors());
dotenv.config();

// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json({extended:false}));
require('./user/route')(app);
require('./admin/routes')(app);
require('./product/route')(app);
Util = require('./shared/util');
Config = require('./config');
connectDB();
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// });

server.listen(port, () => {
    console.log('Application running on port no', server.address().port);
});
