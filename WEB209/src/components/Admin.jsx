import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/Products';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../services/Header.js';
import '../assets/css/admin.css';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'categories'
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [productForm, setProductForm] = useState({
    model: '',
    color: '',
    quantity: 0,
    price: 0,
    storage_capacity: '',
    image: null,
    categoryID: '',
    isHot: false
  });
  const [categoryForm, setCategoryForm] = useState({
    categoryID: '',
    categoryName: '',
  });

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error(`Error fetching categories: ${error}`);
    }
  };
  
  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error(`Error fetching products: ${error}`);
    }
  };
  
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleProductInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setProductForm(prevForm => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleCategoriesInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCategory = async () => {
    if (!categoryForm.categoryID || !categoryForm.categoryName) {
      console.error('Category ID and Name are required.');
      return;
    }
      try {
       await addCategory(categoryForm);
     await fetchCategories()
      // setCategories([...categories,response.category]);
    } catch (error) {
      console.error(`Error adding category: ${error}`);
    }
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    for (const key in productForm) {
      formData.append(key, productForm[key]);
    }
    try {
      const response = await addProduct(formData);
      setProducts([response.productNew, ...products]);
    } catch (error) {
      console.error(`Error adding product: ${error}`);
    }
  };

  const handleUpdateProduct = async (id) => {
    const formData = new FormData();
    for (const key in productForm) {
      formData.append(key, productForm[key]);
    }
    try {
      const response = await updateProduct(id, formData);
      setProducts(products.map(p => (p._id === id ? response.productUpdated : p)));
    } catch (error) {
      console.error(`Error updating product: ${error}`);
    }
  };

  const handleUpdateCategory = async (id) => {
    const formData = new FormData();
    for (const key in categoryForm) {
      formData.append(key, categoryForm[key]);
    }
    try {
      const response = await updateCategory(id, formData);
      setCategories(categories.map(c => (c._id === id ? response.categoryUpdated : c)));
    } catch (error) {
      console.error(`Error updating category: ${error}`);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error(`Error deleting product: ${error}`);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(c => c._id !== id));
    } catch (error) {
      console.error(`Error deleting category: ${error}`);
    }
  };

  const handleCancel = () => {
    if (activeTab === 'products') {
      setProductForm({
        model: '',
        color: '',
        quantity: 0,
        price: 0,
        storage_capacity: '',
        image: null,
        categoryID: '',
        isHot: false
      });
    } else if (activeTab === 'categories') {
      setCategoryForm({
        categoryID: '',
        categoryName: '',
      });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <section id="sidebar">
        {/* Sidebar content */}
      </section>
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>{activeTab === 'products' ? 'Product Board' : 'Category Board'}</h1>
              <ul className="breadcrumb">
                <li><Link to="/" className='active'>Home</Link></li>
                <li><a className="active" href="#" onClick={() => handleTabChange('products')}>Product Board</a></li>
                <li><a className="active" href="#" onClick={() => handleTabChange('categories')}>Category Board</a></li>
                <li><i className="bx bx-chevron-right" /></li>
              </ul>
            </div>
          </div>
          <div className="crud-form-container">
            {activeTab === 'products' && (
              <>
                <h2>Add or Edit Product</h2>
                <form className='crud-form'>
                  <div className="form-group">
                    <input type="text" name="model" placeholder="Model" value={productForm.model} onChange={handleProductInputChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" name="color" placeholder="Color" value={productForm.color} onChange={handleProductInputChange} />
                  </div>
                  <div className="form-group">
                    <input type="number" name="quantity" placeholder="Quantity" value={productForm.quantity} onChange={handleProductInputChange} />
                  </div>
                  <div className="form-group">
                    <input type="number" name="price" placeholder="Price" value={productForm.price} onChange={handleProductInputChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" name="storage_capacity" placeholder="Storage Capacity" value={productForm.storage_capacity} onChange={handleProductInputChange} />
                  </div>
                  <div className="form-group">
                    <input type="file" name="image" onChange={handleProductInputChange} />
                  </div>
                  <div className="form-group">
                    <select name="categoryID" value={productForm.categoryID} onChange={handleProductInputChange}>
                      <option value="">Select Category</option>
                      {categories.map(c => (
                        <option key={c._id} value={c.categoryID}>{c.categoryName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <input type="checkbox" name="isHot" checked={productForm.isHot} onChange={handleProductInputChange} />
                      Is Hot
                    </label>
                  </div>
                  <div className="form-group">
                    <button type="button" className="submit-btn" onClick={handleAddProduct}>Add Product</button>
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                  </div>
                </form>
              </>
            )}
            {activeTab === 'categories' && (
              <>
                <h2>Add or Edit Category</h2>
                <form>
                  <div className="form-group">
                    <input type="text" name="categoryID" placeholder="Category ID" value={categoryForm.categoryID} onChange={handleCategoriesInputChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" name="categoryName" placeholder="Category Name" value={categoryForm.categoryName} onChange={handleCategoriesInputChange} />
                  </div>
                  <div className="form-group">
                    <button type="button" className="submit-btn" onClick={handleAddCategory}>Add Category</button>
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                  </div>
                </form>
              </>
            )}
          </div>
          {activeTab === 'products' && (
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>Products</h3>
                  <i className="bx bx-search" />
                  <i className="bx bx-filter" />
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Product Model</th>
                      <th>Product Price</th>
                      <th>Product Quantity</th>
                      <th>Functions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(item => (
                      <tr key={item._id}>
                        <td>
                          <img src={`http://localhost:3000/images/${item.image}`} alt={item.image} />
                          <p>{item.model}</p>
                        </td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <button className='table-btn' onClick={() => handleUpdateProduct(item._id)}>Edit</button>
                          <button className='table-btn' onClick={() => handleDeleteProduct(item._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'categories' && (
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>Categories</h3>
                  <i className="bx bx-search" />
                  <i className="bx bx-filter" />
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Category ID</th>
                      <th>Category Name</th>
                      <th>Functions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(item => (
                      <tr key={item._id}>
                        <td>
                          <p>{item?.categoryID}</p>
                        </td>
                        <td>
                          <p>{item?.categoryName}</p>
                        </td>
                        <td>
                          <button className='table-btn' onClick={() => handleUpdateCategory(item._id)}>Edit</button>
                          <button className='table-btn' onClick={() => handleDeleteCategory(item._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </section>
    </>
  );
};

export default Admin;
