import "./addresses.css";
import { useEcom } from "../ecom-context/ecom-context";

export function Addresses() {
  const { state } = useEcom();
  const { addresses } = state;
  return addresses === null ? (
    <div>loading...</div>
  ) : (
    <div className="address-main">
      <div className="address-heading">
        <p>Select Address</p>
        <button className="button button-primary">Add new address</button>
      </div>
      {addresses.length === 0 ? (
        <div>
          <p>you have no saved addresses</p>
        </div>
      ) : (
        <div>These are my addressses</div>
      )}
    </div>
  );
}
