import type { ExchangeRateResponse, ExchangeRateData } from "../model/types"

export default function mapExchangeRateData(data: ExchangeRateResponse): ExchangeRateData{

    return{
      rates: data.conversion_rates,

      lastUpdated: data.time_last_update_utc,

      nextUpdated: data.time_next_update_unix

    }

  }