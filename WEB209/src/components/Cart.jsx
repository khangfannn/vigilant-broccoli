import { useEffect, useState } from 'react';
import '../assets/css/cart.css'
import { useCartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
const Cart = () => {
  const { cart = [], removeFromCart , removeAllFromCart} = useCartContext(); // Default cart to empty array

  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item._id]: item.quantity }), {})

  );

  useEffect(() => {
    setQuantities(cart.reduce((acc, item) => ({ ...acc, [item._id]: item.quantity }), {}));
  }, [cart]);
  
  const handleUpdateQuantity = (productId) => {
    const updatedCart = cart.map(item =>
       
      item._id === productId ? { ...item, quantity: quantities[productId] , total: item.quantity * item.price} : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
      
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));

  };


  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container">
      <div className="spacing">
        <div className="cart">
          <div className="cart-header">
            <h2>Giỏ Hàng</h2>
            <div className="freeshipping">
              <span>Bạn được giao hàng miễn phí</span>
              <div className="progbar"></div>
            </div>
          </div>
          <div className="cart-order">
            <div className="cart-order_summary">
              <table className="order-summary">
                <thead className="order-summary-header">
                  <tr>
                    <th>Sản Phẩm</th>
                    <th className="soluong">Số lượng</th>
                    <th className="tong">Tổng</th>
                  </tr>
                </thead>
                <tbody className="order-summary-body">
                  {cart.map( item => ( 
                       
                    <tr key={item._id}>
                      <td id="product">
                        <div className="line-item">
                          <div className="line-item-wrapper">
                            <img src={`http://localhost:3000/images/${item.image}`} alt={item.model} className="img-media" />
                          </div>
                          <div className="line-item-info">
                            <div className="line-item-name">
                              <a href="#"><span className="item-name">{item.model}</span></a>
                              <span className="item-price">{item.price}₫</span>
                            </div>
                            <p className="item-color">{item.color}</p>
                            <p className="item-ID" style={{ display: 'none' }}>{item._id}</p>
                          </div>
                        </div>
                      </td>
                      <td id="quantity">
                        <div className="quantity-delete-container">
                          <input
                            type="number"
                            className="quantity-input"
                            value={quantities[item._id] || 1}
                            min="1"
                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                            onBlur={() =>  handleUpdateQuantity(item._id)}
                          />
                          <span className="delete-item" onClick={() => removeFromCart(item._id)}>
                            <a href="#" className="link">Bỏ</a>
                          </span>
                        </div>
                      </td>
                      <td id="total">{item.quantity* item.price}₫</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <form action="#" method="POST" className="cart-form rounded">
              <div className="price-form">
                <div className="sub-total">
                  <span className="sub-total-text">Tổng phụ </span>
                  <span className="sub-total-price">{calculateTotalPrice()}₫</span>
                </div>
                <div className="total">
                  <span className="total-text">Tổng </span>
                  <span className="total-price">{calculateTotalPrice()}₫</span>
                </div>
              </div>
              <button type="submit" name="Checkout" id="thanhtoan">
                <i className="fa-solid fa-check" id="checkout" style={{ marginRight: '8px' }}></i> Thanh toán
              </button>
              <div className="deletehome-container">
                <a href="/" id="delcart" style={{ paddingBottom: '3px' }}>
                  <i className="fa-solid fa-x" style={{ marginBottom: '-4px', marginRight: '1px' }} onClick={() => removeAllFromCart()}>
                    </i>
                </a>
                <Link to={`/`} name="homepage" id="homepage">
                  <i className="fa-solid fa-arrow-up-right-from-square" style={{ margin: '5px' }}></i> Trang chủ
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
