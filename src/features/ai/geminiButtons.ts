import { Bot, LoaderCircle, RotateCcw, TriangleAlert } from "lucide-react"
import type { GeminiButtonInfo, GeminiState } from "../model/types"

export const geminiButtons = {
    idle: {
        icon: Bot,
        text: "Generate Insight"

    },

    analyzing: {
        icon: LoaderCircle,
        text: "Analyzing..."

    },

    retrying: {
        icon: LoaderCircle,
        text: "Retrying "

    },

    success: {
        icon: RotateCcw,
        text: "Regenerate Insight"

    },

    error: {
        icon: TriangleAlert,
        text: "Retry Insight"

    }

} satisfies Record<GeminiState['status'], GeminiButtonInfo>