import { useEcom } from '../ecom-context/ecom-context'
import { Card } from '../ProductCard/card'
import '../product-page/product-page.css'
import { Filters } from '../Filters/filters'
import { Loader } from '../Loader/Loader'
export function Products() {
    const { state, loader } = useEcom()
    const { data } = state
    return (
        <div className="outer">
            <div className="inline-components">
                <Filters />
            </div>
            <Loader loader={loader} />
            <div className="products-main">
                {data.map(product =>
                    <Card product={product} />
                )}
            </div>
        </div>


    )
}