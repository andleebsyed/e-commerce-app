import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
function authReducer(state, { type, payload }) {
  switch (type) {
    case "AUTHORIZE_USER":
      return { ...state, authorized: true };
    default:
      return state;
  }
}
export function AuthProvider({ children }) {
  const [authState, dispatchAuth] = useReducer(authReducer, {
    authorized: localStorage.getItem("token") ? true : false,
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
