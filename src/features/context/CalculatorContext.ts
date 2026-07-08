import React, { createContext } from "react";
import type { ProfitInput, ProfitResult } from "../model/types";

type CalculatorContextType = {
    input: ProfitInput
    setInput: React.Dispatch<React.SetStateAction<ProfitInput>>

    scenarioPercent: number
    setScenarioPercent: React.Dispatch<React.SetStateAction<number>>

    scenarioRate: number

    updateInput: <K extends keyof ProfitInput>(key: K, value: ProfitInput[K]) => void

    profitResult: ProfitResult | null

    chartData: { scenario: number; profit: number; margin: number }[]

    resetScenarioPercent: () => void

    resetInput: () => void

}

export const CalculatorContext = createContext<CalculatorContextType | null>(null)