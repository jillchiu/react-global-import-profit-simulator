import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"
import type { CurrencyPair, ProductWithProfit } from "../model/types"
import formatMoney from "../utils/formatMoney"
import getProductStatus from "../utils/getProductStatus"
import { Copy, Pencil, Trash2, ArrowRight } from "lucide-react"

type Props = {
    product: ProductWithProfit
    
    onLoad: (id: string) => void

    onDeplicate: (id: string) => void

    selectedProductId: string | null

    deleteProduct: (id: string) => void

    currencyPair: CurrencyPair

}

export default function ProductCard({
    product, onLoad, onDeplicate, selectedProductId, deleteProduct, currencyPair

}:Props) {

    const status = getProductStatus(product.data)

    const {role} = useAuth()

    const {theme} = useTheme()

    return (
        <div key={product.id} 
            className={`rounded-2xl px-6 py-5 mb-4 transition duration-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 ${theme.text} ${selectedProductId === product.id ? theme.selectedBorder : `${theme.border} ${theme.hover}`}`}
        >

            <div className="flex justify-between items-center">
                <div className="font-semibold text-lg tracking-tight">{product.name}</div>
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`w-2.5 h-2.5 rounded-full ${status.icon === 'green' ? 'bg-green-500' : status.icon === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'}`} />
                    <span className={`${theme.subText} text-sm`}>{status.message}</span>

                </div>

            </div>

            <hr className="my-4 border-white/10" />

            <div className="flex justify-between text-sm">
                <div className="flex flex-col">
                    <div className="text-sm tracking-wide opacity-80 mb-1">Pair</div>
                    <div className="flex items-center gap-1.5 shrink-0 font-semibold text-base tracking-tight">
                        {product.data.productCurrency}<ArrowRight className={`${theme.text}`} size={15}/>{product.data.sellingCurrency}

                    </div>

                </div>

                <div className="flex flex-col">
                    <div className="text-sm tracking-wide opacity-80 mb-1">Cost</div>
                    <div className="flex items-center gap-1.5 shrink-0 font-semibold text-base tracking-tight">
                        {product.data.productCurrency}{' '}{formatMoney(Number(product.data.productCost))}

                    </div>

                </div>

                <div className="flex flex-col">
                    <div className="text-sm tracking-wide opacity-80 mb-1">Sell</div>
                    <div className="flex items-center gap-1.5 shrink-0 font-semibold text-base tracking-tight">
                        {product.data.sellingCurrency}{' '}{formatMoney(Number(product.data.sellingPrice))}
                        
                    </div>

                </div>

                <div className="flex flex-col items-end text-right">
                    <div className="text-sm tracking-wide opacity-80 mb-1">Profit</div>
                    <div className={`flex justify-end item-center gap-1 shrink-0 font-semibold text-base tracking-tight ${(product.profitResult ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {(product.profitResult ?? 0) >= 0 ? "+" : "-"}
                        {currencyPair.target}{' '}{product.profitResult === null ? '--' : formatMoney(Math.abs(product.profitResult))}
                        
                    </div>

                </div>

            </div>

            <hr className="my-4 border-white/10" />

            {role === 'admin' && 

                <div className="grid grid-cols-1 gap-6 pt-4">
                    <div className="flex justify-end gap-7">
                        <button onClick={() => onDeplicate(product.id)} className="flex items-center gap-1 text-smm transition opacity-80 hover:opacity-100"><Copy size={16} /> Duplicate</button>
                        <button onClick={() => onLoad(product.id)} className="flex items-center gap-1 text-sm transition opacity-80 hover:opacity-100"><Pencil size={16} /> Edit</button>
                        <button onClick={(e) => {e.stopPropagation(); deleteProduct(product.id)}} className="flex items-center gap-1 text-sm transition opacity-90 text-red-500 hover:opacity-100"><Trash2 size={16}/> Delete</button>
                        
                    </div>

                </div>

            }

        </div>

    )

}