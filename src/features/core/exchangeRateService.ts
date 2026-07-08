import { fetchRate } from "../api/fetchExchangeRate";
import mapExchangeRateData from "../mappers/mapExchangeRateData";
import type { ExchangeRateData, ApiError, Result } from "../model/types";
import { getExchangeRate, saveExchangeRate } from "../utils/localStorage";
import isExchangeRateExpired from "../utils/isExchangeRateExpired";

export default async function exchangeRateService(controller: AbortSignal): Promise<Result<ExchangeRateData, ApiError>>{

    const cached = getExchangeRate()

    const isExpired = isExchangeRateExpired(cached?.nextUpdated ?? 0)
    
    if(cached && !isExpired){
        return { ok: true, data: cached }

    }

    const result = await fetchRate(controller)

    if(!result.ok) return result

    const mapped = mapExchangeRateData(result.data)

    saveExchangeRate(mapped)

    return {ok: true, data: mapped}

}