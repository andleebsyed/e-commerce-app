import "./Account.css";
import { Login } from "../Login/Login";
import { ProfileDetails } from "../ProfileDetails/ProfileDetails";
import { PasswordReset } from "../PasswordReset/PasswordReset";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FetchAccount } from "../../services/users";
import { SpinLoader } from "../Loader/SpinnerLoader";
export function Account() {
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
      if (response) {
        dispatchAuth({ type: "FETCH_ACCOUNT", payload: response });
      }
    }
    if (account === null && authSetup) {
      Run();
    }
  }, [dispatchAuth, account, authSetup]);
  if (authorized) {
    return account === null ? (
      <div style={{ minHeight: "100vh" }}>
        <SpinLoader />
      </div>
    ) : (
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
