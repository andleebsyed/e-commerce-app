import './header.css'
import { useEcom } from '../ecom-context/ecom-context'
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
export function Header() {
    const { state, dispatch } = useEcom();
    const { wishlist, cart } = state;

    const [comingProd, setComingProd] = useState('');
    return (
        <div className="header-main">
            <nav className="navbar-main">
                <div>
                    <ul className="navbar left-navbar-links">

                        <NavLink className="single-link" end activeClassName="selected" to='/'>Home</NavLink>

                        <NavLink className="single-link" end activeClassName="selected" to='/products'>Products</NavLink>

                    </ul>
                </div>
                <div className="search-bar">
                    <input type="text" id="search-box" className="search-box" placeholder="Search" onChange={(event) => setComingProd(event.target.value)} />
                    <NavLink to='/search' className="search-box-button" activeClassName="selected" onClick={() => dispatch({ type: 'SEARCH_FOR_ITEM', payload: comingProd })} >
                        <i class="material-icons">search</i>
                    </NavLink>
                </div>
                <div className="navbar right-navbar-links">
                    <div className="individual-icons">
                        <div class="badge-container">
                            <NavLink to='/wishlist' className="right-icons" activeClassName="selected"><i class="material-icons ">favorite_border</i></NavLink>
                            <div class="badge-common badge-one">{wishlist.length}</div>
                        </div>
                    </div>
                    <div class="individual-icons">
                        <div class="badge-container ">
                            <NavLink to='/account' className="right-icons" activeClassName="selected"><i class="material-icons "> account_circle </i></NavLink>
                        </div>
                    </div>
                    <div class="individual-icons last-icon">
                        <div class="badge-container">
                            <NavLink to='/cart' className="right-icons" activeClassName="selected"><i class="material-icons"> add_shopping_cart </i></NavLink>
                            <div class="badge-common badge-one">{cart.length}</div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}