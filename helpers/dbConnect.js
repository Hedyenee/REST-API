const { default: mongoose } = require("mongoose")
require('dotenv').config()



mongoose.set('strictQuery', false); 
mongoose.connect(process.env.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},err =>{
    if (err)  throw err
    console.log('dataBase Connected !')
})