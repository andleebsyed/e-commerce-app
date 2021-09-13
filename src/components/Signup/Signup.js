import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserSignUp } from "../../services/users";
import "./Signup.css";

export function Signup() {
  const [userDetails, setUserDetails] = useState(null);
  const [signUpButtonText, setSignUpButtonText] = useState("Sign Up");
  const [exisitingOne, setExistingOne] = useState("");
  const [displayError, setDisplayError] = useState("none");
  const [error, setError] = useState({ status: "hidden", message: "" });
  const { dispatchAuth } = useAuth();
  const navigate = useNavigate();
  function PasswordHandler() {
    if (userDetails.password.length < 6) {
      setError({
        ...error,
        message: "Password must be atleast of 6 characters",
        status: "block",
      });
    } else if (userDetails.password !== userDetails.confirmPassword) {
      setError({
        ...error,
        message: "Passwords didn't match",
        status: "block",
      });
    } else if (userDetails.password.match("[0-9]+") === null) {
      setError({
        ...error,
        message: "Password must contain a number",
        status: "block",
      });
    } else if (userDetails.password.match("(?=.*[A-Z])") === null) {
      setError({
        ...error,
        message: "Password must contain a Capital letter",
        status: "block",
      });
    } else {
      setError({ ...error, status: "hidden" });
      return true;
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const apiCallStatus = PasswordHandler();
    console.log({ userDetails });
    if (apiCallStatus) {
      setSignUpButtonText("Signing up");
      const response = await UserSignUp(userDetails);
      setSignUpButtonText("Sign Up");
      if (response.status === false) {
        setExistingOne(response.existingField);
        setDisplayError("block");
      } else if (response.status === true) {
        console.log("Signed up successfully");
        setDisplayError("none");
        dispatchAuth({
          type: "AUTHORIZE_USER",
        });
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        navigate("/");
      }
    }
  }
  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <div className="login-main">
        <h1 className="login-heading">Sign Up</h1>
        <p
          className="error-message"
          style={{ display: displayError, color: "red" }}
        >
          {`${exisitingOne} already exists`}
        </p>
        <p className={`${error.status}`}>{error.message}</p>
        <input
          className="input-field username"
          type="text"
          placeholder="name"
          name="name"
          required
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
        />
        <input
          className="input-field username"
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={(e) =>
            setUserDetails({ ...userDetails, username: e.target.value })
          }
        />
        <input
          className="input-field email"
          type="email"
          placeholder="Email"
          name="email"
          required
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
        />
        <input
          className="input-field password"
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
        />
        <input
          className="input-field password"
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) =>
            setUserDetails({ ...userDetails, confirmPassword: e.target.value })
          }
        />

        <input
          type="submit"
          className="button button-outline login-button"
          value={signUpButtonText}
        />
        <p>
          Already have an account?{" "}
          <Link className="signup-link" to="/account">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}
