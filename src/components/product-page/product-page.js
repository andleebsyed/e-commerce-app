import { useEcom } from '../ecom-context/ecom-context'
import { Card } from '../ProductCard/card'
import '../product-page/product-page.css'
import { Sort } from '../Sort/Sort'
import { Filters } from '../Filters/filters'
export function Products() {
    const { state } = useEcom()
    const { data } = state
    return (
        <div>
            <div className="inline-components">
                <Sort />
                <Filters />
            </div>

            <div className="products-main">
                {data.map(product =>
                    <Card product={product} />
                )}
            </div>
        </div>


    )
}