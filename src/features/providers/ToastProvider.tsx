import type React from "react"
import { useState } from "react"
import type { Toast } from "../model/types"
import { ToastContext } from "../context/ToastContext"

type Props = {
    children: React.ReactNode

}

export function ToastProvider({
    children

}:Props){
    const [toastMessage, setToastMessage] = useState<Toast | null>(null)

    const showToast = (message: string, type: 'success' | 'error') => { 
        setToastMessage({message, type})
        setTimeout(() => { setToastMessage(null) }, 2000)
    }

    return(
        <ToastContext.Provider value={{toastMessage, showToast}}>
            {children}
            
        </ToastContext.Provider>

    )

}