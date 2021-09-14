import "./ProfileDetails.css";
export function ProfileDetails() {
  return (
    <form>
      <div className="profile-details width-adjust">
        <p className="label">Account</p>
        <div className="holder">
          <label className="labels-acc" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="input-box acc-username"
            placeholder="username"
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
          />
        </div>
        <button type="submit" className="button button-outline submit-button ">
          UPDATE
        </button>
      </div>
    </form>
  );
}
