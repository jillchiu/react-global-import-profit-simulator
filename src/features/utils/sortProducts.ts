import type { ProductSort, ProductWithProfit } from "../model/types"

export default function sortProducts(products: ProductWithProfit[], sort: ProductSort){
    switch(sort){
        case 'latest':
            products.sort( (a, b) => b.createdAt - a.createdAt )
            break
        
        case 'profit-desc':
            products.sort( (a, b) => (b.profitResult ?? -Infinity) - (a.profitResult ?? -Infinity) )
            break

        case 'profit-asc':
            products.sort( (a, b) => (a.profitResult ?? Infinity) - (b.profitResult ?? Infinity) )
            break
        
        case 'name-asc':
            products.sort( (a, b) => a.name.localeCompare(b.name) )
            break

        case 'name-desc':
            products.sort( (a, b) => b.name.localeCompare(a.name) )
            break

    }

    return products

}