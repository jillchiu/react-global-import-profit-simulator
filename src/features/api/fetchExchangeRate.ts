import { mapHttpError } from "../shared/apiError"
import type { Result, ApiError, ExchangeRateResponse } from "../model/types"

export async function fetchRate(signal?: AbortSignal): Promise<Result<ExchangeRateResponse, ApiError>>{

    try{

        const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY

        const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`, {...(signal? {signal}: {}) })

        if(!res.ok){
            return {ok: false, error: mapHttpError(res.status)}

        }else{
            const data = await res.json()

            if(data.result !== "success"){
                return {ok: false, error: {type: 'INVALID_DATA'}}

            }

            return {ok: true, data: data}

        }

    } catch (err) {

        if(err instanceof DOMException && err.name === 'AbortError'){
            return { ok: false, error: {type: 'ABORT'} }

        }

        return { ok: false, error: {type: 'NETWORK'} }

    }

}