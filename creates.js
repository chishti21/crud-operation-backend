const mongoose = require('mongoose');
const createSchema=new mongoose.Schema({
    name:String,
    email:String
})
const Creates=new mongoose.model("Creates",createSchema);
module.exports=Creates