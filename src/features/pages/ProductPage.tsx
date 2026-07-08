import type { ProductWithProfit } from "../../features/model/types"
import getProductStatus from "../../features/utils/getProductStatus"
import calculateProfit from "../../features/utils/calculateProfit"
import { useProduct } from "../hooks/useProduct.ts"
import { useCalculator } from "../hooks/useCalculator.ts"
import { useExchange } from "../hooks/useExchange.ts"
import LoadingMessage from "../components/LoadingMessage.tsx"
import ErrorMessage from "../components/ErrorMessage.tsx"
import { useEffect } from "react"
import ExchangeRatePanel from "../components/ExchangeRatePanel.tsx"
import ProductList from "../components/ProductList.tsx"
import EmptyProductList from "../components/EmptyProductList.tsx"
import ProductEditor from "../components/ProductEditor.tsx"
import ScenarioPanel from "../components/ScenarioPanel.tsx"
import ProfitSummary from "../components/ProfitSummary.tsx"
import ProfitChart from "../components/ProfitChart.tsx"
import { useProductActions } from "../hooks/useProductActions.ts"
import AIOverlay from "../components/AIOverlay.tsx"

export default function ProductPage(){

    const { products, productMode, draftProduct, selectedProductId, selectedProductName } = useProduct()

    const { input, profitResult } = useCalculator()

    const { currencyPair, currentRate, exchangeRateState } = useExchange()

    const actions = useProductActions()
    
    useEffect(() => {
        function handleEsc(e: KeyboardEvent){
          if(e.key === 'Escape') actions.executeExit()
    
        }
    
        window.addEventListener('keydown', handleEsc)
    
        return () => window.removeEventListener('keydown', handleEsc)
    
    }, [productMode, draftProduct, input, selectedProductName])

    if(exchangeRateState.isFetching) return <LoadingMessage />
    
    if(exchangeRateState.error) return <ErrorMessage error = {exchangeRateState.error} />

    if(!exchangeRateState.data) return null

    const rates = exchangeRateState.data.rates

    const productsWithProfit:ProductWithProfit[] = products.map(product => ({
        ...product, profitResult: getProductStatus(product.data).type === 'ready' ? calculateProfit(product.data, rates, currencyPair, currentRate).profit : null

    }))

    return (
        
        <>
            <ExchangeRatePanel />

            {products.length > 0 ? (
                    <ProductList 
                        products = {productsWithProfit}
                        onCreate = {actions.handleCreateProduct}
                        onLoad = {actions.handleLoadProduct}
                        onDeplicate = {actions.handleDeplicateProduct}
                        selectedProductId = {selectedProductId}
                        deleteProduct = {actions.handleDeleteProduct}
                        rates = {exchangeRateState.data.rates}
                        clearProduct = {actions.handleClearProduct}
                        importProduct = {actions.openImportDialog}
                        exportCsv = {actions.handleExportCsv}
                        exportJson = {actions.handleExportJson}

                    />
            ):(
                    <EmptyProductList 
                        onCreate = {actions.handleCreateProduct}
                        onLoadDemo = {actions.handleLoadDemoProduct}

                    />
            )}
        
            <ProductEditor />

            <ScenarioPanel />

            { profitResult && <ProfitSummary /> }

            <ProfitChart />
            
            <AIOverlay />

        </>

    )

}