import "./EmptyWishlist.css";
import { Link } from "react-router-dom";
export function EmptyWishlist() {
  return (
    <div className="empty-wishlist-main">
      <i className="material-icons large-wishlist">favorite_border</i>
      <strong>Uh oh!! There's Nothing Here </strong>
      <Link to="/products" className="button button-primary link-style">
        Explore Maybe?
      </Link>
    </div>
  );
}
