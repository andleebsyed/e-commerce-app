import "./addresses.css";
import { useEcom } from "../ecom-context/ecom-context";
import { useState } from "react";

export function Addresses() {
  const { state } = useEcom();
  const { addresses } = state;
  const [modalStatus, setModalStatus] = useState(false);
  const [saveAddressButtonText, setSaveAddressButtonText] =
    useState("Save Address");
  const AddAddressModal = () => {
    return (
      <div className="address-modal-outer">
        <div className="address-modal-main">
          <button
            style={{ marginLeft: "auto" }}
            onClick={() => setModalStatus(false)}
          >
            X
          </button>
          <form className="address-form">
            <input
              className="address-column"
              type="text"
              name="name"
              required
              placeholder="Name"
            />
            <input
              className="address-column"
              type="text"
              name="address"
              required
              placeholder="Address"
            />
            <input
              className="address-column"
              type="number"
              name="pincode"
              required
              placeholder="Pincode"
            />
            <input
              className="address-column"
              type="text"
              name="city"
              required
              placeholder="City"
            />
            <input
              type="submit"
              value={saveAddressButtonText}
              className="button button-primary address-button"
            />
          </form>
        </div>
      </div>
    );
  };
  return addresses === null ? (
    <div>loading...</div>
  ) : (
    <div className="address-main">
      <div className="address-heading">
        <p>Select Address</p>
        <button
          className="button button-primary"
          onClick={() => setModalStatus(true)}
        >
          Add new address
        </button>
      </div>
      {addresses.length === 0 ? (
        <div>
          <p>you have no saved addresses</p>
        </div>
      ) : (
        <div>These are my addressses</div>
      )}
      {modalStatus && <AddAddressModal />}
    </div>
  );
}
