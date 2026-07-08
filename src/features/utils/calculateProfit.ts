import type { ProfitInput, Currency, ProfitResult, CurrencyPair } from "../model/types"
import { convertToTarget } from "./convertCurrency"

export default function calculateProfit(input: ProfitInput, rates: Record<Currency, number>, currencyPair: CurrencyPair, scenarioRate: number): ProfitResult{

    const productCostToCurrency = convertToTarget(Number(input.productCost), input.productCurrency, currencyPair, rates, scenarioRate)
    
    const domesticShippingToCurrency = convertToTarget(Number(input.domesticShipping), input.domesticShippingCurrency, currencyPair, rates, scenarioRate)

    const internationShippingToCurrency = convertToTarget(Number(input.internationShipping), input.internationShippingCurrency, currencyPair, rates, scenarioRate)

    const sellingPriceToCurrency = convertToTarget(Number(input.sellingPrice), input.sellingCurrency, currencyPair, rates, scenarioRate)

    const totalCost = productCostToCurrency + domesticShippingToCurrency + internationShippingToCurrency

    const revenue = sellingPriceToCurrency

    const profit = revenue - totalCost

    const margin = revenue > 0 ? ( (profit / revenue) * 100 ) : 0

    const markup = totalCost > 0 ? ( (profit / totalCost) * 100 ) : 0

    return {totalCost, revenue, profit, margin, markup}

}
