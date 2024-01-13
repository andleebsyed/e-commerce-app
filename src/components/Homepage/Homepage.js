import { Link } from "react-router-dom";
import "./Homepage.css";
export function Homepage() {
  return (
    <div className="outer-main">
      <div className="text-holder">
        <p className="text-heading">
          Hey There Wanderer, Welcome to{" "}
          <span className="app-name">Euler Pickings.</span>
        </p>
        <p className="inner-text">
          An e-commerce platform for helping Wanderlust community to be the best
          out there while exploring.
        </p>
        <p className="inner-text">
          We will equip you with everything which you will need out there , in
          those terrains and deep gorges.
        </p>
        <p className="inner-text">
          Go ahead and take the first step in the journey of feeding your
          fernweh
        </p>
      </div>
      <div className="homepage-main-image">
        <img alt="landing" src="/images/homepageimage.svg" />
      </div>
      <Link to="/products" className="button button-outline button-adjustment">
        Explore
      </Link>
    </div>
  );
}
