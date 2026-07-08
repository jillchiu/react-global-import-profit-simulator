import type React from "react"
import { useEffect, useState } from "react"
import type { ProfitInput } from "../model/types"
import { getProfitForm, saveProfitForm } from "../utils/localStorage"
import emptyProfitInput from "../utils/createEmptyProfitInput"
import { useExchange } from "../hooks/useExchange"
import calculateProfit from "../utils/calculateProfit"
import generateScenarioChart from "../utils/generateScenarioChart"
import { CalculatorContext } from "../context/CalculatorContext"
import { useSetting } from "../hooks/useSetting"

type Props = {
    children: React.ReactNode

}

export default function CalculatorProvider({
    children

}:Props){

    const {settings} = useSetting()

    const {currentRate, exchangeRateState, currencyPair} = useExchange()

    const [input, setInput] = useState<ProfitInput>(() => getProfitForm() ?? emptyProfitInput('USD', 'JPY'))

    function resetInput(){
        setInput(emptyProfitInput(currencyPair.base, currencyPair.target))
        
    }

    const [scenarioPercent, setScenarioPercent] = useState<number>(settings.defaultScenario)

    const scenarioRate = currentRate * (1 + scenarioPercent /100)

    function updateInput<K extends keyof ProfitInput>(key: K, value: ProfitInput[K]){ setInput(prev => ({...prev, [key]: value})) }

    const profitResult = exchangeRateState.data ? calculateProfit(input, exchangeRateState.data.rates, currencyPair, scenarioRate) : null
    
    const chartData = exchangeRateState.data ? generateScenarioChart(input, exchangeRateState.data.rates, currencyPair, currentRate) : []
    
    useEffect(() => {
    
        setInput(prev => ({
          ...prev, 
    
          productCurrency: currencyPair.base,
          domesticShippingCurrency: currencyPair.base,
          internationShippingCurrency: currencyPair.base,
          sellingCurrency: currencyPair.target
    
        }))
    
    }, [currencyPair])

    useEffect(() => { setScenarioPercent(settings.defaultScenario) }, [settings.defaultScenario])

    function resetScenarioPercent(){ setScenarioPercent(settings.defaultScenario) }

    useEffect(() => { resetScenarioPercent() }, [currencyPair.base, currencyPair.target] )

    useEffect(() => { saveProfitForm(input) }, [input] )

    return (
        <CalculatorContext.Provider value = {{input, setInput, resetInput, scenarioPercent, setScenarioPercent, resetScenarioPercent, scenarioRate, updateInput, profitResult, chartData}}>
            {children}
        
        </CalculatorContext.Provider>

    )

}