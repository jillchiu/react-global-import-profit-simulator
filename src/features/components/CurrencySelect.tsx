import { useTheme } from "../hooks/useTheme";
import { ALL_CURRENCIES, POPULAR_CURRENCIES } from "../config/currency";
import type { Currency } from "../model/types";

type CurrencySelectProps = {
    value: Currency

    onChange: (currency: Currency) => void

}

export default function CurrencySelect({
    value, onChange

}: CurrencySelectProps){
    
    const allCurrencies = ALL_CURRENCIES.filter(currency => !POPULAR_CURRENCIES.includes(currency))

    const {theme} = useTheme()

    return (
        <select value={value} onChange={(e) => onChange(e.target.value as Currency)} className={`${theme.background} ${theme.border} rounded-lg px-3 py-2 ${theme.text}`}>
            <optgroup label="Popular">
                {POPULAR_CURRENCIES.map(currency => (
                    <option key={currency} value={currency}>
                        {currency}

                    </option>

                ))}

            </optgroup>

            <optgroup label="All Currencies">
                {allCurrencies.map(currency => (
                    <option key={currency} value={currency}>
                        {currency}

                    </option>

                ))}

            </optgroup>

        </select>

    )

}