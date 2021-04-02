import {data} from './faker'
import './product-page.css'
// import {wishlist_logo} from './images'

export function Products(){
    return(
        <div className = "products-main">
            {data.map(product => 

                <div class="card-badge">
                    <img class="image-resize" src={product.image} /> 
                    <div class="card-badge-content"> 
                        <p class="bold">{product.productName}</p>
                        <p>{product.description}</p>
                        <span class="bold">Rs {product.price} </span>
                       <button class="button button-success">Add To Wishlist</button>
                    </div>
                </div>
            )}


        </div>
    )
}