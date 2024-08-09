// src/components/SearchResults.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchIndexProduct  } from '../services/Products';
import { useCartContext } from '../context/CartContext'; 

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCartContext(); 
  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const searchQuery = query.get('searchI') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        try {
          const results = await searchIndexProduct(searchQuery);
          setProducts(results || []);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section className="about py-5">
      <div className="container pb-lg-3">
        <h3 className="tittle text-center">Search Results for &quot;{searchQuery}&quot;</h3>
        {products.length > 0 ? (
          <div className="grid product-grid">
            {products.map(product => (
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
        ) : (
          <p className="text-center">No products found for your search query.</p>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
