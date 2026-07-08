import type { ProfitInput } from "../model/types";

export function hasUnsavedInput(input: ProfitInput){
    return [input.productCost, input.domesticShipping, input.internationShipping, input.sellingPrice].some(Boolean)
    
}