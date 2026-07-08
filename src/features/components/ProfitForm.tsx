import ProfitField from "./ProfitField"
import { useCalculator } from "../hooks/useCalculator"

export default function ProfitForm(){

    const {input, updateInput} = useCalculator()

    return(
        <div className="grid md:grid-cols-2 gap-6">
            <ProfitField 
                label = "Product Cost"
                value = {input.productCost}
                currency = {input.productCurrency}
                valueKey = "productCost"
                currencyKey = "productCurrency"
                updateInput = {updateInput}

            />

            <ProfitField 
                label = "Domestic Shipping"
                value = {input.domesticShipping}
                currency = {input.domesticShippingCurrency}
                valueKey = "domesticShipping"
                currencyKey = "domesticShippingCurrency"
                updateInput = {updateInput}

            />

            <ProfitField 
                label = "International Shipping"
                value = {input.internationShipping}
                currency = {input.internationShippingCurrency}
                valueKey = "internationShipping"
                currencyKey = "internationShippingCurrency"
                updateInput = {updateInput}

            />

            <ProfitField 
                label = "Selling Price"
                value = {input.sellingPrice}
                currency = {input.sellingCurrency}
                valueKey = "sellingPrice"
                currencyKey = "sellingCurrency"
                updateInput = {updateInput}

            />

        </div>

    )

}