import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { BASE_URL } from "../../services/api";

const EcomContext = createContext();

function ecomReducer(state, { type, payload }) {
  const { wishlist, cart, data, orgData, filteredProducts } = state;
  switch (type) {
    case "INITIAL_PRODUCTS":
      return {
        ...state,
        data: [...payload],
        orgData: [...payload],
        filteredProducts: [],
      };
    case "INITIAL_DATA":
      return {
        ...state,
        cart: payload.account.cart,
        wishlist: payload.account.wishlist,
        addresses: payload.account.addresses,
      };
    case "ADD_TO_WISHLIST":
      const product = state.data.find(
        (singleProduct) => singleProduct._id === payload.productId
      );
      return {
        ...state,
        cart: cart.filter((item) => item._id !== payload.productId),
        wishlist: [...wishlist, product],
      };
    case "ADD_TO_CART":
      const newToCart = state.data.find(
        (product) => product._id === payload.productId
      );
      return {
        ...state,
        wishlist: wishlist.filter((item) => item._id !== payload.productId),
        cart: [...cart, { ...newToCart, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: cart.filter((product) => product._id !== payload.productId),
      };
    case "MOVE_TO_WISHLIST":
      const toMoveProduct = state.data.find(
        (singleProduct) => singleProduct._id === payload.productId
      );
      return {
        ...state,
        wishlist: [...wishlist, toMoveProduct],
        cart: cart.filter((product) => product._id !== payload.productId),
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: wishlist.filter((product) => product._id !== payload._id),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: cart.map((product) =>
          product._id === payload._id
            ? { ...product, quantity: product.quantity + 1 }
            : { ...product }
        ),
      };
    case "DECREASE_QUANTITY":
      if (payload.quantity < 2) {
        return {
          ...state,
          cart: cart.filter((product) => product._id !== payload._id),
        };
      }
      return {
        ...state,
        cart: cart.map((product) =>
          product._id === payload._id
            ? { ...product, quantity: product.quantity - 1 }
            : { ...product }
        ),
      };
    case "SORT":
      if (payload.target.value === "low_to_high") {
        return { ...state, data: data.sort((a, b) => a.price - b.price) };
      } else {
        return { ...state, data: data.sort((a, b) => b.price - a.price) };
      }
    case "REMOVE_OUT_OF_STOCK":
      if (payload === true)
        return {
          ...state,
          data: data.filter((product) => product.inStock === true),
          searchStatus: false,
        };
      else return { ...state, data: orgData };
    case "SHOW_FAST_DELIVERY_ONLY":
      if (payload === true)
        return {
          ...state,
          data: data.filter((product) => product.fastDelivery === true),
          searchStatus: false,
        };
      else return { ...state, data: orgData };
    case "SEARCH_FOR_ITEM":
      return {
        ...state,
        filteredProducts: orgData.filter((product) =>
          product.name.toLowerCase().includes(payload.toLowerCase())
        ),
        searchStatus: true,
      };
    case "ADDRESS_ADDED":
      return { ...state, addresses: payload.addresses };
    case "EMPTY_CART":
      return { ...state, cart: [] };
    case "REMOVE_ALL_CONDITIONS":
      return { ...state, data: orgData };
    default:
      return state;
  }
}

export function EcomProvider({ children }) {
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useReducer(ecomReducer, {
    cart: null,
    wishlist: null,
    data: [],
    orgData: [],
    filteredProducts: [],
    addresses: null,
  });

  useEffect(() => {
    async function MyProducts() {
      setLoader(true);
      const response = await axios.get(BASE_URL + "/products");
      dispatch({ type: "INITIAL_PRODUCTS", payload: response.data.myData });
      setLoader(false);
    }
    MyProducts();
  }, []);

  return (
    <EcomContext.Provider value={{ state, dispatch, loader, setLoader }}>
      {children}
    </EcomContext.Provider>
  );
}

export function useEcom() {
  return useContext(EcomContext);
}
