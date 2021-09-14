import "./card.css";
import { useEcom } from "../ecom-context/ecom-context";
import { AddToCart } from "../../services/Operations";
import { AddToWishlist, RemoveFromWishlist } from "../../services/Operations";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
export function Card({ product }) {
  const { state, dispatch, loader, setLoader } = useEcom();
  const { cart, wishlist } = state;
  const { authState } = useAuth();
  const { authorized } = authState;
  const clicked = {
    currentClass: "button button-secondary",
    currentText: "✅Added To Cart",
    visibility: true,
  };
  const unclicked = {
    currentClass: "button button-success",
    currentText: "Add To Cart",
    visibility: false,
  };

  let productInWishlistStatus = [];
  let ifProductInCart = [];
  if (wishlist !== null) {
    wishlist.length === 0
      ? (productInWishlistStatus = [])
      : (productInWishlistStatus = wishlist.filter(
          (item) => item?._id === product?._id
        ));

    ifProductInCart = cart?.filter((item) => item?._id === product?._id);
  }

  const [showItem, setShowItem] = useState(false);
  return (
    <div>
      <div
        className="ecom-card"
        onClick={() => (showItem ? setShowItem(false) : setShowItem(true))}
      >
        <Link
          to={{
            pathname: `/products/${product._id}`,
          }}
          state={{ product: product }}
        >
          <img
            className="card-image"
            alt="product"
            src={`data:image/png;base64,${new Buffer(
              product.img.data.data,
              "binary"
            ).toString("base64")}`}
          />
        </Link>

        {authorized ? (
          productInWishlistStatus?.length === 0 ? (
            <button
              onClick={() =>
                AddToWishlist(product, dispatch, loader, setLoader)
              }
              className="basic-button"
            >
              <svg width="1.2rem" height="1.99rem" viewBox="0 0 16 16">
                <g>
                  <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385c.92 1.815 2.834 3.989 6.286 6.357c3.452-2.368 5.365-4.542 6.286-6.357c.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                </g>
              </svg>
            </button>
          ) : (
            <button
              onClick={() =>
                RemoveFromWishlist(product, dispatch, loader, setLoader)
              }
              className="basic-button"
            >
              <svg width="1.2rem" height="1.99rem" viewBox="0 0 16 16">
                <g>
                  {" "}
                  <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314z"></path>
                </g>
              </svg>
            </button>
          )
        ) : (
          <Link to="/login">
            <button className="basic-button">
              <svg width="1.2rem" height="1.99rem" viewBox="0 0 16 16">
                <g>
                  <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385c.92 1.815 2.834 3.989 6.286 6.357c3.452-2.368 5.365-4.542 6.286-6.357c.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                </g>
              </svg>
            </button>
          </Link>
        )}

        <div className="card-info">
          <strong>{product.name}</strong>
          <p>{product.description}</p>
          <strong>Rs {product.price}</strong>
        </div>

        {authorized && ifProductInCart ? (
          <button
            className={
              ifProductInCart?.length > 0
                ? clicked.currentClass
                : unclicked.currentClass
            }
            disabled={
              ifProductInCart?.length > 0
                ? clicked.visibility
                : unclicked.visibility
            }
            onClick={() => AddToCart(product, dispatch, loader, setLoader)}
          >
            {ifProductInCart.length > 0
              ? clicked.currentText
              : unclicked.currentText}
          </button>
        ) : (
          <Link to="/login">
            <button className="button button-success cart-link">
              Add to Cart
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
