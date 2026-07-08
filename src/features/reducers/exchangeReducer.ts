import type { ExchangeAction, ExchangeRateState } from "../model/types";

export function exchangeReducer(state: ExchangeRateState, action: ExchangeAction): ExchangeRateState {
    switch (action.type){
        case 'FETCH' :
            return{
                ...state,
                isFetching: true,
                error: null

            }

        case 'SUCCESS' :
            return{
                isFetching: false,
                status: 'success',
                data: action.payload,
                error: null
            }

        case 'ERROR' :
            return{
                ...state,
                isFetching: false,
                status: 'error',
                error: action.payload

            }

        case 'ABORT' :
            return{
                ...state,
                isFetching: false

            }

        default : 
            return state

    }

}