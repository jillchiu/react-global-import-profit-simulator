import { useContext } from "react";
import { CalculatorContext } from "../context/CalculatorContext";

export function useCalculator(){
    const context = useContext(CalculatorContext)

    if(!context) {
        throw new Error (
           'useCalculator must be used inside CalculatorProvider'

        )

    }

    return context

}