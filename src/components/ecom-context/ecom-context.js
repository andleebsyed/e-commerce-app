
import {useContext  , createContext , useReducer, useState} from 'react'
import {data} from '../faker'


// creating context
const EcomContext = createContext() 

// reducer function
function  ecomReducer(state  , {type , payload}){
    const {route  , wishlist , cart , wishlistStatus} = state
    
    switch (type){
       
        // first part for routing
        
        case 'home':
            return {...state , route : {...route   , value : 'home'}}
         case 'products':
            return {...state , route : {value : 'products'}}
        case 'cart':          
            return {...state , route : {...route  , value : 'cart'}}
        case 'wishlist':
            return {...state  , route : {...route , value : 'wishlist'}}
            
        // second part to handle cart and wishlist
        case 'ADD_TO_WISHLIST':
            return {...state  ,  wishlist : [...wishlist , payload] , 
                data :  data.map(product => product.id === payload.id ? {...product , wishlistStatus : true } :  {...product} ) }

        case 'ADD_TO_CART':

            return {...state  , wishlist : wishlist.filter((item) => item.id !== payload.id) ,  cart : [...cart ,  {...payload , quantity : 1}]}

        case 'REMOVE_FROM_CART':
            return {...state  , cart : cart.filter(product => product.id !== payload.id)}
        case 'MOVE_TO_WISHLIST':
            return {...state  , wishlist : [...wishlist , payload] , cart : cart.filter(product => product.id !== payload.id)}
        case 'REMOVE_FROM_WISHLIST' :
            return {...state , wishlist : wishlist.filter(product => product.id !== payload.id)}
            default:
           return  {...state}

    }
}


const route = {value : 'products'}


// making a function which will nest main App and will take values to make them global
export function EcomProvider({children}){
    let wishlist = []
    let cart = []
    let wishlistStatus = false; 
    
    const [state , dispatch] = useReducer(ecomReducer , {data , route , wishlist , cart , wishlistStatus} )

    return(
        <EcomContext.Provider value = {{state , dispatch}}>
            {children}
        </EcomContext.Provider>
    )
}

export function useEcom(){
    return useContext(EcomContext)
}