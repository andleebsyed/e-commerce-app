import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
import { useEcom } from "../ecom-context/ecom-context";

const DatabaseContext = createContext()


export function DatabaseProvider({ children }) {

    // const { dispatch } = useEcom()
    // const [cart, setCart] = useState([])
    // const [wishlist, setWishlist] = useState([])
    const [data, setData] = useState([])

    // fetch products
    // useEffect(() => {
    //     async function MyProducts() {
    //         const response = await axios.get("https://rest-api.andydev7.repl.co/products")
    //         setData(response.data.myData);
    //     }
    //     MyProducts()
    // }, []);

    // fetch cart
    // useEffect(() => {

    //     async function MyCart() {
    //         const response = await axios.get('https://rest-api.andydev7.repl.co/cart')
    //         dispatch({ type: 'INITIAL_CART', payload: response.data.myCart })
    //         // console.log("data coming from api type ", typeof (response.data.myCart))
    //         // setCart(response.data.myCart)


    //     }
    //     MyCart()
    // }, [])

    // fetch wishlist
    // useEffect(() => {
    //     async function MyWishlist() {
    //         const response = await axios.get('https://rest-api.andydev7.repl.co/wishlist')
    //         // setWishlist(response.data.myWishlist)
    //         dispatch({ type: 'INITIAL_WISHLIST', payload: response.data.MyWishlist })
    //         // console.log("i am wishlist from context", wishlist)
    //     }

    //     MyWishlist()

    // }, [])
    // console.log("cart in database ", cart)
    return (
        <DatabaseContext.Provider value={{ data }}>
            {children}
        </DatabaseContext.Provider>
    )

}

export function useDatabase() {
    return useContext(DatabaseContext)
}