import { useEcom } from "../ecom-context/ecom-context";
import "../product-page/product-page.css";
import "./wishlist-main.css";
import "../ProductCard/card";
import "../ProductCard/card.css";
import { EmptyWishlist } from "../EmptyWishlist/EmptyWishlist";
import { AddToCart, RemoveFromWishlist } from "../../services/Operations";
import { Loader } from "../Loader/Loader";
export function Wishlist() {
  const { state, dispatch, loader, setLoader } = useEcom();
  const { wishlist } = state;
  console.log({ wishlist });
  return wishlist === null ? (
    <div>loading...</div>
  ) : wishlist.length === 0 ? (
    <EmptyWishlist />
  ) : (
    <div className="container-div">
      <h1 className="wishlist-heading">Wishlist</h1>
      <Loader loader={loader} />
      <div className="wishlist-main">
        {wishlist.map((product) => (
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
              <strong>{product.productName}</strong>
              <p>{product.description}</p>
              <strong>Rs {product.price}</strong>
            </div>

            <div className="buttons-wishlist">
              <button
                className="button button-success"
                id={product.id}
                onClick={() => AddToCart(product, dispatch, loader, setLoader)}
              >
                Add To Cart
              </button>
              <button
                className="button button-warning"
                id={product.id}
                onClick={() =>
                  RemoveFromWishlist(product, dispatch, loader, setLoader)
                }
              >
                Remove From Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
