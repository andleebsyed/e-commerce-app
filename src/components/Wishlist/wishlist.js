import {useEcom} from '../ecom-context/ecom-context'
import '../product-page/product-page.css'
import './wishlist-main.css'
export function Wishlist(){
    const {state  , dispatch} = useEcom()
    const {wishlist} = state
    if(wishlist.length === 0){
        return(
            <h1>Wishlist is Empty</h1>
        )
    }
    else{
        console.log("wishlist is "  , wishlist)
        return(
            <div className = "wishlist-main">
            {wishlist.map(product => 

                <div class="card-badge">
                    <img class="image-resize" src={product.image} /> 
                    <div class="card-badge-content"> 
                        <p class="bold">{product.productName}</p>
                        <p>{product.description}</p>
                        <span class="bold">Rs {product.price} </span>
                        <div className = "buttons-wishlist">
                       <button class="button button-success" id = {product.id} onClick = {() => dispatch({type : 'ADD_TO_CART' , payload : product})}>Add To Cart</button>
                        <button class="button button-warning" id = {product.id} onClick = {() => dispatch({type : 'REMOVE_FROM_WISHLIST' , payload : product})}>Remove From Wishlist</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
        )
    }

}