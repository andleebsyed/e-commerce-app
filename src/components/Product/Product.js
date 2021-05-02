import './Product.css'
import { Link, useLocation } from 'react-router-dom'
import { useEcom } from '../ecom-context/ecom-context'
import { AddToCart } from '../utils/Operations'
export function Product() {
    const { state } = useLocation()
    const { product } = state
    const { dispatch, loader, setLoader } = useEcom()
    return (
        <div className="single-product-outer">
            <p className="product-name">{product.name}</p>
            <img className="individual-image" src={`data:image/png;base64,${new Buffer(product.img.data.data, "binary").toString(
                "base64"
            )}`} />
            <div className="product-buttons">
                <button className="button button-success buy-button" onClick={() => AddToCart(product, dispatch, loader, setLoader)}>Add To Cart</button>
                <button className="button button-primary buy-button">Buy Now</button>
            </div>

            <div className="description-div">
                <h3 className="description-heading">Description</h3>
                <p class="description-para">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec viverra dui. Nullam feugiat diam sed felis placerat cursus. Proin rutrum convallis finibus. Donec sed quam ut lectus varius tincidunt sit amet vel est. Nam iaculis tristique erat sed tincidunt. Nulla accumsan ac urna sed sodales. Maecenas gravida ultrices ante vel pellentesque. Vestibulum feugiat lobortis pharetra. Duis ornare felis sit amet mattis vestibulum. Quisque nisi dui, consectetur non aliquam vel, tempor malesuada urna. Curabitur sagittis blandit eros non laoreet.</p>

            </div>

        </div>
    )
}