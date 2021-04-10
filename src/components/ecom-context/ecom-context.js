
import {useContext  , createContext , useReducer} from 'react'
import {data}  from '../faker' 
const orgData = data;


// creating context
const EcomContext = createContext() 

// reducer function
function  ecomReducer(state  , {type , payload}){
    const {route  , wishlist , cart , data} = state
    
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
            // console.log("mai aaraha hu with  ", payload)
            return {...state  , wishlist :  [...wishlist , payload] } 
        case 'ADD_TO_CART':
            return {...state  , wishlist : wishlist.filter((item) => item.id !== payload.id) ,  cart : [...cart ,  {...payload , quantity : 1}]}
        case 'REMOVE_FROM_CART':
            return {...state  , cart : cart.filter(product => product.id !== payload.id)}
        case 'MOVE_TO_WISHLIST':
            return {...state  , wishlist : [...wishlist , payload] , cart : cart.filter(product => product.id !== payload.id)}
        case 'REMOVE_FROM_WISHLIST' :
            return {...state , wishlist : wishlist.filter(product => product.id !== payload.id)}
        case 'INCREASE_QUANTITY':
            return {...state , cart : cart.map(product => product.id === payload.id ? {...product , quantity : product.quantity+1} : {...product})}
         case 'DECREASE_QUANTITY':
             if(payload.quantity  <2){
                 return {...state , cart : cart.filter((product) => product.id !== payload.id )}
             }
            return {...state , cart : cart.map(product => product.id === payload.id ? {...product , quantity : product.quantity-1} : {...product})}
        case 'SORT_LOW_TO_HIGH':
            return {...state  , data : data.sort((a,b) => a.price-b.price) } 
        case 'SORT_HIGH_TO_LOW':
            return {...state  , data : data.sort((a,b) => b.price-a.price) } 
        case 'REMOVE_OUT_OF_STOCK' :
            if(payload === true ) return {...state , data : data.filter(product => product.inStock === true)}; else return {...state , data : orgData}
        case "SHOW_FAST_DELIVERY_ONLY":
            if(payload === true ) return {...state , data : data.filter(product => product.fastDelivery === true)}; else return {...state , data : orgData}
        case 'SEARCH_FOR_ITEM':
           return {...state , data : data.filter(product =>
                    product.productName.toLowerCase().includes(payload.toLowerCase())
           )}
        case 'REMOVE_ALL_CONDITIONS':
            return {...state  , data : orgData}
        default:
           return  {...state}

    }
}


const route = {value : 'products'}


export function EcomProvider({children}){
    let wishlist = []
    let cart = []
 
    
    const [state , dispatch] = useReducer(ecomReducer , {data , route , wishlist , cart} )

    return(
        <EcomContext.Provider value = {{state , dispatch}}>
            {children}
        </EcomContext.Provider>
    )
}

export function useEcom(){
    return useContext(EcomContext)
}



// new context for applying filters 
// const FilterContext = createContext();

// export function FilterContextProvider({children}){
    
//     return(
//         <FilterContext>
//             {children}
//         </FilterContext>
//     )

// }


// export function useFilter(){
//     return useContext(FilterContext)
// }