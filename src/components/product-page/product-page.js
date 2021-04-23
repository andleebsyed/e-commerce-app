import { useState, useEffect } from 'react'
import { useEcom } from '../ecom-context/ecom-context'
import { Card } from '../ProductCard/card'
import '../product-page/product-page.css'
import { Sort } from '../Sort/Sort'
import { Filters } from '../Filters/filters'
import axios from 'axios'
import { useDatabase } from '../DatabaseCalls/DatabaseCalls'
export function Products() {
    // const { state } = useEcom()
    const { data } = useDatabase()


    return (
        <div>
            <div className="inline-components">
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