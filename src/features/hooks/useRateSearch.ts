import { useReducer, useRef } from "react";
import exchangeRateService from "../core/exchangeRateService";
import { useToast } from "./useToast";
import { exchangeReducer } from "../reducers/exchangeReducer";
import { initialExchangeRateState } from "../config/exchange";
import { getErrorMessage } from "../shared/apiError";

export function useRateSearch(){

    const [exchangeRateState, dispatch] = useReducer(exchangeReducer, initialExchangeRateState)

    const controllerRef = useRef<AbortController | null>(null)
    const requestRef = useRef(0)

    const {showToast} = useToast()

    async function submitSearch(){
        controllerRef.current?.abort()

        const controller = new AbortController()

        controllerRef.current = controller

        const signal = controller.signal

        const requestId = ++requestRef.current

        dispatch({type: 'FETCH'})

        const result = await exchangeRateService(signal)

        if(requestId !== requestRef.current) return

        if(result.ok){
            dispatch({type: 'SUCCESS', payload: result.data})

        }else{
            if(result.error.type === 'ABORT') dispatch({type: 'ABORT'})

            showToast(getErrorMessage(result.error), 'error')
            dispatch({type: 'ERROR', payload: result.error})

        }

        return result

    }

    return{
        exchangeRateState, submitSearch

    }

}