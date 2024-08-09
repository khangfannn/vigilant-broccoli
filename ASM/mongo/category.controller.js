const cateModel = require('./category.model.js');
const { model } = require('mongoose');

module.exports = { getAll, 
    getById , 
    create ,
    updateByID, 
    deleteByID};

async function getAll() {
    try {
        const result = await cateModel.find();
        return result;
    } catch (error) {
        console.log('Error : Cant get all categories: ', error);
        throw error;

    }
}

async function create(body){
    try {
        const { categoryID , categoryName } = body;


        const NewCate = new cateModel({
            categoryID,
            categoryName
        })
       const cc= await NewCate.save();
       return cc
    } catch (error) {
        console.error(`Error Adding Category: ${error}`);
        throw error;
    }
}
async function updateByID(_id, body){
    try {
        const { categoryID , categoryName } = body;
        console.log(`Attempting to update category with ID: ${_id}`);

        const result = await cateModel.findByIdAndUpdate(_id , body);

        console.log(`Update result: ${result}`);

        return result;
    } catch (error) {
        
    }
}
async function deleteByID(_id) {
    try {
        console.log(`Attempting to delete category with ID: ${_id}`);
        const result = await cateModel.findByIdAndDelete(_id);
        console.log(`Delete result: ${result}`);
        if (!result) {
            throw new Error('Cannot delete');
        }
        return result;
    } catch (error) {
        console.error(`Error deleting category: ${error}`);
        throw error;
    }
}

async function getById(categoryID) {
    try {
        const result = await cateModel.find({'categoryID' : categoryID});
        return result;
    } catch (error) {
        console.log('Error : Cant get category: ', error);
    }
}