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
  const { cart, addresses } = state;
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
      totalItems = cart.length;
      totalPrice = cart.reduce(
        (totalPrice, product) =>
          totalPrice + product.product.price * product.quantity,
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
      key: "rzp_test_BtdjeqV9ECO0Ea",
      amount: amount,
      currency: currency,
      name: "Euler Pickings",
      description: "Thank you for shopping with us",
      image: razorpay,
      order_id: id,
      handler: async function (response) {
        const status = await EmptyCart();
        if (status) {
          dispatch({ type: "EMPTY_CART" });
          setRazorpayResponse(response);
          setSuccessModal(true);
        }
      },
      prefill: {
        name: account.name,
        email: account.email,
        contact: "913456789213",
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
          <h1 style={{ alignSelf: "center" }}>Checkout</h1>
          {cart.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>Your Cart is empty</p>
              <Link to="/products">
                <button
                  className="button button-primary"
                  style={{ width: "100%", margin: "0px", padding: ".8rem" }}
                >
                  {" "}
                  Fill It Up
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="checkout-product">
                {cart.map(({ product, quantity }) => (
                  <Link
                    key={product._id}
                    to={{
                      pathname: `/products/${product._id}`,
                    }}
                    state={{ product: product }}
                    style={{
                      boxShadow: "0px 0px 3px 0px #6b7280",
                      margin: ".5rem",
                      display: "flex",
                      textDecoration: "none",
                    }}
                  >
                    <img
                      alt="product pic"
                      className="checkout-image"
                      src={`data:image/png;base64,${new Buffer(
                        product.img.data.data,
                        "binary"
                      ).toString("base64")}`}
                    />
                    <p>Quantity: {quantity}</p>
                    <p
                      style={{
                        marginLeft: "auto",
                        marginRight: ".5rem",
                        textDecoration: "none",
                      }}
                    >
                      Rs. <span>{product.price}</span> X <span>{quantity}</span>
                    </p>
                  </Link>
                ))}
              </div>
              <p style={{ marginLeft: "auto" }}>Total Items : {totalItems} </p>
              <p style={{ marginLeft: "auto", fontWeight: "bold" }}>
                Total Price : {totalPrice}
              </p>
              <p style={{ marginLeft: "auto" }}>
                Discount: <span style={{ color: "#10B981" }}>20</span>
              </p>
              <button
                className="button button-primary pay-button"
                onClick={() =>
                  addresses.length === 0
                    ? alert("Select an address")
                    : displayRazorpay()
                }
              >
                Proceed To Pay ({totalPrice - 20})
              </button>
            </>
          )}
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
              Back To Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
