import '../assets/css/style.css';
import {useEffect,useState} from 'react'
import Categories from './Categories';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
const Header = () => {
  const { cart } = useCartContext();
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    setCartQty(totalQuantity);
  }, [cart]);

  return (
    <>
    <header className="navbar" style={{justifyContent:'space-around',position:'sticky'}}>
      <div className="logo" style={{ cursor: "pointer" }}>
        <a href="/">
          <img
            src="/src/assets/images/logo.png"
            alt="Logo"
            style={{ maxWidth: 36, maxHeight: 48 }}
          />
        </a>
      </div>

      <div className="menu">
            <Categories/>
        </div>

        
      <div className="loginsession">
        <div className="loginicon">
          <Link to={`/search?searchI=${``}`}>
          <img src="/src/assets/images/search-icon-1.png" alt="" />
          </Link>
        </div>
        <div className="loginicon">
          <Link to={`/login`}>
          <img src="/src/assets/images/login.png" alt="" />
          </Link>
        </div>
        <div className="carticon" style={{ cursor: "pointer" }}>
          <Link to={`/cart/`} >
            <img src="/src/assets/images/cart-icon.png" alt="" />
            {cartQty > 0 && (
              <span className="cart-qty">{cartQty}</span>
            )}
          </Link>
        </div>

        <div className="accountdesktop" style={{ display: "none" }}>
          <div className="header-links">
            <ul className="popup-header-links">
              <li className="li_ico-register">
                <Link to={`/signup/`} className="ico-register">
                  Tạo tài khoản ngay
                </Link>
              </li>
              <li className="li_ico-login">
                <a href="" className="ico-login">
                  Đăng nhập
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    
  </>
  )
}

export default Header