import { useSetting } from "../hooks/useSetting"
import { useTheme } from "../hooks/useTheme"
import { Palette, Sun, Moon } from "lucide-react"

export default function AppearanceSection(){

    const {theme} = useTheme()

    const {settings, setSettings} = useSetting()

    return(
        <div className={`rounded-3xl ${theme.border} p-6 md:p-8 shadow-sm`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${theme.border} ${theme.text}`}>
                        <Palette size={24} />

                    </div>

                    <h2 className={`text-lg font-semibold mb-1 ${theme.text}`}>Appearance</h2>

                    <p className={`text-sm leading-relaxed ${theme.subText}`}>Customize how the app looks and feels.</p>

                </div>
                
                <div className="col-span-2 space-y-6">
                    <div>
                        <h3 className={`font-semibold mb-1 ${theme.text}`}>Theme</h3>

                        <p className={`text-sm mb-15 ${theme.subText}`}>Choose your preferred theme.</p>
                    
                        <div className={`flex items-center justify-center gap-20 p-7 rounded-2xl ${theme.border}`}>
                            <button onClick={() => setSettings(prev => ({...prev, themeMode: 'light'}))} 
                                    className={`flex items-center gap-3 font-medium ${theme.text}`}
                            >
                                <Sun size={20} />Light
                            
                            </button>
                            
                            <div 
                                className={`w-16 h-8 rounded-full flex items-center p-1 cursor-pointer transition-colors ${settings.themeMode === 'dark' ? 'bg-sky-400' : 'bg-sky-600'}`}
                                onClick={() => setSettings(prev => ({...prev, themeMode: (prev.themeMode === 'light' ? 'dark' : 'light')}))}
                            >
                                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${settings.themeMode === 'dark' ? 'translate-x-8' : ''}`} />
                            
                            </div>

                            <button onClick={() => setSettings(prev => ({...prev, themeMode: 'dark'}))}
                                    className={`flex items-center gap-3 font-medium ${theme.text}`}
                            >
                                Dark <Moon size={20} />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}