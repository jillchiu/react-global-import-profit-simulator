import React, { createContext } from "react";
import type { Settings } from "../model/types";

type SettingContexttype = {
    settings: Settings

    setSettings: React.Dispatch<React.SetStateAction<Settings>>

    restoreSettings: () => void

    defaultSettings: Settings

}

export const SettingContext = createContext<SettingContexttype | null>(null)