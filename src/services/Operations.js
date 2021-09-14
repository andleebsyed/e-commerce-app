import axios from "axios";
import { BASE_URL } from "./api";

export async function AddToCart(product, dispatch, loader, setLoader) {
  try {
    setLoader(true);
    const productId = product._id;
    const responseWishlist = await axios.delete(
      BASE_URL + `/wishlist/${productId}`
      //   `https://rest-api.andydev7.repl.co/wishlist/${id}`
    );
    const responseCart = await axios.post(
      BASE_URL + "/cart",
      { productId }
      //   "https://rest-api.andydev7.repl.co/cart",
      //   productId
    );
    console.log({ responseCart }, " what happened to cart");
    setLoader(false);
    if (responseCart.status === 200) {
      dispatch({ type: "ADD_TO_CART", payload: { productId } });
    }
  } catch (error) {
    console.log("err message is ", error.message);
  }
}

export async function AddToWishlist(product, dispatch, loader, setLoader) {
  try {
    setLoader(true);
    const productId = product._id;
    console.log({ productId }, "will go to server");
    const responseCart = await axios.delete(BASE_URL + `/cart/${productId}`);
    const response = await axios.post(BASE_URL + "/wishlist", { productId });
    console.log({ responseCart }, " of cart");
    console.log({ response }, " of wishlist");
    setLoader(false);
    if (response.status === 200) {
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: { productId: product._id },
      });
    }
  } catch (error) {
    console.log("err message is ", error.message);
  }
}

export async function RemoveFromCart(product, dispatch, loader, setLoader) {
  try {
    setLoader(true);
    const productId = product._id;
    const response = await axios.delete(
      BASE_URL + `/cart/${productId}`
      //   `https://rest-api.andydev7.repl.co/cart/${id}`
    );
    console.log("on deleting item from caart ", response);
    if (response.status === 200) {
      setLoader(false);
      dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
    }
  } catch (error) {
    setLoader(false);
    console.log("coudn't delete item from collection cart ", error.message);
  }
}

export async function MoveToWishlist(product, dispatch, loader, setLoader) {
  try {
    setLoader(true);
    const productId = product._id;
    const responseAdd = await axios.post(
      BASE_URL + "/wishlist",
      //   "https://rest-api.andydev7.repl.co/wishlist",
      productId
    );
    const responseRemove = await axios.delete(
      BASE_URL + `/cart/${productId}`
      //   `https://rest-api.andydev7.repl.co/cart/${productId}`
    );

    if (responseAdd.status === 200 && responseRemove.status === 200) {
      setLoader(false);
      dispatch({ type: "MOVE_TO_WISHLIST", payload: { productId } });
    }
  } catch (error) {
    console.log("error occured while moving ", error.message);
  }
}

export async function RemoveFromWishlist(product, dispatch, loader, setLoader) {
  try {
    setLoader(true);
    const productId = product._id;
    const response = await axios.delete(
      BASE_URL + `/wishlist/${productId}`
      //   `https://rest-api.andydev7.repl.co/wishlist/${id}`
    );
    console.log({ response }, "on removing from wishlist");
    if (response.status === 200) {
      setLoader(false);
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product });
    }
  } catch (error) {
    console.log("error occured : ", error.message);
  }
}

export async function ChangeQuantity(
  product,
  dispatch,
  paramCase,
  loader,
  setLoader
) {
  if (paramCase === "dec") {
  }
  try {
    if (paramCase === "inc") {
      setLoader(true);
      const response = await axios.put(
        `https://rest-api.andydev7.repl.co/cart/?case=inc`,
        product
      );
      if (response.status === 200) {
        setLoader(false);
        dispatch({ type: "INCREASE_QUANTITY", payload: product });
      }
    } else {
      if (product.quantity === 1) {
        setLoader(true);
        const resposneOnEmptyCase = await axios.delete(
          `https://rest-api.andydev7.repl.co/cart/${product._id}`
        );
        setLoader(false);
        dispatch({ type: "DECREASE_QUANTITY", payload: product });
      }
      setLoader(true);
      const response = await axios.put(
        `https://rest-api.andydev7.repl.co/cart/?case=dec`,
        product
      );
      if (response.status === 200) {
        setLoader(false);
        dispatch({ type: "DECREASE_QUANTITY", payload: product });
      }
    }
  } catch (error) {
    console.log("error occured : ", error.message);
  }
}
