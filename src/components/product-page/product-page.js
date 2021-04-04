import {data} from '../faker'
import {useEcom} from '../ecom-context/ecom-context'
import '../product-page/product-page.css'

export function Products(){
    const {dispatch} = useEcom()
    return(
        <div className = "products-main">
            {data.map(product => 

                <div class="card-badge">
                    <img class="image-resize" src={product.image} /> 
                    <div class="card-badge-content"> 
                        <p class="bold">{product.productName}</p>
                        <p>{product.description}</p>
                        <span class="bold">Rs {product.price} </span>
                       <button class="button button-success" id = {product.id} onClick = {() => dispatch({type : 'ADD_TO_WISHLIST' , payload : product})}>Add To Wishlist</button>
                    </div>
                </div>
            )}


        </div>
    )
}