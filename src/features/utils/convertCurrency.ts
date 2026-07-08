import type { Currency, CurrencyPair } from "../model/types"

export function convertToTarget(amount: number, fromCurrency: Currency, currencyPair: CurrencyPair, rates: Record<Currency, number>, scenarioRate: number){

    if(fromCurrency === currencyPair.base){
        return amount * scenarioRate
    }

    return (amount * (rates[currencyPair.target] / rates[fromCurrency]))

}