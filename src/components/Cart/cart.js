import { Checkout } from "../Checkout/checkout";
import { useEcom } from "../ecom-context/ecom-context";
import "./cart.css";
import { EmptyCart } from "../EmptyCart/EmptyCart";
import {
  RemoveFromCart,
  MoveToWishlist,
  ChangeQuantity,
} from "../../services/Operations";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";
export function Cart() {
  const { state, dispatch, loader, setLoader } = useEcom();
  const { cart } = state;
  return cart === null ? (
    <div>Loading...</div>
  ) : cart?.length === 0 ? (
    <EmptyCart />
  ) : (
    <div className="cart-outer">
      <h1 className="cart-heading">Cart</h1>
      <Loader loader={loader} />
      <div className="cart-main">
        {cart.map((product) => (
          <div className="ecom-card" key={product._id}>
            <img
              alt="product pic"
              className="card-image"
              src={`data:image/png;base64,${new Buffer(
                product.img.data.data,
                "binary"
              ).toString("base64")}`}
            />

            <div className="card-info">
              <strong>{product.name}</strong>
              <p>{product.description}</p>
              <strong>Rs {product.price}</strong>
            </div>
            <div className="quantity-manager">
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
              <span className="quantity-count">{product.quantity}</span>
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
                className="button button-success"
                id={product._id}
                onClick={() =>
                  MoveToWishlist(product, dispatch, loader, setLoader)
                }
              >
                Move To Wishlist
              </button>
              <button
                className="button button-warning"
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
      <div className="checkout-container">
        <Link to="/checkout" className="checkout-link button button-primary">
          Place Order
        </Link>
      </div>
    </div>
  );
}
