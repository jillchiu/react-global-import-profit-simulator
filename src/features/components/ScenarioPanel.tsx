import { useCalculator } from "../hooks/useCalculator"
import { useTheme } from "../hooks/useTheme"
import { formatRate } from "../utils/formatRate"

export default function ScenarioPanel(){

    const {theme} = useTheme()

    const {scenarioPercent, scenarioRate, setScenarioPercent, resetScenarioPercent} = useCalculator()

    return(
        <div className={`rounded-3xl p-6 max-w-4xl mx-auto ${theme.card} ${theme.border}`}>
            <div className="flex justify-between mb-6">
                <div>
                    <p className={`text-xs uppercase ${theme.subText}`}>
                        Scenario : 
        
                    </p>
    
                    <p className={`text-3xl font-bold ${theme.text}`}>
                        {scenarioPercent} %

                    </p>

                </div>
            
                <div className="text-right">
                    <p className={`text-xs uppercase ${theme.subText}`}>
                        Scenario Rate : 

                    </p>

                    <p className={`text-3xl font-bold ${theme.text}`}>
                        {formatRate(scenarioRate)}

                    </p>

                </div>

            </div>

            <div className="space-y-3">

                <div className={`flex justify-between text-sm ${theme.subText}`}>
                    <span>-25%</span>
                    <span>+25%</span>

                </div>

                <input className={`w-full ${theme.accent}`} type="range" min={-25} max={25} value={scenarioPercent} onChange={(e) => setScenarioPercent(Number(e.target.value))} />

            </div>

            <div className="flex justify-end mt-6">
                <button  className={`px-4 py-2 rounded-xl ${theme.border} ${theme.text}`} onClick={resetScenarioPercent}>
                    Reset

                </button>

            </div>

        </div>

    )

}