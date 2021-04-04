import { useState } from 'react'
import {useEcom} from '../ecom-context/ecom-context'
import '../product-page/product-page.css'

export function Products(){
    const {state , dispatch} = useEcom()
    const {data} = state 
    console.log("data is " , data)


    
    const clicked = {
        currentClass : "button button-secondary" , 
        currentText : "✅Added To Wishlist" , 
        visibility : true
    }
    const  unclicked = {
        currentClass : "button button-success" , 
        currentText : "Add To Wishlist" , 
        visibility : false
    }         

    return(
        <div className = "products-main">
            {data.map(product => 
           
                <div class="card-badge">
                    <img class="image-resize" src={product.image} /> 
                    <div class="card-badge-content"> 
                        <p class="bold">{product.productName}</p>
                        <p>{product.description}</p>
                        <span class="bold">Rs {product.price} </span>
                       <button 
                        class = {product.wishlistStatus ?   clicked.currentClass : unclicked.currentClass} 
                        disabled =  {product.wishlistStatus ?   clicked.visibility : unclicked.visibility} 
                        id = {product.id} 
                        onClick = {() =>
                        { dispatch({type : 'ADD_TO_WISHLIST' , payload : product})
                        }}>
                            {product.wishlistStatus ?  clicked.currentText : unclicked.currentText}
                        </button>
                    </div>
                </div>
)}


        </div>
    )
}