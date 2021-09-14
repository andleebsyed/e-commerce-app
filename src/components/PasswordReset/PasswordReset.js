import "./PasswordReset.css";
export function PasswordReset() {
  return (
    <form>
      <div className="account-info password-div">
        <p className="label">Reset Password</p>
        <div className="inline-inputs">
          <div className="holder internal-inline-div">
            <label className="labels-acc" htmlFor="username">
              Current Password
            </label>
            <input
              name="oldPassword"
              type="password"
              className="input-box acc-username"
              placeholder=""
              required
            />
          </div>
          <div className="holder internal-inline-div">
            <label className="labels-acc new-passsword" htmlFor="username">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              className="input-box acc-username"
              placeholder=""
              required
            />
          </div>
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
          />
        </div>
        <button type="submit" className="button button-outline submit-button ">
          UPDATE PASSWORD
        </button>
      </div>
    </form>
  );
}
