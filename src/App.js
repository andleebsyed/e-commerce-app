import './App.css';
import { Products } from './components/product-page/product-page'
import { Header } from './components/Header/header'
import { Wishlist } from './components/Wishlist/wishlist'
import { Cart } from './components/Cart/cart'
import { Route, Routes } from 'react-router-dom'
import { useEcom } from './components/ecom-context/ecom-context';
import { Loader } from './components/Loader/Loader';
import { Homepage } from './components/Homepage/Homepage'
import { Search } from './components/Search/Search'
import { Product } from './components/Product/Product'
import { useState } from 'react';
import { Login, useLogin } from './components/Login/Login'

function App() {
  const { loader, state } = useEcom()
  const { cart } = state
  const { user } = useLogin()
  const [isLoggedIn, setLoginState] = useState(false)
  // if (allowaccess === true) {
  //   setLoginState(true)
  // }
  // else {
  //   setLoginState(false)
  // }
  function PrivateRoute({ isLoggedIn, element, ...props }) {
    return (
      <Route {...props} element={user ? element : <Login />} />
    )
  }
  return (
    <div className="main-div">

      <div className="app-header"><Header /></div>
      <Loader loader={loader} />

      <Routes>
        <Route path="/" element={<div className="homepage"><Homepage /></div>} />
        <PrivateRoute path="/wishlist" element={<div className="wishlist"><Wishlist /></div>} />
        <PrivateRoute path="/products" element={<div className="products"><Products /></div>} />}

        {/* {isLoggedIn && <Route path="/products" element={<div className="products"><Products /></div>} />}
        {!isLoggedIn && <Route path="/products" element={<div className="login"><Login /></div>} />} */}
        <PrivateRoute path="/cart" element={<div className="cart"><Cart /></div>} />
        <PrivateRoute path="/search" element={<div className="searched-products"><Search /></div>} />
        <PrivateRoute path="/products/:id" element={<div className="single-product"><Product cart={cart} /></div>} />
        <Route path="/account" element={<div className="homepage"><Login /></div>} />
      </Routes>
    </div>
  );
}

export default App;
