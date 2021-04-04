
import {useEcom} from '../ecom-context/ecom-context'
import './cart.css'
export function Cart(){
    const {state , dispatch} = useEcom()
    const {cart} = state
    if(cart.length ===0){
        return(
            <h1>Cart is Empty</h1>
        )
    }
    else{
        console.log("cart is " ,  cart)
        return(
            <div>

            <h1>Cart</h1>
            {cart.map(
                product => 

                    <div class="card-badge">
                        <img class="image-resize" src={product.image} /> 
                        <div class="card-badge-content"> 
                            <p class="bold">{product.productName}</p>
                            <p>{product.description}</p>
                            <span class="bold">Rs {product.price} </span><br />
                            <div class = "cart-buttons">
                            <button class="button button-success" id = {product.id} onClick = {() => dispatch({type : 'MOVE_TO_WISHLIST' , payload : product})}>Move To Wishlist</button>
                            <button class="button button-warning" id = {product.id} onClick = {() => dispatch({type : 'REMOVE_FROM_CART' , payload : product})}>Remove From Cart</button>
                            </div>
                        </div>
                    </div>
                )}
                </div>
        )}
}