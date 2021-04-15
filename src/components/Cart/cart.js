import { Checkout } from '../Checkout/checkout'
import { useEcom } from '../ecom-context/ecom-context'
import './cart.css'
export function Cart() {
    const { state, dispatch } = useEcom()
    const { cart } = state
    if (cart.length === 0) {
        return (
            <h1>Cart is Empty</h1>
        )
    }
    else {
        console.log("cart is ", cart)
        return (
            <div>

                <h1>Cart</h1>
                <div className="cart-main">
                    {cart.map(
                        product =>

                            <div class="ecom-card">
                                <img class="card-image" src={product.image} />


                                <div class="card-info">
                                    <strong>{product.productName}</strong>
                                    <p>{product.description}</p>
                                    <strong>Rs {product.price}</strong>
                                </div>
                                <div class="quantity-manager">
                                    <button onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: product })}>-</button>
                                    <span class="quantity-count">{product.quantity}</span>
                                    <button onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: product })}>+</button>
                                </div>
                                <div className="cart-buttons">
                                    <button class="button button-success" id={product.id} onClick={() => dispatch({ type: 'MOVE_TO_WISHLIST', payload: product })}>Move To Wishlist</button>
                                    <button class="button button-warning" id={product.id} onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: product })}>Remove From Cart</button>
                                </div>
                            </div>


                    )}
                </div>
                <Checkout />
            </div>
        )
    }
}