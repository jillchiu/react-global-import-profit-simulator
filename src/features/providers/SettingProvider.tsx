import type React from "react"
import { SettingContext } from "../context/SettingContext"
import { useEffect, useState } from "react"
import type { Settings } from "../model/types"
import { getSettings, saveSettings } from "../utils/localStorage"

type Props = {
    children: React.ReactNode

}

export default function SettingProvider({
    children

}:Props){

    const defaultSettings:Settings = {themeMode: 'dark', defaultScenario: 0}

    const [settings, setSettings] = useState<Settings>(getSettings())

    useEffect(() => { saveSettings(settings) }, [settings])

    function restoreSettings() { setSettings(defaultSettings) }

    return(
        <SettingContext.Provider value={{settings, setSettings, restoreSettings, defaultSettings}}>
            {children}

        </SettingContext.Provider>

    )

}