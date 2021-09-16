import { createContext, useContext, useReducer } from "react";
import { setUpAuthHeaderForServiceCalls } from "../services/users";

const AuthContext = createContext();
function authReducer(state, { type, payload }) {
  switch (type) {
    case "AUTH_SETUP":
      return { ...state, authSetup: true };
    case "AUTHORIZE_USER":
      console.log({ payload });
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userId", payload.userId);
      setUpAuthHeaderForServiceCalls(payload.token);

      return { ...state, authorized: true };
    case "LOGOUT_USER":
      localStorage.clear();
      return { ...state, authorized: false };
    case "FETCH_ACCOUNT":
      return { ...state, account: payload.account };
    case "ACCOUNT_UPDATE":
      return { ...state, account: payload.updatedAccount };
    default:
      return state;
  }
}
export function AuthProvider({ children }) {
  const [authState, dispatchAuth] = useReducer(authReducer, {
    authorized: localStorage.getItem("token") ? true : false,
    account: null,
    authSetup: false,
  });
  return (
    <AuthContext.Provider value={{ authState, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
