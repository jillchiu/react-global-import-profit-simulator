import type React from "react"
import { useState } from "react"
import type { ConfirmOptions } from "../model/types"
import { ConfirmContext } from "../context/ConfirmContext"

type Props = {
    children: React.ReactNode
}

export function ConfirmProvider({
    children

}:Props){

    const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions | null>(null)

    const [confirmResolver, setConfirmResolver] = useState<((value: boolean) => void) | null>(null)

    const customConfirm = (options: ConfirmOptions) => new Promise<boolean>((resolve) => {
        setConfirmOptions(options)
        setConfirmResolver(() => resolve)
        
    })

    return(
        <ConfirmContext.Provider value = {{confirmOptions, confirmResolver, setConfirmOptions, customConfirm}}>
            {children}

        </ConfirmContext.Provider>

    )

}