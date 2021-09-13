import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import axios from "axios";

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
      return {
        ...state,
        wishlist: wishlist.filter((item) => item._id !== payload._id),
        cart: [...cart, { ...payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: cart.filter((product) => product._id !== payload._id),
      };
    case "MOVE_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...wishlist, payload],
        cart: cart.filter((product) => product._id !== payload._id),
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
  });

  useEffect(() => {
    async function MyProducts() {
      setLoader(true);
      const response = await axios.get(
        "https://rest-api.andydev7.repl.co/products"
      );
      dispatch({ type: "INITIAL_PRODUCTS", payload: response.data.myData });
      setLoader(false);
    }
    MyProducts();
  }, []);

  //   useEffect(() => {
  //     async function MyCart() {
  //       const response = await axios.get(
  //         "https://rest-api.andydev7.repl.co/cart"
  //       );
  //       dispatch({ type: "INITIAL_CART", payload: response.data.myCart });
  //     }
  //     MyCart();
  //   }, []);

  //   useEffect(() => {
  //     async function MyWishlist() {
  //       const response = await axios.get(
  //         "https://rest-api.andydev7.repl.co/wishlist"
  //       );
  //       dispatch({ type: "INITIAL_WISHLIST", payload: response.data.myWishlist });
  //     }

  //     MyWishlist();
  //   }, []);

  return (
    <EcomContext.Provider value={{ state, dispatch, loader, setLoader }}>
      {children}
    </EcomContext.Provider>
  );
}

export function useEcom() {
  return useContext(EcomContext);
}
