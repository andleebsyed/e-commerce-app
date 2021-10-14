import { useState } from "react";
import { UpdatePassword } from "../../services/users";
import "./PasswordReset.css";
export function PasswordReset() {
  const [passwords, setPasswords] = useState({});
  const [passwordsError, setPasswordsError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  function PasswordHandler() {
    if (passwords.newPassword.length < 6) {
      setPasswordsError({
        ...passwordsError,
        message: "Password must be atleast of 6 characters",
        status: "block",
      });
    } else if (passwords.newPassword !== passwords.confirmNewPassword) {
      setPasswordsError({
        ...passwordsError,
        message: "Passwords didn't match",
        status: "block",
      });
    } else if (passwords.newPassword.match("[0-9]+") === null) {
      setPasswordsError({
        ...passwordsError,
        message: "Password must contain a number",
        status: "block",
      });
    } else if (passwords.newPassword.match("(?=.*[A-Z])") === null) {
      setPasswordsError({
        ...passwordsError,
        message: "Password must contain a Capital letter",
        status: "block",
      });
    } else {
      setPasswordsError({ ...passwordsError, status: "hidden" });
      return true;
    }
  }
  async function passwordUpdateHandler(e) {
    e.preventDefault();
    setPasswordsError(null);
    setSuccessMessage(false);
    const passwordAllowed = PasswordHandler();
    if (passwordAllowed) {
      const data = {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      };
      const response = await UpdatePassword(data);
      if (response.status) {
        setPasswordsError(null);
        setSuccessMessage(true);
      } else {
        setPasswordsError({ ...passwordsError, message: response });
      }
    }
  }
  return (
    <form onSubmit={(e) => passwordUpdateHandler(e)}>
      <div className="account-info password-div">
        <p className="label">Reset Password</p>
        {successMessage && (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Password updated Successfully
          </p>
        )}
        {passwordsError && (
          <p
            style={{
              display: passwordsError.status,
              color: "red",
              fontWeight: "bold",
            }}
          >
            {passwordsError.message}
          </p>
        )}
        <div className="holder ">
          <label className="labels-acc" htmlFor="username">
            Current Password
          </label>
          <input
            name="oldPassword"
            type="password"
            className="input-box acc-username"
            placeholder=""
            required
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
          />
        </div>
        <div className="holder ">
          <label className="labels-acc new-passsword" htmlFor="username">
            New Password
          </label>
          <input
            name="newPassword"
            type="password"
            className="input-box acc-username"
            placeholder=""
            required
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />
        </div>
        <div className="holder">
          <label className="labels-acc" htmlFor="username">
            Confirm New Password
          </label>
          <input
            name="confirmNew"
            type="password"
            className="input-box acc-username"
            placeholder=""
            required
            onChange={(e) =>
              setPasswords({ ...passwords, confirmNewPassword: e.target.value })
            }
          />
        </div>
        <button type="submit" className="button button-outline submit-button ">
          UPDATE PASSWORD
        </button>
      </div>
    </form>
  );
}
