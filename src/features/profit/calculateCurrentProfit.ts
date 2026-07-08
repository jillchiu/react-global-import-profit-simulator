import type { Currency, CurrencyPair, ProfitInput } from "../model/types";
import calculateProfitByRate from "./calculateProfitByRate";

export default function calculateCurrentProfit(input: ProfitInput, rates: Record<Currency, number>, currencyPair: CurrencyPair){
    const currentRate = rates[currencyPair.target] / rates[currencyPair.base]

    return calculateProfitByRate(input, currentRate)

}