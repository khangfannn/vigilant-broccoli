const productModel = require('./products.model');
const categoryModel = require('./category.model');

module.exports = {
  getAll,
  getByCategoryID,
  searchProduct,
  insert,
  updateProduct,
  removeProd,
};


async function insert(body) {
  try {
    const { model, color, quantity, price, storage_capacity, image, categoryID, isHot } = body;

    const categoryFind = await categoryModel.findOne({ categoryID });
    if (!categoryFind) {
      throw new Error('Could not find category to insert');
    }

    const proNew = new productModel({
      model,
      color,
      quantity,
      price,
      storage_capacity,
      image,
      categories: {
        categoryID: categoryFind.categoryID,
        categoryName: categoryFind.categoryName
      },
      isHot
    });

    return await proNew.save();
  } catch (error) {
    console.error(`Error inserting product: ${error.message}`);
    throw error;
  }
}
async function updateProduct(productId, updateData) {
  try {
    const { model, color, quantity, price, storage_capacity, image, categoryID, isHot } = updateData;

    const categoryFind = await categoryModel.findOne({ categoryID });
    if (!categoryFind) {
      throw new Error(`Could not find category with ID: ${categoryID}`);
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        model,
        color,
        quantity,
        price,
        storage_capacity,
        image,
        categories: {
          categoryID: categoryFind.categoryID,
          categoryName: categoryFind.categoryName,
        },
        isHot
      },
      { new: true, runValidators: true } // This option returns the updated document and runs validators
    );

    if (!updatedProduct) {
      throw new Error(`Product with ID: ${productId} not found`);
    }

    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    throw error;
  }
}


async function getAll() {
  try {
    return await productModel.find();
  } catch (error) {
    console.error('Error: Cannot get all products:', error);
    
    throw error;
  }
}

async function getByCategoryID(categoryName) {
  try {
    console.log(`Querying for categoryName: ${categoryName}`);
    const results = await productModel.find({ 'categories.categoryName': categoryName });
    console.log(`Found ${results.length} products`);
    return results;
  } catch (error) {
    console.error(`Error: Can't get products by categoryID:`, error);
    throw error;
  }
}

async function searchProduct(model) {
  try {
    const searchResult = await productModel.find({
      model: { $regex: model, $options: 'i' },
    });
    return searchResult;
  } catch (error) {
    console.error('Error searching product:', error);
    throw error;
  }
}

async function removeProd(id) {
  try {
    const result = await productModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
