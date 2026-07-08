import type { GeminiAction, GeminiState } from "../model/types";

export function geminiReducer(state: GeminiState, action: GeminiAction): GeminiState{
    switch (action.type){
        case 'ABORT':
            return{
                ...state,
                status: 'error'

            }

        case 'ERROR':
            return{
                ...state, 
                isFetching: false,
                status: 'error', 
                error: action.payload

            }

        case 'ANALYZING':
            return{
                ...state, 
                isFetching: true, 
                status: 'analyzing'

            }

        case 'SUCCESS':
            return{
                ...state,
                isFetching: false,
                status: 'success', 
                data: action.payload

            }

        case 'RETRYING':
            return{
                ...state, 
                status:'retrying', 
                retryCount: action.payload

            }

    }

}