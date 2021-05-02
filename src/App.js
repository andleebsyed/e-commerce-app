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

function App() {
  const { loader, state } = useEcom()
  const { cart } = state
  return (
    <div className="main-div">

      <div className="app-header"><Header /></div>
      <Loader loader={loader} />

      <Routes>
        <Route path="/" element={<div className="homepage"><Homepage /></div>} />
        <Route path="/wishlist" element={<div className="wishlist"><Wishlist /></div>} />

        <Route path="/products" element={<div className="products"><Products /></div>} />
        <Route path="/cart" element={<div className="cart"><Cart /></div>} />
        <Route path="/search" element={<div className="searched-products"><Search /></div>} />
        <Route path="/products/:id" element={<div className="single-product"><Product cart={cart} /></div>} />
      </Routes>
    </div>
  );
}

export default App;
