import './header.css'
import {useEcom} from '../ecom-context/ecom-context'
import { useState } from 'react';
export function Header(){
    const {state , dispatch} = useEcom();
    const { wishlist , cart , data } = state;
    // state for searching of an item
    const [comingProd , setComingProd] = useState('');

    // function searchFieldHandler(event){
    //     const enteredItem = event.target.value;
    //     setComingProd(event.target.value)


    // }
    // function searchButtonHandler(){

    //     console.log(  "item to search " ,  comingProd) 

    // }
    return(
        <div>
            <div>
                <input type = "text" id = "search-box" placeholder = "Type here to Search" onChange = {(event) => setComingProd(event.target.value)}/>
                <button onClick ={() => dispatch({type : 'SEARCH_FOR_ITEM' , payload : comingProd})} >Search</button>
            </div>
            <nav className = "navbar-main">
                <div>
                    <ul className = "navbar left-navbar-links">
                        <li>
                            <a onClick = {() => dispatch({type : 'products'})} className = "list-item" href = "#">Home</a>
                        </li>
                        <li>
                            <a onClick = {() => dispatch({type : 'products'})} className = "list-item"  href = "#">Products</a>
                        </li>
                    </ul>
                </div>
                <div className = "navbar right-navbar-links">
                            
                            <div className = "individual-icons">
                                <a onClick = {() => dispatch({type : 'wishlist'})} className = "" href = "#">
                                    <div class="badge-container"> 
                                    <i class="material-icons">favorite_border</i>
                                    <div class="badge-common badge-one">{wishlist.length}</div>
                                    </div>
                                </a>
                       
                            </div>

                 
                        <div className = "individual-icons">
                            <a  href = "#">
                              <div class="badge-container "> 
                                <i class="material-icons "> account_circle </i> 
                              </div>

                            </a>
                            </div>
                           
                    <div className = "individual-icons last-icon">
                        
                            <a onClick = {() => dispatch({type : 'cart'})} className = ""  href = "#">
                                <div class="badge-container">
                                     <i class="material-icons"> add_shopping_cart </i>
                                      <div class="badge-common badge-one">{cart.length}</div>
                                </div>

                            </a>
                            </div>
                   
                </div>
               
            </nav>
        </div>
    )
}