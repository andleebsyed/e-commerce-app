import "./Login.css";
import { useState, createContext, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserSignIn } from "../../services/users";
import { useAuth } from "../../contexts/AuthContext";
import { useEcom } from "../ecom-context/ecom-context";
// import { useForm } from "react-hook-form";
const LoginContext = createContext();
export function Login() {
  //   const { user, setUser } = useLogin();
  //   let testuname = "test";
  //   let testpw = "test123";
  //   const { register, handleSubmit } = useForm();
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [innetText, setInnerText] = useState(false);
  //   const [failure, setFailure] = useState("none");

  //   useEffect(() => {
  //     const loggedInUser = localStorage.getItem("user");
  //     if (loggedInUser) {
  //       const foundUser = JSON.parse(loggedInUser);
  //       setUser(foundUser);
  //     }
  //   }, [user]);
  //   const onSubmit = ({ username, password }) => {
  //     let unBox = document.querySelector(".username");
  //     let pwBox = document.querySelector(".password");
  //     const data = { username, password };
  //     if (username === testuname && password === testpw) {
  //       // set the state of the user
  //       setUser(data);
  //       // store the user in localStorage
  //       localStorage.setItem("user", JSON.stringify(data));
  //     } else {
  //       // unBox.innerText = ''
  //       // pwBox.innetText = ''
  //       setFailure("block");
  //     }
  //   };
  const { dispatchAuth } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [displayError, setDisplayError] = useState("none");
  const [loginButtonText, setLoginButtonText] = useState("Login");
  const { dispatch } = useEcom();
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    setLoginButtonText("Logging you in...");
    const response = await UserSignIn(userDetails);
    setLoginButtonText("Login");
    if (response.allowUser === false) {
      setDisplayError("block");
    } else if (response.allowUser === true) {
      setDisplayError("none");
      dispatchAuth({
        type: "AUTHORIZE_USER",
        payload: response,
      });
      dispatch({ type: "INITIAL_DATA", payload: response });
      navigate("/products");
    }
  }
  return (
    <form className="form" onSubmit={(e) => handleLogin(e)}>
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
        {/* <Link to="#" className="password-reset">
          Forgot Password?
        </Link> */}
        <p>
          Don't have an account?{" "}
          <Link className="signup-link" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
  // }
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
