import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";

const DatabaseContext = createContext()


export function DatabaseProvider({ children }) {

    const [cart, setCart] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [data, setData] = useState([])

    // fetch products
    useEffect(() => {
        async function MyProducts() {
            const response = await axios.get("https://rest-api.andydev7.repl.co/products")
            //    .then((res) => {
            setData(response.data.myData);
            // });
        }
        MyProducts()
    }, []);

    // fetch cart
    useEffect(() => {
        async function MyCart() {
            const response = await axios.get('https://rest-api.andydev7.repl.co/cart')
            // .then(res => 
            setCart(response.data.myCart)

            console.log("i am cart from ciontext", cart)
        }
        MyCart()
    }, [])

    // fetch wishlist
    useEffect(() => {
        async function MyWishlist() {
            const response = await axios.get('https://rest-api.andydev7.repl.co/wishlist')
            // .then(res => 
            setWishlist(response.data.myWishlist)
            console.log("i am wishlist from context", wishlist)
        }

        MyWishlist()

    }, [])
    return (
        <DatabaseContext.Provider value={{ data, wishlist, cart }}>
            {children}
        </DatabaseContext.Provider>
    )

}

export function useDatabase() {
    return useContext(DatabaseContext)
}