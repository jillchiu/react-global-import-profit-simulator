import { createContext } from "react"
import type { Toast } from "../model/types"

type ToastContextType = {
    toastMessage: Toast | null

    showToast: (message: string, type: 'success' | 'error') => void

}

export const ToastContext = createContext<ToastContextType | null>(null)