import { useTheme } from "../hooks/useTheme"
import { Settings, Info, RotateCcw } from "lucide-react"
import { useSetting } from "../hooks/useSetting"
import { useConfirm } from "../hooks/useConfirm"
import { useToast } from "../hooks/useToast"
import AppearanceSection from "../components/AppearanceSection"
import CalculatorSection from "../components/CalculatorSection"
import AboutSection from "../components/AboutSection"

export default function SettingsPage(){

    const {theme} = useTheme()

    const {settings, restoreSettings, defaultSettings} = useSetting()

    const {customConfirm} = useConfirm()

    const {showToast} = useToast()

    const isDefaultSettings = JSON.stringify(settings) === JSON.stringify(defaultSettings)

    async function handleRetoreSettings(){
        if(isDefaultSettings) return

        const confirmed = await customConfirm({
            message: 'Restore defaults?',
            confirmText: 'Restore' 

        })

        if(!confirmed) return

        restoreSettings()

        showToast('✓ Settings restored.', 'success' )

    }

    return (
        <>
            <section className={`max-w-4xl mx-auto rounded-3xl px-8 py-8 space-y-6 ${theme.card} ${theme.border}`}>
                <div className={`flex items-center gap-4 mb-8`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${theme.text} ${theme.border}`}>
                        <Settings size={28} />

                    </div>

                    <div>
                        <h1 className={`text-2xl font-bold ${theme.text}`}>Settings</h1>

                        <p className={`${theme.subText} text-sm`}>Customize your experience</p>

                    </div>
                    
                </div>

                <AppearanceSection />

                <CalculatorSection />

                <AboutSection />

                <div className="flex justify-between items-center pt-2">
                    <div className={`flex items-center gap-2 text-sm ${theme.subText}`}>
                        <Info size={18} />

                        <span>Settings are saved automatically.</span>

                    </div>

                    <button onClick={handleRetoreSettings}
                            className={`disabled:opacity-50 disabled:cursor-not-allowed h-11 px-5 flex items-center gap-2 py-2 rounded-lg transition ${theme.hover} ${theme.text} ${theme.border}`}
                            disabled={isDefaultSettings}
                    >
                        <RotateCcw size={16}/> Restore Defaults

                    </button>

                </div>

            </section>

        </>

    )

}