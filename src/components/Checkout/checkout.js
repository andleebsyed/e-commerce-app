import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { EmptyCart } from "../../services/Operations";
import { FetchAccount, OrderServerCall } from "../../services/users";
import { loadScript } from "../../utils/loadScript";
import { Addresses } from "../Addresses/Addresses";
import { useEcom } from "../ecom-context/ecom-context";
import razorpay from "../../assets/razorpay.svg";
import "./checkout.css";
export function Checkout() {
  const { state, dispatch } = useEcom();
  const { cart } = state;
  const { authState, dispatchAuth } = useAuth();
  const { account, authSetup } = authState;
  const [successModal, setSuccessModal] = useState(false);
  const [razorpayResposne, setRazorpayResponse] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function Run() {
      const response = await FetchAccount();
      dispatchAuth({ type: "FETCH_ACCOUNT", payload: response });
    }
    if (account === null && authSetup) {
      Run();
    }
  }, [dispatchAuth, account, authSetup]);
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

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load.are you online?");
      return;
    }
    const { amount, currency, id } = await OrderServerCall(totalPrice);
    const options = {
      // move it to .env later
      key: "rzp_test_BtdjeqV9ECO0Ea",
      amount: amount,
      currency: currency,
      name: "Euler Pickings",
      description: "Thank you for shopping with us",
      image: razorpay,
      order_id: id,
      handler: async function (response) {
        // handleOrderSuccess(response)
        const status = await EmptyCart();
        if (status) {
          dispatch({ type: "EMPTY_CART" });
          setRazorpayResponse(response);
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          setSuccessModal(true);
        }
      },
      prefill: {
        name: account.name,
        email: account.email,
        contact: "123456789",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return cart === null ? (
    <div>loading...</div>
  ) : (
    <div className="checkout-main">
      <Addresses />
      <div className="checkout-container">
        <div className="checkout-contents">
          <h1>Checkout</h1>
          <div style={{ display: "flex" }}>
            {cart.map((item) => (
              <Link
                to={{
                  pathname: `/products/${item._id}`,
                }}
                state={{ product: item }}
              >
                <img
                  alt="product pic"
                  className="checkout-image"
                  src={`data:image/png;base64,${new Buffer(
                    item.img.data.data,
                    "binary"
                  ).toString("base64")}`}
                />
              </Link>
            ))}
          </div>
          <p>Total Items : {totalItems} </p>
          <p>Total Price : {totalPrice}</p>
          <p>
            Discount: <span style={{ color: "#10B981" }}>20</span>
          </p>
          <button
            className="button button-primary pay-button"
            onClick={displayRazorpay}
          >
            Proceed To Pay
          </button>
        </div>
      </div>
      {successModal && (
        <div className="modal-outer">
          <div style={{ border: "1px solid #DC2626" }} className="modal-main">
            <p className="order-success-text">
              Order placed successfully with orderId
              <span style={{ color: "#000000", margin: ".2rem" }}>
                {razorpayResposne.razorpay_order_id}{" "}
              </span>
              and paymentId{" "}
              <span style={{ color: "#000000", margin: ".2rem" }}>
                {razorpayResposne.razorpay_payment_id}{" "}
              </span>
            </p>
            <button
              className="button button-primary"
              onClick={() => {
                setSuccessModal(false);
                navigate("/products");
              }}
            >
              Back To Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
