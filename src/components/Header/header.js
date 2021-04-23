import './header.css'
import { useEcom } from '../ecom-context/ecom-context'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useDatabase } from '../DatabaseCalls/DatabaseCalls';
export function Header() {
    const { state, dispatch } = useEcom();
    const { wishlist, cart } = useDatabase()
    const { data } = state;
    console.log("y is wishlist not defined here ", wishlist)
    // state for searching of an item
    const [comingProd, setComingProd] = useState('');
    return (
        <div className="header-main">
            <nav className="navbar-main">
                <div>
                    <ul className="navbar left-navbar-links">
                        {/* <li className="single-link"> */}
                        <Link className="single-link" to='/'>Home</Link>
                        {/* </li> */}
                        {/* <li className="single-link"> */}
                        <Link className="single-link" to='/products'>Products</Link>
                        {/* </li> */}
                    </ul>
                </div>
                <div className="search-bar">
                    <input type="text" id="search-box" className="search-box" placeholder="Type here to Search" onChange={(event) => setComingProd(event.target.value)} />
                    <button className="search-box-button" onClick={() => dispatch({ type: 'SEARCH_FOR_ITEM', payload: comingProd })} >
                        <i class="material-icons">search</i>
                    </button>
                </div>
                <div className="navbar right-navbar-links">
                    <div className="individual-icons">
                        <div class="badge-container">
                            <Link to='/wishlist'><i class="material-icons">favorite_border</i></Link>
                            <div class="badge-common badge-one">{wishlist.length}</div>
                        </div>
                    </div>
                    <div class="individual-icons">
                        <div class="badge-container ">
                            <Link to='/wishlist'><i class="material-icons "> account_circle </i></Link>
                        </div>
                    </div>
                    <div class="individual-icons last-icon">
                        <div class="badge-container">
                            <Link to='/cart'><i class="material-icons"> add_shopping_cart </i></Link>
                            <div class="badge-common badge-one">{cart.length}</div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}