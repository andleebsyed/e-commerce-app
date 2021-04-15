import { useEcom } from '../ecom-context/ecom-context'
import '../product-page/product-page.css'
import './wishlist-main.css'
import '../ProductCard/card'
import '../ProductCard/card.css'
export function Wishlist() {
    const { state, dispatch } = useEcom()
    const { wishlist } = state

    if (wishlist.length === 0) {
        return (
            <h1>Wishlist is Empty</h1>
        )
    }
    else {
        return (
            <div className="container-div">
                <h1>Wishlist</h1>
                <div className="wishlist-main">
                    {/* <>Wishlist</h1> */}
                    {wishlist.map(product =>
                        <div class="ecom-card">
                            <img class="card-image" src={product.image} />


                            <div class="card-info">
                                <strong>{product.productName}</strong>
                                <p>{product.description}</p>
                                <strong>Rs {product.price}</strong>
                            </div>

                            <div className="buttons-wishlist">
                                <button class="button button-success" id={product.id} onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}>Add To Cart</button>
                                <button class="button button-warning" id={product.id} onClick={() => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product })}>Remove From Wishlist</button>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        )
    }

}