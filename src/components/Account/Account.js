import './Account.css'
import { Login, useLogin } from "../Login/Login"
import { ProfileDetails } from '../ProfileDetails/ProfileDetails'
import { PasswordReset } from '../PasswordReset/PasswordReset';
export function Account() {
    const { user, setUser } = useLogin()
    function handleLogout() {
        setUser();
        // setUsername("");
        // setPassword("");
        localStorage.clear();
    }
    if (user) {
        return (
            <div className="outer-div">
                <div className="heading">
                    <h1 className="welcome-text">{user.username}</h1>
                    <button className="button button-primary button-custom" onClick={handleLogout}>Logout</button>
                </div>
                <div className="cards-container">

                    <ProfileDetails />
                    <PasswordReset />

                </div>

            </div >

        )
    }
    else {
        return (<Login />)
    }

}