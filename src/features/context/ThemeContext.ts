import { createContext } from "react"
import type { Theme, ThemeMode } from "../model/types"

type ThemeContextType = {
    theme: Theme

    themeMode: ThemeMode

}

export const ThemeContext = createContext<ThemeContextType | null>(null)