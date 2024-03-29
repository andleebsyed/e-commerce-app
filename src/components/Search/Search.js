import { useEcom } from "../ecom-context/ecom-context";
import { Link } from "react-router-dom";
import { Card } from "../ProductCard/card";
import { Loader } from "../Loader/Loader";
export function Search() {
  const { state, dispatch, loader } = useEcom();
  const { filteredProducts } = state;
  if (filteredProducts.length === 0) {
    return (
      <div className="search-container">
        <h1>Oops!Your Search yeilded no result</h1>
        <Link
          to="/products"
          className="button button-primary products-link"
          onClick={() => dispatch({ type: "REMOVE_ALL_CONDITIONS" })}
        >
          Back to Products
        </Link>
      </div>
    );
  }
  return (
    <div className="outer">
      <Loader loader={loader} />
      <div className="products-main search-main-container-div">
        {filteredProducts.map((product) => (
          <div key={product._id}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
