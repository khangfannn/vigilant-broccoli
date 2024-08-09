const express = require('express');
const router = express.Router();
const productController = require('../mongo/products.controller');
const productsModel = require('../mongo/products.model');
const categoryModel = require('../mongo/category.model');
// const upload = require('../config/upload');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
  }
});

function checkFileUpload(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('You must provide a file name'))
  }
  cb(null, true)
}

let upload = multer({ storage: storage, fileFilter: checkFileUpload })



router.get('/', async (req, res) => {
  try {
    const products = await productController.getAll();
    res.status(200).json({
      status: 'success',
      message: 'Products fetched successfully',
      products : products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      status: 'error',
      message: 'Error processing products',
      error: error.message
    });
  }
});
router.get('/search', async (req, res) => {
  try {
    let { searchI } = req.query;

    if (!searchI) {
      return res.status(400).json({
        status: 'error',
        message: 'Search query (name) is required'
      });
    }

    searchI = searchI.trim();

    const searchResult = await productController.searchProduct(searchI);

    if (searchResult.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'No products found matching the search query',
        products: []
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Products fetched successfully',
      products: searchResult
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error searching products',
      error: error.message
    });
  }
});

router.get('/:categoryName', async (req, res, ) => {
  try {
    const {categoryName} = req.params;

    const productsByCate = await productController.getByCategoryID(categoryName);
    
      res.status(200).json({
      status: 'success  ',
      message: 'searching products with category ' + categoryName,
      products: productsByCate
      });
  }catch (error) {
    console.log(error);
  };
});
router.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const details = await productsModel.findById(id);
    if (!details) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
        data : details
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Product details fetched successfully',
      data: details
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({
      status: 'error',
      message: 'Error processing product details',
      error: error.message
    });
  }
});
// Insert a new product
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const body = req.body;

    body.image = req.file ? req.file.filename : null;

    const result = await productController.insert(body);

    res.status(201).json({
      status: 'success',
      message: 'Product inserted successfully',
      productNew: result
    });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error inserting product',
      error: error.message
    });
  }
});

//edit a  product
router.put('/edit/:_id', upload.single('image'), async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      model,
      color,
      quantity,
      price,
      storage_capacity,
      categoryID,
      isHot
    } = req.body;

    const image = req.file ? req.file.path : null;

    const updateData = {
      model,
      color,
      quantity,
      price,
      storage_capacity,
      image,
      categoryID,
      isHot
    };

    if (!image) {
      delete updateData.image;
    }

    const result = await productController.updateProduct(_id, updateData);

    res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      productUpdated: result
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating product',
      error: error.message
    });
  }
});
// Delete a product
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const DelProd = await productController.removeProd(id);
    if (!DelProd) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
      deletedProduct: DelProd
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting product',
      error: error.message
    });
  }
});


module.exports = router;
