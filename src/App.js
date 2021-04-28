import './App.css';
import { Products } from './components/product-page/product-page'
import { Header } from './components/Header/header'
import { Wishlist } from './components/Wishlist/wishlist'
import { Cart } from './components/Cart/cart'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { useEcom } from './components/ecom-context/ecom-context';
import { Loader } from './components/Loader/Loader';

function App() {
  const { loader } = useEcom()
  return (
    <div className="main-div">
      <Loader loader={loader} />
      <div className="app-header"><Header /></div>

      <Routes>

        <Route path="/wishlist" element={<div className="wishlist"><Wishlist /></div>} />

        <Route path="/products" element={<div className="products"><Products /></div>} />

        <Route path="/cart" element={<div className="cart"><Cart /></div>} />
      </Routes>
    </div>
  );
}

export default App;
