import { Checkout } from "../Checkout/checkout";
import { useEcom } from "../ecom-context/ecom-context";
import "./cart.css";
import { EmptyCart } from "../EmptyCart/EmptyCart";
import {
  RemoveFromCart,
  MoveToWishlist,
  ChangeQuantity,
} from "../../services/Operations";
import { useState } from "react";
import { Loader } from "../Loader/Loader";
export function Cart() {
  const { state, dispatch, loader, setLoader } = useEcom();
  const { cart } = state;
  if (cart.length === 0) {
    return <EmptyCart />;
  } else {
    console.log("cart in cart component is ", cart);
    return (
      <div className="cart-outer">
        <h1 className="cart-heading">Cart</h1>
        <Loader loader={loader} />
        <div className="cart-main">
          {cart.map((product) => (
            <div class="ecom-card">
              <img
                class="card-image"
                src={`data:image/png;base64,${new Buffer(
                  product.img.data.data,
                  "binary"
                ).toString("base64")}`}
              />

              <div class="card-info">
                <strong>{product.name}</strong>
                <p>{product.description}</p>
                <strong>Rs {product.price}</strong>
              </div>
              <div class="quantity-manager">
                <button
                  onClick={() => {
                    const paramCase = "dec";
                    ChangeQuantity(
                      product,
                      dispatch,
                      paramCase,
                      loader,
                      setLoader
                    );
                  }}
                >
                  -
                </button>
                <span class="quantity-count">{product.quantity}</span>
                <button
                  onClick={() =>
                    ChangeQuantity(product, dispatch, "inc", loader, setLoader)
                  }
                >
                  +
                </button>
              </div>
              <div className="cart-buttons">
                <button
                  class="button button-success"
                  id={product._id}
                  onClick={() =>
                    MoveToWishlist(product, dispatch, loader, setLoader)
                  }
                >
                  Move To Wishlist
                </button>
                <button
                  class="button button-warning"
                  id={product._id}
                  onClick={() =>
                    RemoveFromCart(product, dispatch, loader, setLoader)
                  }
                >
                  Remove From Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <Checkout />
      </div>
    );
  }
}
