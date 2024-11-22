const mongoose = require('mongoose');
const URI = 'mongodb+srv://salaoUser:Leoadrieledu@clusterdev.mwj5f.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDev'; 

const env = process.env.NODE_ENV || 'dev';
let options = {};

mongoose
  .connect(URI, options)
  .then(() => console.log('DB is Up!'))
  .catch((err) => console.log(err));