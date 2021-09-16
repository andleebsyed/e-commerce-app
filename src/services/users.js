import axios from "axios";
import { BASE_URL } from "./api";

export function setUpAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function setupAuthExceptionHandler(dispatchAuth, navigate) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        console.log("401 handled");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        dispatchAuth({ type: "LOGOUT_USER" });
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
}

export async function UserSignUp(userDetails) {
  let isSignUpSuccessfull;
  try {
    const response = await axios.post(BASE_URL + "/user/signup", userDetails);
    console.log("response ", { response });
    if (response.status === 200) {
      if (response.data.status === true) {
        return (isSignUpSuccessfull = {
          status: true,
          token: response.data.token,
          userId: response.data.userId,
        });
      } else if (response.data.status === false) {
        //  11000 is returned when we send data which is already there for common field
        if (response.data.code === 11000) {
          isSignUpSuccessfull = {
            status: false,
            existingField: response.data.existingField,
          };
          return isSignUpSuccessfull;
        }
      }
    }
  } catch (error) {
    console.log("error occured ", error.message);
  }
}

export async function UserSignIn(userDetails) {
  try {
    const response = await axios.post(BASE_URL + "/user/login", userDetails);
    return response.data;
  } catch (error) {
    console.log("error ocurred ", error.message);
  }
}

export async function FetchAccount() {
  try {
    const response = await axios.post(BASE_URL + "/user/account");
    return response.data;
  } catch (error) {
    console.log("error ocurred ", error.message);
  }
}

export async function AddAddress(address) {
  try {
    const response = await axios.post(BASE_URL + "/user/addaddress", {
      address,
    });
    console.log({ response });
    if (response.data.status) {
      return response.data.addresses;
    }
  } catch (error) {
    console.log("error ocurred ", error.message);
  }
}

export async function RemoveAddress(addressId) {
  try {
    const response = await axios.post(BASE_URL + "/user/removeaddress", {
      addressId,
    });
    if (response.data.status) {
      return response.data.addresses;
    }
  } catch (error) {
    console.log("error ocurred ", error.message);
  }
}

export async function OrderServerCall(amount) {
  try {
    const response = await axios.post(BASE_URL + "/order", { amount });
    if (response.data.status) {
      return response.data.options;
    } else {
      console.log(response);
      return;
    }
  } catch (error) {
    console.log("error ocurred ", error.message);
  }
}

export async function UpdateProfile(accountDetails) {
  try {
    const response = await axios.post(
      BASE_URL + "/user/updateprofile",
      accountDetails
    );
    if (response.data.status) {
      return response.data;
    } else {
      console.log(response, "status was not true");
    }
  } catch (error) {
    return error.response.data.message;
  }
}

export async function UpdatePassword(data) {
  try {
    const response = await axios.post(BASE_URL + "/user/updatepassword", data);
    console.log({ response });
    if (response.data.status) {
      return response.data;
    } else {
      console.log(response, "status was not true");
    }
  } catch (error) {
    return error.response.data.message;
  }
}
