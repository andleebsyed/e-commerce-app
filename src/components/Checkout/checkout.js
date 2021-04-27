import { useEcom } from "../ecom-context/ecom-context"
import './checkout.css'
import { useDatabase } from '../DatabaseCalls/DatabaseCalls'

export function Checkout() {
    const { state } = useEcom()
    const { cart } = state
    const totalItems = cart.reduce((totalQunatity, product) => totalQunatity + product.quantity, 0)
    const totalPrice = cart.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0)
    return (
        <div className="checkout-container">
            <div className="checkout-main">
                <h1>Checkout</h1>
                <p>Total Items : {totalItems} </p>
                <p>Total Price : {totalPrice}</p>
                <button className="button button-primary">Proceed To Pay</button>
            </div>
        </div>
    )
}