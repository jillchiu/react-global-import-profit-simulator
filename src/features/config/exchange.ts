import type { ExchangeRateState } from "../model/types"

export const initialExchangeRateState:ExchangeRateState = {isFetching: false, status: 'idle', data: null, error: null}