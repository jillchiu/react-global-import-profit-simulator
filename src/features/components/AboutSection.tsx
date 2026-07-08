import { useTheme } from "../hooks/useTheme"
import { Info, Globe, Link2, Check } from "lucide-react"
import { techStack } from "../config/techStack"
import { highlights } from "../config/highlights"

export default function AboutSection(){

    const {theme} = useTheme()

    return(
        <div className={`rounded-3xl p-6 md:p-8 shadow-sm ${theme.border}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${theme.text} ${theme.border}`}>
                        <Info size={24} />

                    </div>

                    <h2 className={`text-lg font-semibold mb-1 ${theme.text}`}>About</h2>

                    <p className={`text-sm leading-relaxed ${theme.subText}`}>Information about this application.</p>

                </div>
                    
                <div className="col-span-2 ">
                    <div className="col-span-2 flex items-center gap-2.5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.text} ${theme.border}`}>
                            <Globe size={24} />

                        </div>

                        <div>
                            <h3 className={`font-semibold ${theme.text}`}>Global Import Profit Simulator</h3>

                            <p className={`text-sm ${theme.subText}`}>v1.0.0</p>

                            <p className={`text-sm ${theme.subText}`}>Last Updated · 2026.07</p>

                            <p className={`mt-3 text-sm ${theme.subText}`}>Estimate import profit with real-time exchange rates and AI insights.</p>

                        </div>

                    </div>

                    <div className="pt-4 mb-6">
                        <h4 className={`text-sm font-semibold mb-3 ${theme.text}`}>Built with</h4>

                        <div className={`grid grid-cols-3 gap-4 p-7 rounded-2xl ${theme.border}`}>
                            {techStack.map(({ icon: Icon, label }) => (
                                <span   key={label}
                                        className={`flex items-center justify-center whitespace-nowrap gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${theme.subText} ${theme.border}`}
                                >
                                    <Icon size={18} /> {label}

                                </span>

                            ))}

                        </div>

                        <h4 className={`text-sm font-semibold mt-3 mb-3 ${theme.text}`}>Highlights</h4>

                        <div className={`grid grid-cols-2 gap-4 p-7 rounded-2xl ${theme.border}`}>
                            {highlights.map(label => (
                                <span   key={label}
                                        className={`flex items-center justify-center whitespace-nowrap gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${theme.subText} ${theme.border}`}
                                >
                                    <Check size={18} /> {label}

                                </span>

                            ))}

                        </div>

                    </div>

                    <div>
                        <h4 className={theme.text}>Repository</h4>

                        <div className={`flex items-center gap-2.5 ${theme.subText}`}>
                            <Link2 size={18} /><button className={`${theme.subText} ${theme.hover}`}>Open Github Repository</button>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}