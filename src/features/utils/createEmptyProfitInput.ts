import type { Currency, ProfitInput } from "../model/types";

export default function emptyProfitInput(
    base: Currency, target:Currency

):ProfitInput{
    return{
        productCost: '',
        domesticShipping: '',
        internationShipping: '',
        sellingPrice: '',

        productCurrency: base,
        domesticShippingCurrency: base,
        internationShippingCurrency: base,
        sellingCurrency: target,

    }
    
}