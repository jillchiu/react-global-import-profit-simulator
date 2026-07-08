import CurrencySelect from "./CurrencySelect"
import { formatRate } from "../utils/formatRate"
import { useTheme } from "../hooks/useTheme"
import { useExchange } from "../hooks/useExchange"

export default function ExchangeRatePanel() {

    const {theme} = useTheme()

    const {updateBaseCurrency, updateTargetCurrency, swapCurrent, currencyPair, currentRate, exchangeRateState} = useExchange()

    const lastUpdated = exchangeRateState.data?.lastUpdated ?? ''

    return(
        <section className={`max-w-4xl mx-auto rounded-3xl ${theme.card} ${theme.border} p-8`}>

            <div className="flex items-center justify-center gap-6 mb-8">

                <CurrencySelect
                    value = {currencyPair.base}
                    onChange = {updateBaseCurrency}

                />

                <button className={`w-12 h-12 rounded-full ${theme.hover} transition ${theme.border} ${theme.background} ${theme.text}`} onClick={swapCurrent}>
                    ⇄

                </button>

                <CurrencySelect
                    value = {currencyPair.target}
                    onChange = {updateTargetCurrency}

                />

            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className={`rounded-2xl p-5 ${theme.background} ${theme.border}`}>
                    <p className={`text-xs uppercase tracking-wider ${theme.subText}`}>
                        Currenct Rate :

                    </p>

                    <p className={`text-3xl font-bold mt-2 ${theme.text}`}>
                        {formatRate(currentRate)}

                    </p>

                </div>

                <div className={`rounded-2xl p-5 ${theme.background} ${theme.border}`}>
                    <p className={`text-xs uppercase tracking-wider ${theme.subText}`}>
                        Updated : 

                    </p>

                    <p className={`mt-2 text-sm ${theme.subText}`}>
                        {lastUpdated}
                        
                    </p>

                </div>

            </div>

        </section>

    )

}