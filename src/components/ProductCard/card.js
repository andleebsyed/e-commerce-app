import './card.css'
import {useEcom} from '../ecom-context/ecom-context'
export function Card({product}){
  const {state , dispatch} = useEcom()
  const {wishlist} = state
  let productInWishlistStatus = [];

  wishlist.length === 0 ? productInWishlistStatus = [] : productInWishlistStatus = wishlist.filter(item => item.id === product.id) 
 
  return(
        <div class = "ecom-card">
            <img class = "card-image" src = {product.image} />
        
        {productInWishlistStatus.length === 0 ? 
        <button onClick = {() => dispatch({type : 'ADD_TO_WISHLIST' , payload : product})}
            class = "basic-button">
            <svg  width="1em" height="1em" viewBox="0 0 16 16"><g><path  d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385c.92 1.815 2.834 3.989 6.286 6.357c3.452-2.368 5.365-4.542 6.286-6.357c.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path></g></svg>
            </button>
            :

            <button onClick = {() => dispatch({type : 'REMOVE_FROM_WISHLIST' , payload : product})}
                class = "basic-button">
                <svg  width="1em" height="1em" viewBox="0 0 16 16"><g> <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314z"></path></g></svg>
                </button>
            
            }
        
            <div class = "card-info">
                <strong>{product.productName}</strong> 
                <p>{product.description}</p>
                <strong>Rs {product.price}</strong>
            </div>
            <div class = "button-encloser">
            <button class = "card-button">Add to Cart</button>
                </div>
       </div>
    )
}