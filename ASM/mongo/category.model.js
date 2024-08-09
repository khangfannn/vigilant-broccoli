//collection category in mongoDB . 

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectID = Schema.ObjectID;

const categorySchema = new Schema({
            categoryID:{type:String, required:true},
            categoryName:{type:String, required:false},
        });
module.exports = mongoose.models?.category || mongoose.model('category' , categorySchema);