import { useGemini } from "../hooks/useGemini"
import { useTheme } from "../hooks/useTheme"
import { Bot, FileText, TriangleAlert, Lightbulb } from "lucide-react"

export default function InsightPanel(){

    const {theme} = useTheme()

    const {geminiInsight} = useGemini()

    if(!geminiInsight.data) return null

    return(
        <div className={`fixed bottom-24 right-6 w-[28rem] max-h-[70vh] overflow-auto rounded-2xl shadow-2xl p-6 space-y-6 ${theme.text} ${theme.border} ${theme.card}`}>
            <h3 className="text-xl font-bold flex items-center gap-1.5">
              <Bot size={20} /> AI Insight

            </h3>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-1.5">
                <FileText size={18} /> Summary

              </h4>
              
              <p className={`${theme.subText} leading-relaxed text-sm`}>
                {geminiInsight.data.summary}

              </p>

            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-1.5">
                <TriangleAlert size={18} /> Reasons
              
              </h4>

              <ul className="list-disc pl-5 space-y-2">
                {geminiInsight.data.reasons.map(reason => (
                    <li className={`${theme.subText} leading-relaxed text-sm`} key={reason}>
                      {reason}

                    </li>

                  )

                )}

              </ul>

            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-1.5">
                <Lightbulb size={18} /> Recommendations

              </h4>
                
              <ul className="list-disc pl-5 space-y-2">
                {geminiInsight.data.recommendations.map(recommendation => (
                    <li className={`${theme.subText} leading-relaxed text-sm`} key={recommendation}>
                      {recommendation}

                    </li>

                  )

                )}

              </ul>
              
            </div>
          
        </div>

    )

}