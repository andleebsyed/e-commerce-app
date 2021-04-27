
import { useContext, createContext, useReducer, useState, useEffect } from 'react'
import axios from 'axios'
import { useDatabase } from '../DatabaseCalls/DatabaseCalls';
// const orgData = data;

// creating context
const EcomContext = createContext()


// reducer function
function ecomReducer(state, { type, payload }) {
    const { wishlist, cart } = state
    console.log("cart after ist render ", cart)
    // const orgData = data;
    console.log("state initially in switch ", state)
    switch (type) {

        case 'INITIAL_CART':
            return { ...state, cart: [...payload] }
        case 'INITIAL_WISHLIST':
            return { ...state, wishlist: [...payload] }

        case 'ADD_TO_WISHLIST':
            return { ...state, wishlist: [...wishlist, payload] }
        case 'ADD_TO_CART':

            return { ...state, cart: [...cart, payload] }
        // console.log("new item being added is ", payload)
        // const temp = { ...state, cart: [...cart, payload] }
        //  console.log("state after update is   ", temp)
        // try {
        //     console.log("cart before adding new item ", cart)
        //     const response = await axios.post('https://rest-api.andydev7.repl.co/cart', payload)

        //     if (response.status === 200) {
        //         console.log("new item being added is ", payload)
        //         const temp = { ...state, cart: [...cart, payload] }
        //         console.log("state after update is   ", temp)

        //         // return { ...state, wishlist: wishlist.filter((item) => item._id !== payload._id), cart: [...cart, { ...payload, quantity: 1 }] }
        //     }

        // }
        // catch (error) {
        //     console.log("err message is ", error.message)
        // }
        // return { ...state, wishlist: wishlist.filter((item) => item.id !== payload.id), cart: [...cart, { ...payload, quantity: 1 }] }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: cart.filter(product => product._id !== payload._id) }
        case 'MOVE_TO_WISHLIST':
            return { ...state, wishlist: [...wishlist, payload], cart: cart.filter(product => product._id !== payload._id) }
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
            return state

    }
}

export function EcomProvider({ children }) {

    const [state, dispatch] = useReducer(ecomReducer, { cart: [], wishlist: [] })
    console.log("state status ", state)


    useEffect(() => {

        async function MyCart() {
            const response = await axios.get('https://rest-api.andydev7.repl.co/cart')
            dispatch({ type: 'INITIAL_CART', payload: response.data.myCart })
        }
        MyCart()
    }, [])

    useEffect(() => {
        async function MyWishlist() {
            console.log("when is wishlist being fired")
            const response = await axios.get('https://rest-api.andydev7.repl.co/wishlist')
            console.log("wishlist coming from db ", response.data.myWishlist, " and its type is ", typeof (response.data.myWishlist))
            dispatch({ type: 'INITIAL_WISHLIST', payload: response.data.myWishlist })
        }

        MyWishlist()

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