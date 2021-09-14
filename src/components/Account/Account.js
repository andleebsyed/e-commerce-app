import "./Account.css";
import { Login } from "../Login/Login";
import { ProfileDetails } from "../ProfileDetails/ProfileDetails";
import { PasswordReset } from "../PasswordReset/PasswordReset";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { BASE_URL } from "../../services/api";
import { FetchAccount } from "../../services/users";
// import { useEffect } from "react";
export function Account() {
  //   const { user, setUser, token } = useLogin();
  const { authState, dispatchAuth } = useAuth();
  const { authorized, account, authSetup } = authState;
  const navigate = useNavigate();
  function handleLogout() {
    dispatchAuth({ type: "LOGOUT_USER" });
    navigate("/");
  }
  useEffect(() => {
    async function Run() {
      const response = await FetchAccount();
      dispatchAuth({ type: "FETCH_ACCOUNT", payload: response });
    }
    if (account === null && authSetup) {
      Run();
    }
  }, [dispatchAuth, account, authSetup]);
  if (authorized) {
    return (
      <div className="outer-div">
        <div className="heading">
          <h1 className="welcome-text">{account?.name}</h1>
          <button
            className="button button-primary button-custom"
            onClick={handleLogout}
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
