import type React from "react"
import getModeTheme from "../theme/modeTheme"
import { useEffect } from "react"
import { saveThemeMode } from "../utils/localStorage"
import { ThemeContext } from "../context/ThemeContext"
import { useSetting } from "../hooks/useSetting"

type Props = {
    children: React.ReactNode

}

export function ThemeProvider({
    children

}:Props){

    const {settings} = useSetting()

    const themeMode = settings.themeMode

    const theme = getModeTheme(themeMode)

    useEffect(() => { saveThemeMode(themeMode) }, [themeMode])

    return(
        <ThemeContext.Provider value = {{ themeMode, theme }}>
            {children}
            
        </ThemeContext.Provider>

    )

}