import './App.css';
import {Products} from './components/product-page/product-page'
import {Header} from './components/Header/header'
import {Wishlist} from './components/Wishlist/wishlist'
import {Cart} from './components/Cart/cart'
import {Filters} from './components/Filters/filters'
import {useEcom} from './components/ecom-context/ecom-context'

function App() {

  const {state , dispatch} = useEcom()
  const {route : {value}} = state

  return (
    <div className = "main-div">
    <div className="App">
    <div className = "app-header"><Header /></div>
    <div className = "sidebar">{ value === 'products' && <Filters />}</div>
    <div className = "products">{ value === 'products'  && <Products /> } </div>
 
    
    </div>
    <div className = "wishlist" >{ value === 'wishlist'  && <Wishlist /> } </div>
    <div className = "cart" >{value === 'cart'  && <Cart /> } </div>
    </div>
  );
}

export default App;
