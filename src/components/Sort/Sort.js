import './Sort.css'
import { useEcom } from '../ecom-context/ecom-context'

export function Sort() {
    const { dispatch } = useEcom()
    return (
        <div>
            <div className="sort-filter-container">
                <div className="sort-box">
                    <small><i class="material-icons">sort</i>  Sort by : </small>
                    <select class="drop-down-box" name="cars" id="cars" onChange={(event) => dispatch({ type: 'SORT', payload: event })}>
                        <option value="" disabled selected hidden>Relevance</option>
                        <option value="low_to_high">Low to High</option>
                        <option value="high_to_low">High to Low</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
