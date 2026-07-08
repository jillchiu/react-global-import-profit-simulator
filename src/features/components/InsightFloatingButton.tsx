import { geminiButtons } from "../ai/geminiButtons"
import sameProfitResult from "../ai/sameProfitResult"
import { useCalculator } from "../hooks/useCalculator"
import { useGemini } from "../hooks/useGemini"
import { useTheme } from "../hooks/useTheme"
import { TriangleAlert } from "lucide-react"

export default function InsightFloatingButton(){

    const {theme} = useTheme()

    const {input, profitResult, scenarioPercent} = useCalculator()

    const {geminiInsight, lastGeneratedInput, cancelInsight, handleGenerateInsight} = useGemini()
    
    const isInsightOutdated = 
        geminiInsight.data !== null && 
        lastGeneratedInput !== null && 
        profitResult !== null &&
        (lastGeneratedInput.scenarioPercent !== scenarioPercent || 
            !sameProfitResult(lastGeneratedInput.profitResult, profitResult)
        )

    const button = geminiButtons[geminiInsight.status]

    const text = geminiInsight.status === 'retrying' ? `${button.text} ${geminiInsight.retryCount}/3` : button.text

    const Icon = button.icon

    return (
        <div className="fixed bottom-2 right-6 flex flex-col gap-2 z-50">
            {isInsightOutdated &&
                <div className="text-xs rounded-xl px-3 py-2 border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-lg flex gap-1.5">
                    <TriangleAlert size={15} className="shrink-0 mt-0.5" /> Analysis may be outdated

                </div>
            
            }

            <button className = {`px-5 py-3 rounded-2xl shadow-xl ${theme.text} flex items-center gap-1.5`} 
                    onClick = {() => handleGenerateInsight(input, profitResult, scenarioPercent)}
                    disabled = {geminiInsight.isFetching}
            >
                <Icon size={18} className={geminiInsight.status === 'analyzing' || geminiInsight.status === 'retrying' ? 'animate-spin' : '' } /> {text}

            </button>

            {geminiInsight.isFetching &&
                <button className = {`text-xs opacity-70 hover:opacity-100 ${theme.text}`} 
                        onClick={cancelInsight}
                >
                    Cancel

                </button>

            }

        </div>

    )

}