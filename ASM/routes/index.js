var express = require('express');
var router = express.Router();
const productController = require('../mongo/products.controller');
const categoryController = require('../mongo/category.controller');

router.get('/', async (req, res, ) => {
  try {

      const ProductData = await productController.getAll();

      const CategoryData = await categoryController.getAll();
      
      res.status(200).json({
        status: 'success',
        products: ProductData,
        categories: CategoryData,
        message: 'Data fetched successfully',
      });
  } catch (error) { 
    console.log("eror:",error);

    res.status(404).json({ 
      status: 'error',
      message: 'Error Processing Product',
      error: error.message
    });
  }
});


module.exports = router;