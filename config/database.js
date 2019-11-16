//set up mongoose connection
const mongoose = require('mongoose');

let isDev = process.env.NODE_ENV !== 'production'

const mongoDB = isDev ? 'mongodb://localhost/dataSecDb' : 'mongodb://datainfosec:datainfosec1@dbh23.mlab.com:27237/datainfosec'

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;


module.exports = mongoose;
