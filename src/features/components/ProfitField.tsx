import { useTheme } from "../hooks/useTheme"
import type { Currency, ProfitInput, UpdateInput } from "../model/types"
import CurrencySelect from "./CurrencySelect"

type Props = {
    label: string
    value: string
    currency: Currency

    valueKey: keyof ProfitInput
    currencyKey: keyof ProfitInput

    updateInput: UpdateInput

}

export default function ProfitField({
    label, value, currency, valueKey, currencyKey, updateInput

}: Props){

    const {theme} = useTheme()

    return(
        <div className="text-sm">
            <label className={`${theme.subText}`}>{label}</label>

            <div className="flex gap-2">
                <input 
                    type="number" 
                    value={value} 
                    onChange={ (e) => updateInput(valueKey, e.target.value)}
                    className={`flex-1 px-4 py-3 rounded-xl ${theme.background} ${theme.border} ${theme.text}`}
                    
                /> 

                <CurrencySelect
                    value = {currency}
                    onChange = {(currency) => updateInput(currencyKey, currency)}

                />

            </div>

        </div>

    )

}