import axios from "axios";
import { BASE_URL } from "./api";

export async function UserSignUp(userDetails) {
  //   const signUpDataFromView = {
  //     userDetails: userDetails,
  //   };
  let isSignUpSuccessfull;
  try {
    const response = await axios.post(BASE_URL + "/user/signup", userDetails);
    console.log("response ", { response });
    if (response.status === 200) {
      if (response.data.status === true) {
        return (isSignUpSuccessfull = {
          status: true,
          token: response.data.token,
          userId: response.data._id,
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
