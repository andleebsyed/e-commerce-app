import { Checkout } from '../Checkout/checkout'
import { useEcom } from '../ecom-context/ecom-context'
import './cart.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { EmptyCart } from '../EmptyCart/EmptyCart'
import { useDatabase } from '../DatabaseCalls/DatabaseCalls'
export function Cart() {
    const { state, dispatch } = useEcom()
    const { cart } = useDatabase()
    // const [cart, setCart] = useState([])
    // useEffect(() => {
    //     axios.get("https://rest-api.andydev7.repl.co/cart").then((res) => {
    //         setCart(res.data.myCart);
    //     });
    // }, []);
    if (cart.length === 0) {
        return (
            <EmptyCart />
        )
    }
    else {
        console.log("cart in cart component is ", cart)
        return (
            <div>

                <h1 className="cart-heading">Cart</h1>
                <div className="cart-main">

                    {cart.map(
                        product =>

                            <div class="ecom-card">
                                <img class="card-image" src={`data:image/png;base64,${new Buffer(product.img.data.data, "binary").toString(
                                    "base64"
                                )}`} />


                                <div class="card-info">
                                    <strong>{product.name}</strong>
                                    <p>{product.description}</p>
                                    <strong>Rs {product.price}</strong>
                                </div>
                                <div class="quantity-manager">
                                    <button onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: product })}>-</button>
                                    <span class="quantity-count">{product.quantity}</span>
                                    <button onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: product })}>+</button>
                                </div>
                                <div className="cart-buttons">
                                    <button class="button button-success" id={product._id} onClick={() => dispatch({ type: 'MOVE_TO_WISHLIST', payload: product })}>Move To Wishlist</button>
                                    <button class="button button-warning" id={product._id} onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: product })}>Remove From Cart</button>
                                </div>
                            </div>


                    )}
                </div>
                <Checkout />
            </div>
        )
    }
}