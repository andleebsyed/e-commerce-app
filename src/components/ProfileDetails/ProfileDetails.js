import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { UpdateProfile } from "../../services/users";
import { useEcom } from "../ecom-context/ecom-context";
import "./ProfileDetails.css";
export function ProfileDetails() {
  const { authState, dispatchAuth } = useAuth();
  const { account } = authState;
  const { dispatch } = useEcom();
  const [accountDetails, setAccountDetails] = useState({
    newName: account.name,
    newUsername: account.username,
    newEmail: account.email,
  });
  const [updateMessage, setUpdateMessage] = useState({
    message: "a",
    styleClass: "update-inital-render-class",
  });
  async function profileUpdateHandler(e) {
    e.preventDefault();
    const response = await UpdateProfile(accountDetails);
    if (response.status) {
      // getUser(newUsername)
      setUpdateMessage((updateMessage) => {
        return {
          message: response.message,
          styleClass: "update-status update-success",
        };
      });
      dispatchAuth({
        type: "ACCOUNT_UPDATE",
        payload: { updatedAccount: response.account },
      });
    } else {
      setUpdateMessage({
        message: response,
        styleClass: "update-status update-failure",
      });
    }
  }
  // if (response) {
  //   dispatch({
  //     type: "ACCOUNT_UPDATE",
  //     payload: { UpdatedAccount: response },
  //   });
  // }

  return (
    <form onSubmit={(e) => profileUpdateHandler(e)}>
      <div className="profile-details width-adjust">
        <p className="label">Account</p>
        <p className={updateMessage.styleClass}>{updateMessage.message}</p>

        <div className="holder">
          <label className="labels-acc" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="input-box acc-username"
            placeholder="name"
            defaultValue={accountDetails.newName}
            onChange={(e) =>
              setAccountDetails({ ...accountDetails, newName: e.target.value })
            }
            required
          />
        </div>
        <div className="holder">
          <label className="labels-acc" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="input-box acc-username"
            placeholder="username"
            defaultValue={accountDetails.newUsername}
            onChange={(e) =>
              setAccountDetails({
                ...accountDetails,
                newUsername: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="holder">
          <label className="labels-acc" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="input-box acc-password"
            placeholder="email"
            required
            defaultValue={accountDetails.newEmail}
            onChange={(e) =>
              setAccountDetails({ ...accountDetails, newEmail: e.target.value })
            }
          />
        </div>
        <button type="submit" className="button button-outline submit-button ">
          UPDATE
        </button>
      </div>
    </form>
  );
}
