import "./addresses.css";
import { useEcom } from "../ecom-context/ecom-context";
import { useState } from "react";
import { AddAddress, RemoveAddress } from "../../services/users";
import { AddAddressModal } from "../AddAddress/AddAddress";
export function Addresses() {
  const { dispatch } = useEcom();
  const { state } = useEcom();
  const { addresses } = state;
  console.log({ addresses }, " user's addresses", addresses.length);
  const [modalStatus, setModalStatus] = useState(false);
  const [removeButtonText, setRemoveButtonText] = useState("Remove");
  async function removeAddressHandler(addressId) {
    // setRemoveButtonText("Removing...");
    const addresses = await RemoveAddress(addressId);
    dispatch({ type: "ADDRESS_ADDED", payload: { addresses } });
    // setRemoveButtonText("Remove");
  }

  return addresses === null ? (
    <div>loading...</div>
  ) : (
    <div className="address-main">
      <div className="address-heading">
        <p style={{ fontWeight: "bold" }}>Select Address</p>
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
            <div className="address-outer" key={address._id}>
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
                onClick={() => removeAddressHandler(address._id)}
              >
                {removeButtonText}
              </button>
            </div>
          ))}
        </div>
      )}
      {modalStatus && <AddAddressModal setModalStatus={setModalStatus} />}
    </div>
  );
}
