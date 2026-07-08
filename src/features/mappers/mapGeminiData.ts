import type { GeminiData, GeminiResponse } from "../model/types";

export default function mapGeminiData(data: GeminiResponse): GeminiData{

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ""

    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").replace(/\*\*/g, "").trim()

    const insight = JSON.parse(cleaned)

    return{
        summary: insight.summary,
        reasons: insight.reasons,
        recommendations: insight.recommendations

    }

}