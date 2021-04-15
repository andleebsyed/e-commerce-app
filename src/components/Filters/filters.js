import { useEcom } from '../ecom-context/ecom-context'
import './filters.css'
export function Filters() {
    const { dispatch } = useEcom()
    return (
        <div className="side-div">
            <strong className="heading-of-filters">Sort</strong>
            <ul className="sort-radio-buttons">
                <li>
                    <input type="radio" name="sort" onChange={() => dispatch({ type: 'SORT_LOW_TO_HIGH' })} /><label>Low to High</label>
                </li>
                <li>
                    <input type="radio" name="sort" onClick={() => dispatch({ type: 'SORT_HIGH_TO_LOW' })} /><label>High to Low</label>

                </li>
            </ul>
            <strong className="heading-of-filters">Apply Filters</strong>
            <ul className="sort-radio-buttons">
                <li>
                    <input type="checkbox" onClick={(event) => dispatch({ type: "REMOVE_OUT_OF_STOCK", payload: event.target.checked })} /><label>Remove out of stock</label>
                </li>

                <li>

                    <input type="checkbox" onClick={(event) => dispatch({ type: "SHOW_FAST_DELIVERY_ONLY", payload: event.target.checked })} /><label>Show Fast Delivery Only</label>

                </li>
            </ul>
            <button className="reset-button" onClick={() => dispatch({ type: 'REMOVE_ALL_CONDITIONS' })}>Clear all Filters</button>
        </div>
    )
}