import {useEcom} from '../ecom-context/ecom-context'
export function Filters(){
 const {dispatch} = useEcom()
    return(
        <div>
         <strong>Sort</strong> 
         <ul>
            <li>
                <input type = "radio" name = "sort" onChange= {() =>dispatch({type : 'SORT_LOW_TO_HIGH'})}/><label>Low to High</label>
            </li>
            <li>
                <input type = "radio" name = "sort" onClick = {() => dispatch({type : 'SORT_HIGH_TO_LOW'})} /><label>High to Low</label>
               
            </li>
         </ul>
        <h1>Apply Filters</h1>
             <ul>
                 <li>
                      <input type="checkbox" onClick={(event) =>  dispatch({type: "REMOVE_OUT_OF_STOCK",  payload : event.target.checked})}/><label>Remove out of stock</label>
                 </li>

                 <li>

                    <input type="checkbox" onClick={(event) =>  dispatch({type: "SHOW_FAST_DELIVERY_ONLY",  payload : event.target.checked})}/><label>Show Fast Delivery Only</label>

                 </li>
             </ul>
             <button onClick = {() => dispatch({type : 'REMOVE_ALL_CONDITIONS'})}>Clear all Filters</button>
        </div>
    )
}