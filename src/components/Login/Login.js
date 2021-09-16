import "./Login.css";
import { useState, createContext, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserSignIn } from "../../services/users";
import { useAuth } from "../../contexts/AuthContext";
import { useEcom } from "../ecom-context/ecom-context";
const LoginContext = createContext();
export function Login() {
  const { dispatchAuth } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [displayError, setDisplayError] = useState("none");
  const [loginButtonText, setLoginButtonText] = useState("Login");
  const { dispatch } = useEcom();
  const navigate = useNavigate();
  async function handleLogin({ e, guest }) {
    e.preventDefault();
    setLoginButtonText("Logging you in...");
    const response = await UserSignIn(
      guest
        ? { username: "peter_parker", password: "Peterparker@123" }
        : userDetails
    );
    setLoginButtonText("Login");
    if (response.allowUser === false) {
      setDisplayError("block");
    } else if (response.allowUser === true) {
      setDisplayError("none");
      dispatchAuth({
        type: "AUTHORIZE_USER",
        payload: { response, dispatchAuth, navigate },
      });
      dispatch({ type: "INITIAL_DATA", payload: response });
      navigate("/products");
    }
  }
  async function guestLoginHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    await handleLogin({ e, guest: true });
  }
  return (
    <form className="form" onSubmit={(e) => handleLogin({ e })}>
      <div className="login-main">
        <h1 className="login-heading">Login</h1>
        <p
          className="error-message"
          style={{ display: displayError, color: "red" }}
        >
          Username or password is incorrect
        </p>
        <input
          className="input-field username"
          type="text"
          placeholder="Enter Username"
          name="username"
          required
          onChange={(e) =>
            setUserDetails({ ...userDetails, username: e.target.value })
          }
        />
        <input
          className="input-field password"
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
        />
        <input
          type="submit"
          className="button button-outline login-button"
          value={loginButtonText}
        />
        <p>
          Don't have an account?{" "}
          <Link className="signup-link" to="/signup">
            Sign up
          </Link>
        </p>
        <button
          type="submit"
          className="button button-primary"
          onClick={(e) => guestLoginHandler(e)}
        >
          Login as Guest
        </button>
      </div>
    </form>
  );
}

export function LoginProvider({ children }) {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  return (
    <LoginContext.Provider value={{ user, setUser, token }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}
