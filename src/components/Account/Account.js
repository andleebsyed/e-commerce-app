import "./Account.css";
import { Login, useLogin } from "../Login/Login";
import { ProfileDetails } from "../ProfileDetails/ProfileDetails";
import { PasswordReset } from "../PasswordReset/PasswordReset";
import { useAuth } from "../../contexts/AuthContext";
export function Account() {
  //   const { user, setUser, token } = useLogin();
  const { authState } = useAuth();
  const { authorized } = authState;
  //   function handleLogout() {
  //     // setUser();
  //     // // setUsername("");
  //     // // setPassword("");
  //     // localStorage.clear();

  //   }
  if (authorized) {
    return (
      <div className="outer-div">
        <div className="heading">
          <h1 className="welcome-text">username</h1>
          <button
            className="button button-primary button-custom"
            // onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="cards-container">
          <ProfileDetails />
          <PasswordReset />
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
}
