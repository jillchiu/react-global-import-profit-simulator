import React, { createContext } from "react";
import type { ConfirmOptions } from "../model/types";

type ConfirmContextType = {
    confirmOptions: ConfirmOptions | null

    setConfirmOptions: React.Dispatch<React.SetStateAction<ConfirmOptions | null>>

    confirmResolver: ((value: boolean) => void) | null

    customConfirm: (options: ConfirmOptions) => Promise<boolean>

}

export const ConfirmContext = createContext<ConfirmContextType | null>(null)