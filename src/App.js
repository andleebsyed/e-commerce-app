import "./App.css";
import { Products } from "./components/product-page/product-page";
import { Header } from "./components/Header/header";
import { Wishlist } from "./components/Wishlist/wishlist";
import { Cart } from "./components/Cart/cart";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEcom } from "./components/ecom-context/ecom-context";
import { Loader } from "./components/Loader/Loader";
import { Homepage } from "./components/Homepage/Homepage";
import { Search } from "./components/Search/Search";
import { Product } from "./components/Product/Product";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { Account } from "./components/Account/Account";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import {
  setupAuthExceptionHandler,
  setUpAuthHeaderForServiceCalls,
} from "./services/users";

function App() {
  const { loader, state } = useEcom();
  const { cart } = state;
  // const { user } = useLogin();
  const { authState, dispatchAuth } = useAuth();
  const { authorized } = authState;
  const navigate = useNavigate();
  // console.log({ loader });
  // Auth route
  useEffect(() => {
    setupAuthExceptionHandler(dispatchAuth, navigate);
    setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
    dispatchAuth({ type: "AUTH_SETUP" });
  }, [dispatchAuth, navigate]);
  function PrivateRoute({ isLoggedIn, element, ...props }) {
    return <Route {...props} element={authorized ? element : <Login />} />;
  }

  // custom route to redirect user to account if logged  in
  function LoginRoute({ props, element }) {
    if (authorized) {
      return <Navigate to="/products" replace={true} />;
    } else {
      return <Route {...props} element={<Login />} />;
    }
  }

  return (
    <div className="main-div">
      <div className="app-header">
        <Header />
      </div>
      <Loader loader={loader} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="homepage">
              <Homepage />
            </div>
          }
        />
        <Route
          path="/products"
          element={
            <div className="products">
              <Products />
            </div>
          }
        />

        <PrivateRoute
          path="/wishlist"
          element={
            <div className="wishlist">
              <Wishlist />
            </div>
          }
        />
        <PrivateRoute
          path="/cart"
          element={
            <div className="cart">
              <Cart />
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="searched-products">
              <Search />
            </div>
          }
        />
        <Route
          path="/products/:id"
          element={
            <div className="single-product">
              <Product cart={cart} />
            </div>
          }
        />
        <Route
          path="/account"
          element={
            <div className="homepage">
              <Account />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="homepage">
              <Signup />
            </div>
          }
        />
        <LoginRoute
          path="/login"
          element={
            <div className="homepage">
              <Login />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
