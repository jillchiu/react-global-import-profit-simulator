import { createContext } from "react";
import type { Currency, CurrencyPair, ExchangeRateState } from "../model/types";

type ExchangeContextType = {
    currencyPair: CurrencyPair

    exchangeRateState: ExchangeRateState
    submitSearch: () => void

    currentRate: number
    swapCurrent: () => void

    updateBaseCurrency: (currency: Currency) => void
    updateTargetCurrency: (currency: Currency) => void

}

export const ExchangeContext = createContext<ExchangeContextType | null>(null)