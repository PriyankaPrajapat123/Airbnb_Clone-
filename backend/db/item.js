const mongoose = require('mongoose');
const itemsSchema = new mongoose.Schema({
       label:String,
        price:Number
});
module.exports = mongoose.model("ecoms",itemsSchema);

