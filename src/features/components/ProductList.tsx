import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useExchange } from "../hooks/useExchange"
import { useTheme } from "../hooks/useTheme"
import type { ProductSort,  Currency, ProductFilter, ProductWithProfit } from "../model/types"
import ProductCard from "./ProductCard"
import getProductStatus from "../utils/getProductStatus"
import { Package, Filter, ArrowUpDown, Search, EllipsisVertical, FileUp, FileJson, FileSpreadsheet, Trash2 } from "lucide-react"
import sortProducts from "../utils/sortProducts"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

type Props = {
    products: ProductWithProfit[]

    onCreate: () => void

    onLoad: (id: string) => void

    onDeplicate: (id: string) => void

    selectedProductId: string | null

    deleteProduct: (id: string) => void

    rates: Record<Currency, number>

    clearProduct: () => void

    importProduct: () => void

    exportCsv: () => void

    exportJson: () => void

}

export default function ProductList({
    products, onCreate, onLoad, selectedProductId, deleteProduct, onDeplicate, clearProduct, importProduct, exportCsv, exportJson

}: Props){

    const {role} = useAuth()

    const {theme} = useTheme()

    const {currencyPair} = useExchange()

    const [filter, setFilter] = useState<ProductFilter>('all')

    const [sort, setSort] = useState<ProductSort>('latest')

    const [search, setSearch] = useState<string>('')

    const searchedProducts = products.filter( product => product.name.toLowerCase().includes(search.trim().toLowerCase()))

    const filteredProducts = searchedProducts.filter( product => { 
        if(filter === 'all') return true

        return getProductStatus(product.data).type === filter

    })

    const sortedProducts = sortProducts([...filteredProducts], sort)

    return(
        <div className={`max-w-4xl mx-auto rounded-3xl p-6 ${theme.card} ${theme.border}`}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <Package size={18} strokeWidth={2} className={`${theme.text}`} />

                        <h2 className={`font-semibold text-lg ${theme.text}`}>Products</h2>

                    </div>

                    <div className="flex items-center gap-2">
                        <Search size={18} className={`${theme.text}`} />

                        <input value={search} className={`${theme.text}`} onChange = {(e) => setSearch(e.target.value)} placeholder="Search..." />

                    </div>

                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <Filter size={16} className={`${theme.text}`} />

                        <select value={filter} className={`${theme.text} ${theme.background}`} onChange = {(e) => setFilter(e.target.value as ProductFilter)}>
                            <option value='all'>All</option>
                            <option value='ready'>Ready</option>
                            <option value='draft'>Draft</option>

                        </select>

                    </div>

                    <div className="flex items-center gap-2">
                        <ArrowUpDown size={16} className={`${theme.text}`} />

                        <select value={sort} className={`${theme.text} ${theme.background}`} onChange = {(e) => setSort(e.target.value as ProductSort)}>
                            <option value='latest'>Latest</option>
                            <option value='profit-desc'>Profit ↓</option>
                            <option value='profit-asc'>Profit ↑</option>
                            <option value='name-asc'>Name A-Z</option>
                            <option value='name-desc'>Name Z-A</option>

                        </select>

                    </div>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.border} ${theme.text} ${theme.hover}`}>
                                <EllipsisVertical size={18}/>

                            </button>

                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content align="end" sideOffset={8} className={`w-56 rounded-2xl shadow-xl overflow-hidden ${theme.card} ${theme.border}`}>
                                {role === 'admin' && 
                                    <DropdownMenu.Item  className={`flex items-center gap-2.5 px-4 py-3 cursor-pointer outline-none ${theme.text} ${theme.hover}`}
                                                        onClick={importProduct}
                                    >
                                        <FileUp size={18} /> Import Products

                                    </DropdownMenu.Item>

                                }

                                <DropdownMenu.Item  className={`flex items-center gap-2.5 px-4 py-3 cursor-pointer outline-none ${theme.text} ${theme.hover}`}
                                                    onClick={exportJson}
                                >
                                    <FileJson size={18} /> Export JSON

                                </DropdownMenu.Item>

                                <DropdownMenu.Item  className={`flex items-center gap-2.5 px-4 py-3 cursor-pointer outline-none ${theme.text} ${theme.hover}`}
                                                    onClick={exportCsv}
                                >
                                    <FileSpreadsheet size={18} /> Export CSV

                                </DropdownMenu.Item>

                                <DropdownMenu.Separator className="my-1 h-px bg-slate-700" />

                                {role === 'admin' && 
                                    <DropdownMenu.Item  className={`flex items-center gap-2.5 px-4 py-3 cursor-pointer outline-none text-red-400 hover:bg-red-500/10`}
                                                        onClick={clearProduct}
                                    >
                                        <Trash2 size={18} /> Delete All

                                    </DropdownMenu.Item>

                                }

                            </DropdownMenu.Content>

                        </DropdownMenu.Portal>

                    </DropdownMenu.Root>

                    {role === 'admin' &&
                        <button className="px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600" onClick={onCreate}> + New </button>

                    }

                </div>

            </div>
            
            {(sortedProducts.length=== 0) ? (
                <div className={`py-12 text-center ${theme.text}`}>
                    No Products found.

                </div>
            
            ):(
                sortedProducts.map(product => {
                    return (
                        <ProductCard
                            key = {product.id}

                            product = {product}

                            onDeplicate = {onDeplicate}

                            onLoad = {onLoad}

                            selectedProductId = {selectedProductId}

                            deleteProduct = {deleteProduct}

                            currencyPair = {currencyPair}

                        />

                    )

                })

            )}

        </div>

    )

}