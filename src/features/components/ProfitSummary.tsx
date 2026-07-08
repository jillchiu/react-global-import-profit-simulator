import { useCalculator } from "../hooks/useCalculator"
import { useTheme } from "../hooks/useTheme"
import formatMoney from "../utils/formatMoney"
import formatPercent from "../utils/formatPercent"

export default function ProfitSummary(){

    const {theme} = useTheme()

    const {profitResult} = useCalculator()

    if(!profitResult) return null

    return(
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className={`rounded-2xl p-5 ${theme.card} ${theme.border}`}>
                <p className={`text-xs uppercase tracking-wider ${theme.subText}`}>
                    Revenue
                
                </p>
                
                <p className="text-2xl font-bold mt-2 text-green-400">

                    {formatMoney(profitResult.revenue)}
                
                </p>
            
            </div>

            <div className={`rounded-2xl p-5 ${theme.card} ${theme.border}`}>
                <p className={`text-xs uppercase tracking-wider ${theme.subText}`}>
                    Cost
                    
                </p>

                <p className="text-2xl font-bold mt-2 text-red-400">
                    {formatMoney(profitResult.totalCost)}
                    
                </p>
            
            </div>

            <div className={`rounded-2xl p-5 ${theme.card} ${theme.border}`}>
                <p className={`text-xs uppercase tracking-wider ${theme.subText}`}>
                    Profit
                    
                </p>

                <p className={`text-2xl font-bold mt-2 ${profitResult.profit >=0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatMoney(profitResult.profit)}
                    
                </p>

            </div>

            <div className={`rounded-2xl p-5 ${theme.card} ${theme.border}`}>
                <p className={`text-xs uppercase tracking-wider ${theme.subText}`}>
                    Margin
                    
                </p>

                <p className={`text-2xl font-bold mt-2 ${profitResult.margin >=30 ? 'text-green-400' : profitResult.margin >=10 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {formatPercent(profitResult.margin)}
                    
                </p>
 
            </div>

            <div className={`rounded-2xl p-5 ${theme.card} ${theme.border}`}>
                <p className={`text-xs uppercase tracking-wider ${theme.subText}`}>
                    Markup
                    
                </p>

                <p className={`text-2xl font-bold mt-2 ${profitResult.markup >=100 ? 'text-green-400' : profitResult.markup >=30 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {formatPercent(profitResult.markup)}
                    
                </p>
 
            </div>
 
        </div>

    )

}