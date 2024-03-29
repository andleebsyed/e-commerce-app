import axios from "axios";
import { BASE_URL } from "./api";

export async function AddToCart(product, dispatch, loader, setLoader) {
  try {
    setLoader(true);
    const productId = product._id;
    await axios.delete(BASE_URL + `/wishlist/${productId}`);
    const responseCart = await axios.post(BASE_URL + "/cart", { productId });
    setLoader(false);
    if (responseCart.status === 200) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { cartItems: responseCart.data.response.cart, productId },
      });
    }
  } catch (error) {
    console.log("err message is ", error.message);
  }
}

export async function AddToWishlist(product, dispatch, loader, setLoader) {
  try {
    console.log("in api function");
    setLoader(true);
    const productId = product._id;
    await axios.delete(BASE_URL + `/cart/${productId}`);
    const response = await axios.post(BASE_URL + "/wishlist", { productId });
    console.log({ response }, "response on adding to wishlist");
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
    const response = await axios.delete(BASE_URL + `/cart/${productId}`);
    if (response.status === 200) {
      setLoader(false);
      dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
    }
  } catch (error) {
    setLoader(false);
    console.log("couldn't delete item from collection cart ", error.message);
  }
}

export async function MoveToWishlist(product, dispatch, loader, setLoader) {
  try {
    setLoader(true);
    const productId = product._id;
    const responseAdd = await axios.post(BASE_URL + "/wishlist", { productId });
    const responseRemove = await axios.delete(BASE_URL + `/cart/${productId}`);
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
    const response = await axios.delete(BASE_URL + `/wishlist/${productId}`);
    if (response.status === 200) {
      setLoader(false);
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product });
    }
  } catch (error) {
    console.log("error occured : ", error.message);
  }
}

export async function ChangeQuantity({
  wholeProduct,
  dispatch,
  paramCase,
  loader,
  setLoader,
}) {
  const { product, quantity, _id } = wholeProduct;

  const productId = product._id;
  const wholeProductId = _id;
  try {
    if (paramCase === "dec" && quantity === 1) {
      setLoader(true);
      const resposneOnEmptyCase = await axios.delete(
        BASE_URL + `/cart/${productId}`
      );
      console.log("quantity was 1 ", resposneOnEmptyCase);
      setLoader(false);
      dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
    }
    if (paramCase === "dec" && quantity !== 1) {
      setLoader(true);
      await axios.put(BASE_URL + `/cart/?case=dec`, {
        wholeProductId,
      });
      setLoader(false);
      dispatch({ type: "DECREASE_QUANTITY", payload: { productId } });
    }

    if (paramCase === "inc") {
      setLoader(true);
      const response = await axios.put(BASE_URL + "/cart/?case=inc", {
        wholeProductId,
      });
      if (response.data.status) {
        setLoader(false);
        dispatch({ type: "INCREASE_QUANTITY", payload: { productId } });
      }
    }
  } catch (error) {
    console.log("error occured : ", error.message);
  }
}

export async function EmptyCart() {
  try {
    const response = await axios.post(BASE_URL + "/cart/emptycart");
    if (response.data.status) {
      return response.data.status;
    } else {
      console.log("something went wrong ", { response });
    }
  } catch (error) {
    console.log("error occurred ", error.message);
  }
}
