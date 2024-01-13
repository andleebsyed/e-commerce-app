import { useState } from "react";
import { AddAddress } from "../../services/users";
import { useEcom } from "../ecom-context/ecom-context";

export const AddAddressModal = ({ setModalStatus }) => {
  const [saveAddressButtonText, setSaveAddressButtonText] =
    useState("Save Address");
  const [address, setAddress] = useState(null);
  const { dispatch } = useEcom();
  async function saveAddressHandler(e) {
    e.preventDefault();
    setSaveAddressButtonText("Saving...");
    const addresses = await AddAddress(address);
    dispatch({ type: "ADDRESS_ADDED", payload: { addresses } });
    setSaveAddressButtonText("Save Address");
    setModalStatus(false);
  }

  return (
    <div className="modal-outer">
      <div className="modal-main">
        <button
          style={{ marginLeft: "auto" }}
          onClick={() => setModalStatus(false)}
        >
          X
        </button>
        <form className="address-form" onSubmit={(e) => saveAddressHandler(e)}>
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
