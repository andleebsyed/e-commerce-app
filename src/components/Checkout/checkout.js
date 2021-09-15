import { Addresses } from "../Addresses/Addresses";
import { useEcom } from "../ecom-context/ecom-context";
import "./checkout.css";
export function Checkout() {
  const { state } = useEcom();
  const { cart } = state;
  let totalItems;
  let totalPrice;
  if (cart !== null) {
    if (cart.length === 0) {
      totalItems = 0;
      totalPrice = 0;
    } else {
      totalItems = cart.reduce(
        (totalQunatity, product) => totalQunatity + product.quantity,
        0
      );
      totalPrice = cart.reduce(
        (totalPrice, product) => totalPrice + product.price * product.quantity,
        0
      );
    }
  }

  return cart === null ? (
    <div>loading...</div>
  ) : (
    <div className="checkout-main">
      <Addresses />
      <div className="checkout-container">
        <div className="checkout-contents">
          <h1>Checkout</h1>
          <p>Total Items : {totalItems} </p>
          <p>Total Price : {totalPrice}</p>
          <button className="button button-primary pay-button">
            Proceed To Pay
          </button>
        </div>
      </div>
    </div>
  );
}
