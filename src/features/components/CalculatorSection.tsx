import { useSetting } from "../hooks/useSetting"
import { useTheme } from "../hooks/useTheme"
import { Calculator, Minus, Plus, InfoIcon } from "lucide-react"

export default function CalculatorSection(){

    const {theme} = useTheme()

    const {settings, setSettings} = useSetting()

    const canDecrease = settings.defaultScenario > -25

    const canIncrease = settings.defaultScenario < 25

    return(
        <div className={`rounded-3xl ${theme.border} p-6 md:p-8 shadow-sm`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <div className={`w-12 h-12 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 ${theme.text} ${theme.border}`}>
                        <Calculator size={24} />

                    </div>

                    <h2 className={`text-lg font-semibold mb-1 ${theme.text}`}>Calculator</h2>

                    <p className={`text-sm leading-relaxed ${theme.subText}`}>Configure default values for calculations.</p>

                </div>
                    
                <div className="col-span-2 space-y-6">
                    <h3 className={`font-semibold mb-1 ${theme.text}`}>Default Scenario (%)</h3>

                    <p className={`text-sm mb-10 ${theme.subText}`}>Set the initial scenario percentage when opening the Simulator or creating a new Product.</p>
                    
                    <div className={`flex items-center justify-center gap-20 p-7 rounded-2xl ${theme.border}`}>
                        <button onClick={() => setSettings(prev => ({...prev, defaultScenario: (prev.defaultScenario-5)}))}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl ${theme.border} ${theme.text} ${theme.hover} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100`}
                                disabled={!canDecrease}
                        >
                            <Minus size={18} />

                        </button>

                        <div className="relative w-28">
                            <input  type="number"
                                    value={settings.defaultScenario}
                                    onChange={(e)=> { 
                                        const value = Math.max(-25, Math.min(25, Number(e.target.value)))

                                        setSettings(prev => ({...prev, defaultScenario: value}))}}
                                    className={`w-full h-10 rounded-xl text-center pr-8 ${theme.border} ${theme.text} ${theme.background}`}
                            />

                            <span className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${theme.subText}`}>%</span>
                        
                        </div>

                        <button onClick={() => setSettings(prev => ({...prev, defaultScenario: (prev.defaultScenario+5)}))}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl ${theme.border} ${theme.text} ${theme.hover} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100`}
                                disabled={!canIncrease}
                        >
                            <Plus size={18} />

                        </button>

                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-5">
                        <InfoIcon size={16} className={`${theme.text}`} />

                        <span className={`${theme.subText}`}>Used as the initial value for new calculations.</span>

                    </div>

                </div>

            </div>

        </div>

    )

}