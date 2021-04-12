import './header.css'
import { useEcom } from '../ecom-context/ecom-context'
import { useState } from 'react';
export function Header() {
    const { state, dispatch } = useEcom();
    const { wishlist, cart, data } = state;

    // state for searching of an item
    const [comingProd, setComingProd] = useState('');

    return (
        <div className="header-main">

            <nav className="navbar-main">
                <div>
                    <ul className="navbar left-navbar-links">
                        <li>
                            <a onClick={() => dispatch({ type: 'products' })} className="list-item" href="#"><strong>Home</strong></a>
                        </li>
                        <li>
                            <a onClick={() => dispatch({ type: 'products' })} className="list-item" href="#"><strong>Products</strong></a>
                        </li>
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
                        <a onClick={() => dispatch({ type: 'wishlist' })} className="" href="#">
                            <div class="badge-container">
                                <i class="material-icons">favorite_border</i>
                                <div class="badge-common badge-one">{wishlist.length}</div>
                            </div>
                        </a>

                    </div>


                    <div className="individual-icons">
                        <a href="#">
                            <div class="badge-container ">
                                <i class="material-icons "> account_circle </i>
                            </div>

                        </a>
                    </div>

                    <div className="individual-icons last-icon">

                        <a onClick={() => dispatch({ type: 'cart' })} className="" href="#">
                            <div class="badge-container">
                                <i class="material-icons"> add_shopping_cart </i>
                                <div class="badge-common badge-one">{cart.length}</div>
                            </div>

                        </a>
                    </div>

                </div>

            </nav>
        </div>
    )
}