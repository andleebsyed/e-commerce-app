import { useState, useEffect } from 'react'
import { useEcom } from '../ecom-context/ecom-context'
import { Card } from '../ProductCard/card'
import '../product-page/product-page.css'
import { Sort } from '../Sort/Sort'
import { Filters } from '../Filters/filters'
import axios from 'axios'
import { useDatabase } from '../DatabaseCalls/DatabaseCalls'
import { Loader } from '../Loader/Loader'
export function Products() {
    const { state, loader, setLoader } = useEcom()
    const { data } = state
    console.log("data ", data)


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