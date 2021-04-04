import './App.css';
import {Products} from './components/product-page/product-page'
import {Header} from './components/Header/header'
import {Wishlist} from './components/Wishlist/wishlist'
import {Cart} from './components/Cart/cart'

// custom Hook filled with useContext , whoch is passing state and dispatch (created using useReducer)
import {useEcom} from './components/ecom-context/ecom-context'

function App() {

  const {state , dispatch} = useEcom()

  //destructure state and get value out of it to use as route value
  const {route : {value}} = state

  return (
    <div>
    <div className="App">
    <div className = "app-header"><Header /></div>
    <div className = "products" >{ value === 'products'  && <Products /> } </div>
 
    
    </div>
    <div className = "wishlist" >{ value === 'wishlist'  && <Wishlist /> } </div>
    <div className = "cart" >{value === 'cart'  && <Cart /> } </div>
    </div>
  );
}

export default App;
