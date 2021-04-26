
import { useContext, createContext, useReducer, useState, useEffect } from 'react'
import axios from 'axios'
// import { data as data } from '../faker'
import { useDatabase } from '../DatabaseCalls/DatabaseCalls';
// const orgData = data;

// creating context
const EcomContext = createContext()

// function AddToCart(payload) {
//     useEffect(() => {
//         async function setToCart() {
//             await axios.post('https://rest-api.andydev7.repl.co/cart', payload)
//                 .catch(error => console.log(error.message))
//         }
//         setToCart()

//     }, [])
// }
// reducer function
async function ecomReducer(state, { type, payload }) {
    const { wishlist, cart } = state
    console.log("cart after ist render ", cart)
    // const orgData = data;
    switch (type) {
        case 'INITIAL_CART':
            // console.log("cart and wishlist from state ", cart, wishlist)
            // console.log("initial cart as a payload from db is ", payload)

            // const temp = { ...state, cart: [...cart, ...payload] }
            // console.log("temp is ", temp.cart)
            return "hello"
        // case 'ADD_TO_WISHLIST':
        //     try {
        //         const response = await axios.post('https://rest-api.andydev7.repl.co/wishlist', payload)
        //         if (response.status === 200) { return { ...state, wishlist: [...wishlist, payload] } }
        //     }
        //     catch (error) {
        //         console.log(error.message)
        //         // console.log(error.response.data);
        //         // console.log(error.response.status);
        //         // console.log(error.response.headers);
        //     }
        case 'ADD_TO_CART':
            try {
                console.log("cart before adding new item ", cart)
                const response = await axios.post('https://rest-api.andydev7.repl.co/cart', payload)

                if (response.status === 200) {
                    console.log("new item being added is ", payload)
                    return { ...state, cart: [...cart, ...payload] }

                    // return { ...state, wishlist: wishlist.filter((item) => item._id !== payload._id), cart: [...cart, { ...payload, quantity: 1 }] }
                }

            }
            catch (error) {
                console.log("err message is ", error.message)
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            }
        // .catch(error => console.log(error.message))
        // AddToCart(payload)
        // return { ...state, wishlist: wishlist.filter((item) => item.id !== payload.id), cart: [...cart, { ...payload, quantity: 1 }] }
        // case 'REMOVE_FROM_CART':
        //     return { ...state, cart: cart.filter(product => product.id !== payload.id) }
        // case 'MOVE_TO_WISHLIST':
        //     return { ...state, wishlist: [...wishlist, payload], cart: cart.filter(product => product.id !== payload.id) }
        // case 'REMOVE_FROM_WISHLIST':
        //     return { ...state, wishlist: wishlist.filter(product => product.id !== payload.id) }
        // case 'INCREASE_QUANTITY':
        //     return { ...state, cart: cart.map(product => product.id === payload.id ? { ...product, quantity: product.quantity + 1 } : { ...product }) }
        // case 'DECREASE_QUANTITY':
        //     if (payload.quantity < 2) {
        //         return { ...state, cart: cart.filter((product) => product.id !== payload.id) }
        //     }
        //     return { ...state, cart: cart.map(product => product.id === payload.id ? { ...product, quantity: product.quantity - 1 } : { ...product }) }
        // case 'SORT':
        //     if (payload.target.value === 'low_to_high') { return { ...state, data: data.sort((a, b) => a.price - b.price) } } else { return { ...state, data: data.sort((a, b) => b.price - a.price) } }
        // case 'REMOVE_OUT_OF_STOCK':
        //     if (payload === true) return { ...state, data: data.filter(product => product.inStock === true) }; else return { ...state, data: orgData }
        // case "SHOW_FAST_DELIVERY_ONLY":
        //     if (payload === true) return { ...state, data: data.filter(product => product.fastDelivery === true) }; else return { ...state, data: orgData }
        // case 'SEARCH_FOR_ITEM':
        //     return {
        //         ...state, data: data.filter(product =>
        //             product.productName.toLowerCase().includes(payload.toLowerCase())
        //         )
        //     }
        // case 'REMOVE_ALL_CONDITIONS':
        //     return { ...state, data: orgData }
        default:
            return { ...state }

    }
}

export function EcomProvider({ children }) {
    // const { wishlist, cart, data, setCart } = useDatabase()
    // console.log("ecom-context.js cart ", cart)
    // console.log("yahaa tk aarahaiu hai kyaaa ", { data })
    // let wishlist = []
    // let cart = []
    // const initialState = { wishlist, cart }
    const [state, dispatch] = useReducer(ecomReducer, { cart: [], wishlist: [] })
    const [stateDummy, dispatchDummy] = useReducer((stateDummy, action) => {
        switch (action.type) {
            case 'INC':
                return "it works"
        }
    }, "abc")
    console.log(stateDummy)

    useEffect(() => {
        dispatchDummy({ type: 'INC' })
    }, [])
    return (
        <EcomContext.Provider value={{ state, dispatch }}>
            {children}
        </EcomContext.Provider>
    )
}


export function useEcom() {
    return useContext(EcomContext)
}