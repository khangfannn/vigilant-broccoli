// src/App.js
import Header from './components/Header';
import Footer from './components/Footer';
import HomeProducts from './components/HomeProducts';
import { Route, Routes, useLocation } from 'react-router-dom';
import DetailedProducts from './components/DetailedProducts';
import ProductsByCategory from './components/ProductsByCategory';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Admin from './components/Admin';
import SearchResults from './components/SearchResults'; 
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <>
      {!isAdminRoute && <Header/>}
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path="/product/:id" element={<DetailedProducts/>}/>
        <Route path="/products/:categoryName" element={<ProductsByCategory/>}/>
        <Route path="/cart/" element={<Cart/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/search" element={<SearchResults/>}/> 
        <Route path="/" element={<HomeProducts/>}/>
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  );
}

export default App;
