import './EmptyCart.css'
import { Link } from 'react-router-dom'
export function EmptyCart() {
    return (
        <div className="empty-wishlist-main">
            <i class="material-icons large-cart">add_shopping_cart</i>
            <strong>Looks like your Cart is empty</strong>
            <Link to='/products' className="button button-primary link-style">Explore the wide range of Products</Link>
        </div>
    )
}