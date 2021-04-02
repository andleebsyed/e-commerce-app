import './header.css'
export function Header(){
    return(
        <div>
            <div>
             {/* className = "header-main"> */}
                <input type = "text" id = "search-box" placeholder = "Type here to Search"/>
            </div>
            <nav className = "navbar-main">
                <div>
                    <ul className = "navbar left-navbar-links">
                        <li>
                            <a className = "list-item" href = "#">Home</a>
                        </li>
                        <li>
                            <a className = "list-item"  href = "#">Products</a>
                        </li>
                    </ul>
                </div>
                <div className = "navbar right-navbar-links">
                    <span>
                        
                            <a className = "list-item" href = "#">WL</a>
                    </span>

                    <span>
                        
                            <a className = "list-item"  href = "#">Acc</a>
                    </span>

                    <span>
                        
                            <a className = "list-item"  href = "#">Cart</a>
                    </span>
                </div>
            </nav>
        </div>
    )
}