import './header.css'
import {useEcom} from '../ecom-context/ecom-context'
export function Header(){
    const {dispatch} = useEcom()
    return(
        <div>
            <div>
                <input type = "text" id = "search-box" placeholder = "Type here to Search"/>
            </div>
            <nav className = "navbar-main">
                <div>
                    <ul className = "navbar left-navbar-links">
                        <li>
                            <a onClick = {() => dispatch({type : 'products'})} className = "list-item" href = "#">Home</a>
                        </li>
                        <li>
                            <a onClick = {() => dispatch({type : 'products'})} className = "list-item"  href = "#">Products</a>
                        </li>
                    </ul>
                </div>
                <div className = "navbar right-navbar-links">
                    <span>
                        
                            <a onClick = {() => dispatch({type : 'wishlist'})} className = "list-item" href = "#">WL</a>
                    </span>

                    <span>
                        
                            <a className = "list-item"  href = "#">Acc</a>
                    </span>

                    <span>
                        
                            <a onClick = {() => dispatch({type : 'cart'})} className = "list-item"  href = "#">Cart</a>
                    </span>
                </div>
            </nav>
        </div>
    )
}