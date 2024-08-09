const express = require('express');
const router = express.Router();
const categoryController = require('../mongo/category.controller');

router.get('/', async (req, res, ) => {
    try {
        const categories = await categoryController.getAll();
         res.status(200).json({ 
          status: 'Success',
          message:"Getting all categories...",
          categories: categories
        });
    } catch (error) { 
      console.log("eror:",error);
      res.status(404).json({error: "Error Proccessing Product"});
    }
  });
router.get('/:categoryID', async (req, res, ) => {
    try {
        const {categoryID} = req.params;

        console.log(`Trying to get specific category : ${categoryID}`);
        
        const categories = await categoryController.getById(categoryID);
        
        res.status(200).json({
          status: 'Success',
          message:"Getting category with ID : "+categoryID,
          categories});
  
    } catch (error) { 
      console.log("eror:",error);
      res.status(404).json({error: "Error Proccessing Product"});
    }
  });
  router.post('/add', async (req, res) => {
    try {
      const body = req.body;
  
      const result = await categoryController.create(body);
      res.status(201).json({
        status: 'success',
        message: 'Product inserted successfully',
        NewCate: result
      });
    } catch (error) {
      console.error('Error inserting :', error);
      res.status(500).json({
        status: 'error',
        message: 'Error inserting product',
        error: error.message
      });
    }
  });
  router.put('/edit/:_id', async (req, res) => {
    try {
      const { _id} =req.params;

      const  body = req.body;

      const result = await categoryController.updateByID(_id,
        body);
      res.status(201).json({
        status: 'success',
        message: 'Product inserted successfully',
        NewCate: result
      });
    } catch (error) {
      console.error('Error inserting :', error);
      res.status(500).json({
        status: 'error',
        message: 'Error inserting product',
        error: error.message
      });
    }
  });
  router.delete('/remove/:_id', async (req, res) => {
    try {
      const { _id } = req.params;
      const deletedCategory = await categoryController.deleteByID(_id);
      if (!deletedCategory) {
        return res.status(404).json({
          status: 'error',
          message: 'Category not found'
        });
      }
      res.status(200).json({
        status: 'success',
        message: 'Category deleted successfully',
        deletedCategory
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({
        status: 'error',
        message: 'Error deleting category',
        error: error.message
      });
    }
});

module.exports = router;
