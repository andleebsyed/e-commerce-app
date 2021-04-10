import { useState } from 'react'
import {useEcom} from '../ecom-context/ecom-context'
import '../product-page/product-page.css'

export function Products(){
    const {state , dispatch} = useEcom()
    const {data , wishlist} = state 
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
    let currentStyleStatus;

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
                      
                        {...currentStyleStatus =  wishlist.find(item => item.id === product.id ? true : false) } 
                          disabled ={currentStyleStatus}
                        className = {currentStyleStatus ? clicked.currentClass : unclicked.currentClass} 
                       
                       
                        id = {product.id} 
                        onClick = {() =>
                        { dispatch({type : 'ADD_TO_WISHLIST' , payload : product})
                        }}>
                            {currentStyleStatus ? clicked.currentText : unclicked.currentText}
                        </button>
                    </div>
                </div>
)}


        </div>
    )
}