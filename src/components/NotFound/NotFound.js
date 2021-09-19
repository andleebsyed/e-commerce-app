import { Link } from "react-router-dom";
import "./NotFound.css";
import notfound from "../../assets/notfound.svg";
export function NotFound() {
  return (
    <div className="not-found-outer">
      <img src={notfound} alt="page not found" className="not-found-image" />
      <div className="not-found-content">
        <p className="not-found-text">
          Oops!The Page you were looking for does not exist
        </p>
      </div>
      <Link className="not-found-back-button" to="/">
        Go Back to Homepage
      </Link>
    </div>
  );
}
