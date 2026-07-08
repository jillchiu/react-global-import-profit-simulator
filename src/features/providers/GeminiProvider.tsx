import type React from "react"
import { useGeminiInsight } from "../hooks/useGeminiInsight"
import { useState } from "react"
import type { GeminiInsightInput, ProfitInput, ProfitResult } from "../model/types"
import { GeminiContext } from "../context/GeminiContext"

type Props = {
    children: React.ReactNode

}

export default function GeminiProvider({
    children

}:Props){

    const {geminiInsight, submitGeminiInsight, cancelInsight} = useGeminiInsight()
    
    const [lastGeneratedInput, setLastGeneratedInput] = useState<GeminiInsightInput | null>(null)
    
    async function handleGenerateInsight(input: ProfitInput, profitResult: ProfitResult | null, scenarioPercent: number){

        if(!profitResult) return

        const result = await submitGeminiInsight(input, profitResult, scenarioPercent)

        if(result?.ok) setLastGeneratedInput({ profitResult, scenarioPercent })

    }

    return(
        <GeminiContext.Provider value = {{geminiInsight, cancelInsight, lastGeneratedInput, handleGenerateInsight}}>
            {children}

        </GeminiContext.Provider>

    )

}