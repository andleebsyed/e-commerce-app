import './ProfileDetails.css'
export function ProfileDetails() {
    return (
        <div className="account-info">
            <p className="label">Account</p>
            <div className="holder">
                <label className="labels-acc" for="username">Username</label>
                <input type="text" name="username" type="username" className="input-box acc-username" placeholder="username" required />
            </div>
            <div className="holder">
                <label className="labels-acc" for="email">Email</label>
                <input type="text" name="email" type="email" className="input-box acc-password" placeholder="email" required />
            </div>
            <button type="submit" className="button button-outline submit-button ">UPDATE</button>
        </div>
    )
}