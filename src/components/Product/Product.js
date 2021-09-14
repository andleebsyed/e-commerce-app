import "./Product.css";
import { Link, useLocation } from "react-router-dom";
import { useEcom } from "../ecom-context/ecom-context";
import { AddToCart } from "../../services/Operations";
import { useLogin } from "../Login/Login";
import { useAuth } from "../../contexts/AuthContext";
export function Product({ cart }) {
  const { state } = useLocation();
  const { product } = state;
  const { dispatch, loader, setLoader } = useEcom();
  const { authState } = useAuth();
  const { authorized } = authState;
  const { user } = useLogin();
  const clicked = {
    currentClass: "button button-secondary buy-button",
    currentText: "✅Added To Cart",
    visibility: true,
  };
  const unclicked = {
    currentClass: "button button-success buy-button",
    currentText: "Add To Cart",
    visibility: false,
  };
  let ifProductInCart = cart.filter((item) => item._id === product._id);
  return (
    <div className="single-product-outer">
      <p className="product-name">{product.name}</p>
      <img
        alt="product pic"
        className="individual-image"
        src={`data:image/png;base64,${new Buffer(
          product.img.data.data,
          "binary"
        ).toString("base64")}`}
      />

      {authorized && ifProductInCart ? (
        <div className="product-buttons">
          <button
            className={
              ifProductInCart.length > 0
                ? clicked.currentClass
                : unclicked.currentClass
            }
            disabled={
              ifProductInCart.length > 0
                ? clicked.visibility
                : unclicked.visibility
            }
            onClick={() => AddToCart(product, dispatch, loader, setLoader)}
          >
            {ifProductInCart.length > 0
              ? clicked.currentText
              : unclicked.currentText}
          </button>

          <button className="button button-primary buy-button">Buy Now</button>
        </div>
      ) : (
        <div className="product-buttons">
          <Link
            to={{
              pathname: `/login`,
            }}
            state={{ product: product }}
          >
            <button className="button button-success buy-button">
              Add to Cart
            </button>
          </Link>

          <Link
            to={{
              pathname: `/login`,
            }}
            state={{ product: product }}
          >
            <button className="button button-primary buy-button">
              Buy Now
            </button>
          </Link>
        </div>
      )}
      <div className="description-div">
        <h3 className="description-heading">Description</h3>
        <p class="description-para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec
          viverra dui. Nullam feugiat diam sed felis placerat cursus. Proin
          rutrum convallis finibus. Donec sed quam ut lectus varius tincidunt
          sit amet vel est. Nam iaculis tristique erat sed tincidunt. Nulla
          accumsan ac urna sed sodales. Maecenas gravida ultrices ante vel
          pellentesque. Vestibulum feugiat lobortis pharetra. Duis ornare felis
          sit amet mattis vestibulum. Quisque nisi dui, consectetur non aliquam
          vel, tempor malesuada urna. Curabitur sagittis blandit eros non
          laoreet.
        </p>
      </div>
    </div>
  );
}
