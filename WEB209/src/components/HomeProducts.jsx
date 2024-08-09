// src/components/HomeProducts.js
import { useEffect, useState } from 'react';
import { getProducts } from '../services/Products';
import { getCategories } from '../services/Header';
import { useCartContext } from '../context/CartContext'; 
import MinorBanner from './MinorBanner';
import { useNavigate } from 'react-router-dom';

const HomeProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const { addToCart } = useCartContext(); 
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
        const fetchedCategories = await getCategories();
        if (Array.isArray(fetchedCategories)) {
            setCategories(fetchedCategories);
        } else {
            console.error("Fetched categories is not an array:", fetchedCategories);
        }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?searchI=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <>
      <MinorBanner/>
      <section className="about py-5">
        <div className="container pb-lg-3">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="form-control"
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
        {categories.map(category => (
          <div className="container pb-lg-3" key={category._id}>
            <h3 className="tittle text-center" id="CategoryName">{category.categoryName}</h3>
            <div className="grid product-grid">
              {products
                .filter(product => product.categories.categoryName === category.categoryName)
                .map(product => (
                  <div className="col product-men" key={product._id}>
                    <div className="product-shoe-info shoe text-center">
                      <div className="men-thumb-item">
                        <img src={`http://localhost:3000/images/${product.image}`} className="img-fluid" alt={product.model} />
                        <button 
                          name="addtocart" 
                          id="thanhtoan" 
                          style={{ cursor: 'pointer' }} 
                          onClick={() => handleAddToCart(product)}
                        >
                          <i className="fa-solid fa-plus" aria-hidden="true"></i> Mua Ngay
                        </button>
                      </div>
                      <div className="item-info-product">
                        <h4>
                          <a href={`/product/${product._id}`} name="productname">{product.model}</a>
                        </h4>
                        <div className="product_price">
                          <div className="grid-price">
                            <span className="money" name="productprice">{product.price}</span>
                            <span className="type" name="producttype" style={{ display: 'none' }}>{product.categories.categoryName}</span>
                          </div>
                        </div>
                        <ul className="stars">
                          <li><a href="#"><span className="fa fa-star" aria-hidden="true"></span></a></li>
                          <li><a href="#"><span className="fa fa-star" aria-hidden="true"></span></a></li>
                          <li><a href="#"><span className="fa fa-star" aria-hidden="true"></span></a></li>
                          <li><a href="#"><span className="fa fa-star" aria-hidden="true"></span></a></li>
                          <li><a href="#"><span className="fa fa-star-half-o" aria-hidden="true"></span></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default HomeProducts;
