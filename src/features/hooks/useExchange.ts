import { useContext } from "react";
import { ExchangeContext } from "../context/ExchangeContext";

export function useExchange(){
    const context = useContext(ExchangeContext)

    if(!context) {
        throw new Error(
           'useExchange must be used inside ExchangeProvider'

        )

    }

    return context

}