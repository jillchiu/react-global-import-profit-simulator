import { useContext } from "react";
import { SettingContext } from "../context/SettingContext";

export function useSetting(){
    const context = useContext(SettingContext)

    if(!context){
        throw new Error(
            'useSetting must be used inside SettingProvider'

        )

    }

    return context

}