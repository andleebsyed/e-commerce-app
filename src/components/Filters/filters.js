import { useEcom } from '../ecom-context/ecom-context'
import './filters.css'
import { useState } from 'react'
export function Filters() {
    const { dispatch } = useEcom()
    const [isVisible, setVisible] = useState('none')
    return (
        <div>
            <div className="main-of-filters">
                <button className="filter-button" onClick={() => isVisible === 'inline' ? setVisible('none') : setVisible('inline')}>  <i class="material-icons">add</i>Filters</button>

                {/* 
            <button className="reset-button" onClick={() => dispatch({ type: 'REMOVE_ALL_CONDITIONS' })}>Clear all Filters</button> */}
            </div>
            <div className="filter-container" style={{ display: isVisible }}>
                <ul className="sort-radio-buttons">
                    <li>
                        <input type="checkbox" onClick={(event) => dispatch({ type: "REMOVE_OUT_OF_STOCK", payload: event.target.checked })} /><label>Remove out of stock</label>
                    </li>

                    <li>

                        <input type="checkbox" onClick={(event) => dispatch({ type: "SHOW_FAST_DELIVERY_ONLY", payload: event.target.checked })} /><label>Show Fast Delivery Only</label>

                    </li>
                </ul>
            </div>
        </div>
    )
}