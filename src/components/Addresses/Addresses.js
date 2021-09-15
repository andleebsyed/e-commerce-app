import "./addresses.css";
import { useEcom } from "../ecom-context/ecom-context";
import { useState } from "react";
import { AddAddress } from "../../services/users";
export function Addresses() {
  const { dispatch } = useEcom();
  const { state } = useEcom();
  const { addresses } = state;
  console.log({ addresses }, " user's addresses", addresses.length);
  const [modalStatus, setModalStatus] = useState(false);
  const [saveAddressButtonText, setSaveAddressButtonText] =
    useState("Save Address");
  const AddAddressModal = () => {
    const [address, setAddress] = useState(null);
    async function saveAddressHandler(e) {
      console.log("coming here or not");
      e.preventDefault();
      console.log({ address });
      setSaveAddressButtonText("Saving...");
      const addresses = await AddAddress(address);
      dispatch({ type: "ADDRESS_ADDED", payload: { addresses } });
      setSaveAddressButtonText("Save Address");
      setModalStatus(false);
    }
    return (
      <div className="address-modal-outer">
        <div className="address-modal-main">
          <button
            style={{ marginLeft: "auto" }}
            onClick={() => setModalStatus(false)}
          >
            X
          </button>
          <form
            className="address-form"
            onSubmit={(e) => saveAddressHandler(e)}
          >
            <input
              className="address-column"
              type="text"
              name="name"
              required
              placeholder="Name"
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />
            <input
              className="address-column"
              type="text"
              name="address"
              required
              placeholder="Address"
              onChange={(e) =>
                setAddress({ ...address, address: e.target.value })
              }
            />
            <input
              className="address-column"
              type="number"
              name="pincode"
              required
              placeholder="Pincode"
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
            <input
              className="address-column"
              type="text"
              name="city"
              required
              placeholder="City"
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
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
        <div>
          {addresses.map((address) => (
            <div className="address-outer">
              <div key={address._id} className="address">
                <input
                  type="radio"
                  name="selectedAddress"
                  style={{ alignSelf: "center", marginRight: "1rem" }}
                />
                <div>
                  <p style={{ fontWeight: "bold" }}>{address.name}</p>
                  <p>{address.address}</p>
                  <p>
                    {address.city} - {address.pincode}
                  </p>
                </div>
              </div>
              <button
                className="button button-danger"
                style={{ marginLeft: "auto" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {modalStatus && <AddAddressModal />}
    </div>
  );
}
