import { useEcom } from '../ecom-context/ecom-context'
import '../product-page/product-page.css'
import './wishlist-main.css'
import '../ProductCard/card'
import '../ProductCard/card.css'
import { EmptyWishlist } from '../EmptyWishlist/EmptyWishlist'
import { useDatabase } from '../DatabaseCalls/DatabaseCalls'
import { AddToCart, RemoveFromWishlist } from '../utils/Operations'
export function Wishlist() {
    const { state, dispatch } = useEcom()
    const { wishlist } = state
    if (wishlist.length === 0) {
        return (
            <EmptyWishlist />

        )
    }
    else {
        return (
            <div className="container-div">
                <h1 className="wishlist-heading">Wishlist</h1>
                <div className="wishlist-main">
                    {wishlist.map(product =>
                        <div class="ecom-card">
                            <img class="card-image" src={`data:image/png;base64,${new Buffer(product.img.data.data, "binary").toString(
                                "base64"
                            )}`} />


                            <div class="card-info">
                                <strong>{product.productName}</strong>
                                <p>{product.description}</p>
                                <strong>Rs {product.price}</strong>
                            </div>

                            <div className="buttons-wishlist">
                                <button class="button button-success" id={product.id} onClick={() => AddToCart(product, dispatch)}>Add To Cart</button>
                                <button class="button button-warning" id={product.id} onClick={() => RemoveFromWishlist(product, dispatch)}>Remove From Wishlist</button>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        )
    }

}