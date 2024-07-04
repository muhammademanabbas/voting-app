let mongoose  = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_DB_URL_LOCAL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const  db  = mongoose.connection

      db.on('connected',()=>{
        console.log('Database connected successfully!!');
      })
      db.on('disconnected',()=>{
        console.log('Database disconnected!!');
      })
      db.on('error',()=>{
        console.log('Database error while connection!!');
      })

      module.exports = db  ;