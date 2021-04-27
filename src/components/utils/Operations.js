import axios from 'axios'
import { useEcom } from '../ecom-context/ecom-context'

export async function AddToCart(product, dispatch) {
    try {
        const response = await axios.post('https://rest-api.andydev7.repl.co/cart', product)

        if (response.status === 200) {
            dispatch({ type: 'ADD_TO_CART', payload: product })
        }
    }


    catch (error) {
        console.log("err message is ", error.message)
    }
}

export async function AddToWishlist(product, dispatch) {
    try {
        const response = await axios.post('https://rest-api.andydev7.repl.co/wishlist', product)

        if (response.status === 200) {
            dispatch({ type: 'ADD_TO_WISHLIST', payload: product })
        }
    }


    catch (error) {
        console.log("err message is ", error.message)
    }
}

export async function RemoveFromCart(product, dispatch) {
    try {

        const id = product._id
        const response = await axios.delete(`https://rest-api.andydev7.repl.co/cart/${id}`)
        if (response.status === 200) {
            dispatch({ type: 'REMOVE_FROM_CART', payload: product })
        }

    }
    catch (error) {
        console.log("coudn't delete item from collection cart ", error.message)
    }

}

export async function MoveToWishlist(product, dispatch) {
    try {
        const id = product._id;
        const responseAdd = await axios.post('https://rest-api.andydev7.repl.co/wishlist', product)
        const responseRemove = await axios.delete(`https://rest-api.andydev7.repl.co/cart/${id}`)

        if (responseAdd.status === 200 && responseRemove.status === 200) {
            dispatch({ type: 'MOVE_TO_WISHLIST', payload: product })
        }
    }
    catch (error) {
        console.log("error occured while moving ", error.message)
    }

}