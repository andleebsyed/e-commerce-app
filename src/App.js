import logo from './logo.svg';
import './App.css';
import {Products} from './components/product-page'
import {data} from './components/faker'
import {Header} from './components/Header/header'

function App() {
  return (
    <div className="App">
     <div className = "app-header"><Header /> </div>
      <div className = "products" ><Products /> </div>
    </div>
  );
}

export default App;
