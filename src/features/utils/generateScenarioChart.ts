import type { Currency, CurrencyPair, ProfitInput } from "../model/types"
import calculateProfit from "./calculateProfit"

export default function generateScenarioChart(input: ProfitInput, rates: Record<Currency, number>, currencyPair: CurrencyPair, currentRate: number){
    const chartData = []
    
    for (let percent = -25; percent <= 25; percent +=5){
        const rate = currentRate * (1 + percent / 100)

        const result = calculateProfit(input, rates, currencyPair, rate)


        chartData.push({ scenario: percent, profit: result.profit, margin: result.margin })

    }

    return chartData

}