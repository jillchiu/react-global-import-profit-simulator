import { createContext } from "react";
import type { GeminiInsightInput, GeminiState, ProfitInput, ProfitResult } from "../model/types";

type GeminiContextType = {
    geminiInsight: GeminiState

    cancelInsight: () => void

    lastGeneratedInput: GeminiInsightInput | null

    handleGenerateInsight: (input: ProfitInput, profitResult: ProfitResult | null, scenarioPercent: number) => Promise<void>

}

export const GeminiContext = createContext<GeminiContextType | null>(null)