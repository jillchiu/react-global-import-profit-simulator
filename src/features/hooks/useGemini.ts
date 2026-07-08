import { useContext } from "react";
import { GeminiContext } from "../context/GeminiContext";

export function useGemini(){
    const context = useContext(GeminiContext)

    if(!context){
        throw new Error(
          'useGemini must be used inside GeminiProvider'

        )

    }

    return context

}