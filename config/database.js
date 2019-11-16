//set up mongoose connection
const mongoose = require('mongoose');

let isDev = process.env.NODE_ENV !== 'production'

const mongoDB = isDev ? 'mongodb://localhost/dataSecDb' : 'mongodb://acadatrends:acadatrends1@ds161262.mlab.com:61262/acadatrend'

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;


module.exports = mongoose;
