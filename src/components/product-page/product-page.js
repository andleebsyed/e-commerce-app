import { useState } from 'react'
import { useEcom } from '../ecom-context/ecom-context'
import { Card } from '../ProductCard/card'
import '../product-page/product-page.css'
import { Filters } from '../Filters/filters'
import '../Filters/filters.css'
export function Products() {
    const { state } = useEcom()
    const { data } = state
    return (
        <div className="products-outer">
            <div className="sidebar"><Filters /></div>
            <div className="products-main">
                {data.map(product =>
                    <Card product={product} />
                )}
            </div>
        </div>

    )
}