import { useReducer, useRef } from "react";
import type { ProfitInput, ProfitResult } from "../model/types";
import { initialGeminiState } from "../config/gemini";
import { buildInsightPrompt } from "../ai/buildInsightPrompt";
import geminiService from "../core/geminiService";
import { getErrorMessage, shouldRetry } from "../shared/apiError";
import { useToast } from "./useToast";
import { geminiReducer } from "../reducers/geminiReducer";

export function useGeminiInsight(){

    const [state, dispatch] = useReducer(geminiReducer, initialGeminiState)

    const controllerRef = useRef<AbortController | null>(null)
    const requestRef = useRef(0)

    function cancelInsight(){
        controllerRef.current?.abort()

    }

    const {showToast} = useToast()

    async function submitGeminiInsight(profitInput: ProfitInput, profitResult: ProfitResult, scenarioPercent: number){
        controllerRef.current?.abort()

        const controller = new AbortController()

        controllerRef.current = controller

        const signal = controller.signal

        const requestId = ++requestRef.current

        dispatch({type: 'ANALYZING'})
        
        const prompt = buildInsightPrompt(profitInput, profitResult, scenarioPercent)

        const result = await geminiService(prompt, signal)

        if(requestId !== requestRef.current) return

        if(result.ok){
            dispatch({type: 'SUCCESS', payload: result.data})
            showToast('✓ Insight generated', 'success')

            return result

        }
        
        if(result.error.type === 'ABORT'){
            dispatch({type:'ERROR', payload: result.error})

            return result

        }

        if(shouldRetry(result.error)){
            for (let i=1; i <=3 ; i++) {
                dispatch({type: 'RETRYING', payload: i})

                await new Promise((resolve => setTimeout(resolve, 10000 * i)))

                const retryResult = await geminiService(prompt, signal)

                if(retryResult.ok){
                    dispatch({type: 'SUCCESS', payload: retryResult.data})
                    showToast('✓ Insight generated', 'success')

                    return retryResult

                }

                if(!shouldRetry(retryResult.error)) break

            }

        }

        dispatch({type: 'ERROR', payload: result.error})
        showToast(getErrorMessage(result.error), 'error')

    }

    return{ geminiInsight: state, submitGeminiInsight, cancelInsight }

}