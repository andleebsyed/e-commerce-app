import './header.css'
import {useEcom} from '../ecom-context/ecom-context'
export function Header(){
    const {state , dispatch} = useEcom();
    const { wishlist , cart } = state;
    return(
        <div>
            <div>
                <input type = "text" id = "search-box" placeholder = "Type here to Search"/>
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
                    {/* <div class = "right-links"> */}
                            <div className = "individual-icons">
                            <a onClick = {() => dispatch({type : 'wishlist'})} className = "" href = "#">
                                <div class="badge-container"> 
                                <i class="material-icons">favorite_border</i>
                                 <div class="badge-common badge-one">{wishlist.length}</div>
                                  </div>
                            </a>
                            {/* </li> */}
                    </div>

                    {/* <span> */}
                    {/* <li> */}
                        <div className = "individual-icons">
                            <a  href = "#">
                              <div class="badge-container "> 
                                <i class="material-icons "> account_circle </i> 
                                {/* <div class="badge-common badge-one">3</div>  */}
                              </div>

                            </a>
                            </div>
                            {/* </li> */}
                    {/* </span> */}

                    {/* <span> */}
                    <div className = "individual-icons last-icon">
                        
                            <a onClick = {() => dispatch({type : 'cart'})} className = ""  href = "#">
                                <div class="badge-container">
                                     <i class="material-icons"> add_shopping_cart </i>
                                      <div class="badge-common badge-one">{cart.length}</div>
                                </div>

                            </a>
                            </div>
                    {/* </span> */}
                </div>
                {/* </div> */}
            </nav>
        </div>
    )
}