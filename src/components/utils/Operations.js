import axios from 'axios'
import { useEcom } from '../ecom-context/ecom-context'
// import { useEcom } from '../ecom-context/ecom-context'

export async function AddToCart(product, dispatch, loader, setLoader) {
    // const { loader, setLoader } = useEcom()
    try {
        setLoader(true)
        const id = product._id
        const responseWishlist = await axios.delete(`https://rest-api.andydev7.repl.co/wishlist/${id}`)
        const responseCart = await axios.post('https://rest-api.andydev7.repl.co/cart', product)

        if (responseCart.status === 200) {
            setLoader(false)
            dispatch({ type: 'ADD_TO_CART', payload: product })

        }
    }


    catch (error) {
        console.log("err message is ", error.message)
    }
}

export async function AddToWishlist(product, dispatch, loader, setLoader) {
    try {
        setLoader(true)
        const id = product._id
        const responseCart = await axios.delete(`https://rest-api.andydev7.repl.co/cart/${id}`)
        const response = await axios.post('https://rest-api.andydev7.repl.co/wishlist', product)

        if (response.status === 200) {
            setLoader(false)
            dispatch({ type: 'ADD_TO_WISHLIST', payload: product })
        }
    }


    catch (error) {
        console.log("err message is ", error.message)
    }
}

export async function RemoveFromCart(product, dispatch, loader, setLoader) {
    try {
        setLoader(true)
        const id = product._id
        const response = await axios.delete(`https://rest-api.andydev7.repl.co/cart/${id}`)
        if (response.status === 200) {
            setLoader(false)
            dispatch({ type: 'REMOVE_FROM_CART', payload: product })
        }

    }
    catch (error) {
        setLoader(false)
        console.log("coudn't delete item from collection cart ", error.message)
    }

}

export async function MoveToWishlist(product, dispatch, loader, setLoader) {
    try {
        setLoader(true)
        const id = product._id;
        const responseAdd = await axios.post('https://rest-api.andydev7.repl.co/wishlist', product)
        const responseRemove = await axios.delete(`https://rest-api.andydev7.repl.co/cart/${id}`)

        if (responseAdd.status === 200 && responseRemove.status === 200) {
            setLoader(false)
            dispatch({ type: 'MOVE_TO_WISHLIST', payload: product })
        }
    }
    catch (error) {
        console.log("error occured while moving ", error.message)
    }

}


export async function RemoveFromWishlist(product, dispatch, loader, setLoader) {
    try {
        setLoader(true)
        const id = product._id
        const response = await axios.delete(`https://rest-api.andydev7.repl.co/wishlist/${id}`)
        if (response.status === 200) {

            setLoader(false)
            dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product })
        }
    }
    catch (error) {
        console.log("error occured : ", error.message)
    }
}

export async function ChangeQuantity(product, dispatch, paramCase, loader, setLoader) {

    console.log("wooah we got param halfway ", paramCase)
    if (paramCase === 'dec') {
        console.log("we won")
    }
    try {
        if (paramCase === 'inc') {
            setLoader(true)
            const response = await axios.put(`https://rest-api.andydev7.repl.co/cart/?case=inc`, product)
            if (response.status === 200) {
                setLoader(false)
                dispatch({ type: 'INCREASE_QUANTITY', payload: product })
            }
        }
        else {
            if (product.quantity === 1) {
                setLoader(true)
                const resposneOnEmptyCase = await axios.delete(`https://rest-api.andydev7.repl.co/cart/${product._id}`)
                setLoader(false)
                dispatch({ type: 'DECREASE_QUANTITY', payload: product })
            }
            setLoader(true)
            const response = await axios.put(`https://rest-api.andydev7.repl.co/cart/?case=dec`, product)
            if (response.status === 200) {
                setLoader(false)
                dispatch({ type: 'DECREASE_QUANTITY', payload: product })
            }
        }

    }
    catch (error) {
        console.log("error occured : ", error.message)
    }
}