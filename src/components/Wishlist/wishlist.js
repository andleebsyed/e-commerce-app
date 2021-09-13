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
  if (wishlist.length === 0) {
    return <EmptyWishlist />;
  } else {
    return (
      <div className="container-div">
        <h1 className="wishlist-heading">Wishlist</h1>
        <Loader loader={loader} />
        <div className="wishlist-main">
          {wishlist.map((product) => (
            <div class="ecom-card">
              <img
                alt="product pic"
                class="card-image"
                src={`data:image/png;base64,${new Buffer(
                  product.img.data.data,
                  "binary"
                ).toString("base64")}`}
              />

              <div class="card-info">
                <strong>{product.productName}</strong>
                <p>{product.description}</p>
                <strong>Rs {product.price}</strong>
              </div>

              <div className="buttons-wishlist">
                <button
                  class="button button-success"
                  id={product.id}
                  onClick={() =>
                    AddToCart(product, dispatch, loader, setLoader)
                  }
                >
                  Add To Cart
                </button>
                <button
                  class="button button-warning"
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
}
