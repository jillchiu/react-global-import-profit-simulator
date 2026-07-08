import type { ProfitInput, ProfitResult } from "../model/types";

export default function calculateProfitByRate(input: ProfitInput, exchangeRate: number): ProfitResult{

    const productCostToCurrency = (Number(input.productCost) * exchangeRate)
        
    const domesticShippingToCurrency = (Number(input.domesticShipping) * exchangeRate)

    const internationShippingToCurrency = (Number(input.internationShipping) * exchangeRate)

    const sellingPriceToCurrency = (Number(input.sellingPrice) * exchangeRate)

    const totalCost = productCostToCurrency + domesticShippingToCurrency + internationShippingToCurrency

    const revenue = sellingPriceToCurrency

    const profit = revenue - totalCost

    const margin = revenue > 0 ? ( (profit / revenue) * 100 ) : 0

    const markup = totalCost > 0 ? ( (profit / totalCost) * 100 ) : 0

    return {totalCost, revenue, profit, margin, markup}

}