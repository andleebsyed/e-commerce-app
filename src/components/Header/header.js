import "./header.css";
import { useEcom } from "../ecom-context/ecom-context";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
export function Header() {
  const { state, dispatch } = useEcom();
  const { wishlist, cart } = state;

  let isAllowed = false;

  const [comingProd, setComingProd] = useState("");

  // if input box has something in it do search otherwise don't
  comingProd.length > 0 ? (isAllowed = true) : (isAllowed = false);
  const { authState } = useAuth();
  const { authorized } = authState;
  return (
    <div className="header-main">
      <nav className="navbar-main">
        <div>
          <ul className="navbar left-navbar-links">
            <NavLink
              className="single-link"
              end
              activeClassName="selected"
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className="single-link"
              end
              activeClassName="selected"
              to="/products"
            >
              Products
            </NavLink>
          </ul>
        </div>

        {isAllowed ? (
          <div className="search-bar">
            <input
              type="text"
              id="search-box"
              className="search-box"
              placeholder="Search"
              onChange={(event) => setComingProd(event.target.value)}
            />
            <NavLink
              disable={isAllowed.toString()}
              to="/search"
              className="search-box-button"
              activeClassName="selected"
              onClick={() =>
                dispatch({ type: "SEARCH_FOR_ITEM", payload: comingProd })
              }
            >
              <i className="material-icons">search</i>
            </NavLink>
          </div>
        ) : (
          <div className="search-bar">
            <input
              type="text"
              id="search-box"
              className="search-box"
              placeholder="Search"
              onChange={(event) => setComingProd(event.target.value)}
            />
            <NavLink
              to="#"
              className="search-box-button"
              activeClassName="selected"
            >
              <i className="material-icons">search</i>
            </NavLink>
          </div>
        )}

        <div className="navbar right-navbar-links">
          <div className="individual-icons">
            <div className="badge-container">
              <NavLink
                to="/wishlist"
                className="right-icons"
                activeClassName="selected"
              >
                <i className="material-icons ">favorite_border</i>
              </NavLink>
              <div className="badge-common badge-one">
                {authorized ? wishlist?.length : 0}
              </div>
            </div>
          </div>
          <div className="individual-icons">
            <div className="badge-container ">
              <NavLink
                to="/account"
                className="right-icons"
                activeClassName="selected"
              >
                <i className="material-icons "> account_circle </i>
              </NavLink>
            </div>
          </div>
          <div className="individual-icons last-icon">
            <div className="badge-container">
              <NavLink
                to="/cart"
                className="right-icons"
                activeClassName="selected"
              >
                <i className="material-icons"> add_shopping_cart </i>
              </NavLink>
              <div className="badge-common badge-one">
                {authorized ? cart?.length : 0}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
