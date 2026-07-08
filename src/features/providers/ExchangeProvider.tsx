import type React from "react"
import { useEffect, useState } from "react"
import type { Currency, CurrencyPair } from "../model/types"
import { getBaseAndTargetCurrency, saveBaseAndTargetCurrency } from "../utils/localStorage"
import { useRateSearch } from "../hooks/useRateSearch"
import { ExchangeContext } from "../context/ExchangeContext"

type Props = {
    children: React.ReactNode

}

export default function ExchangeProvider({
    children

}:Props){
    
    const [currencyPair, setCurrencyPair] = useState<CurrencyPair>(() => getBaseAndTargetCurrency() ?? {base: 'USD', target: 'JPY'} )

    function updateBaseCurrency(currency: Currency) { setCurrencyPair(prev => ({...prev, base: currency})) }

    function updateTargetCurrency(currency: Currency) { setCurrencyPair(prev => ({...prev, target: currency})) }

    const {exchangeRateState, submitSearch} = useRateSearch()

    useEffect(() => { submitSearch() }, [])
    
    const currentRate = exchangeRateState.data ? (exchangeRateState.data.rates[currencyPair.target] / exchangeRateState.data.rates[currencyPair.base]) : 0
    
    const swapCurrent = () => setCurrencyPair({ base: currencyPair.target, target: currencyPair.base })

    useEffect(() => { saveBaseAndTargetCurrency(currencyPair.base, currencyPair.target) }, [currencyPair] )
    
    return(
        <ExchangeContext.Provider value = {{currencyPair, updateBaseCurrency, updateTargetCurrency, exchangeRateState, submitSearch, currentRate, swapCurrent}}>
            {children}

        </ExchangeContext.Provider>

    )

}