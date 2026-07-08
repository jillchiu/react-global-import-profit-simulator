import type { ProductStatus, ProfitInput } from "../model/types";

export default function getProductStatus(data: ProfitInput):ProductStatus{

    const fields = [data.productCost, data.domesticShipping, data.internationShipping, data.sellingPrice]

    const isComplete = fields.every(Boolean)
    
    // '' -> 0
    // Empty fields should remain Draft,
    // not Invalid.\
    const numbers = fields.map(Number)

    const hasNegative = numbers.some(value => value < 0)

    const hasNaN = numbers.some(value => Number.isNaN(value))

    if(hasNegative) return {type: 'invalid', icon: 'red', message:'Negative value'}

    if(hasNaN) return {type: 'invalid', icon: 'red', message:'Invalid number'}

    if(isComplete) return {type: 'ready', icon: 'green', message:'Ready'}

    return {type: 'draft', icon: 'yellow', message:'Draft'}

}