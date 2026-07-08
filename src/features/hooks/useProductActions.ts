import type { ImportError, Product, ProductMode, Result } from "../model/types"
import calculateProfit from "../utils/calculateProfit"
import { downloadCsv } from "../utils/downloadCsv"
import { downloadJson } from "../utils/downloadJson"
import getProductStatus from "../utils/getProductStatus"
import { hasUnsavedInput } from "../utils/hasUnsavedInput"
import { useCalculator } from "./useCalculator"
import { useConfirm } from "./useConfirm"
import { useExchange } from "./useExchange"
import { useProduct } from "./useProduct"
import { useSetting } from "./useSetting"
import { useToast } from "./useToast"

export function useProductActions(){

    const {
            products,
            productMode,
            draftProduct,
            selectedProductId,
            selectedProductName,
    
            startCreatingProduct,
            createProduct,
            updateProduct,
            startDeletingProduct,
            loadDemoProduct,
            editProduct,
            cancelEditing,
            clearSelection,
            findSelectedProduct,
            deplicateProduct,
            clearProduct,
            replaceProducts
    
        } = useProduct()
    
    const {
        input,

        setInput,
        resetInput
    } = useCalculator()

    const {customConfirm} = useConfirm()

    const {showToast} = useToast()

    const {currencyPair, exchangeRateState} = useExchange()

    const {settings} = useSetting()

    const status = getProductStatus(input)
    
    const dirty = draftProduct!== null && JSON.stringify({ name: selectedProductName, data: input}) !== JSON.stringify({ name: draftProduct.name, data: draftProduct.data })

    async function confirmDiscardDirty(){
        if(productMode !== 'edit' || !dirty) return true

        const hasConfirmed = await customConfirm({
            message: 'Discard unsaved changes?',
            confirmText: 'Discard'

        })

        if(!hasConfirmed) return false

        showToast('✓ Unsaved discarded', 'success')
        return true

    }

    async function handleCreateProduct(){
        if(!(await confirmDiscardDirty())) return

        startCreatingProduct()
        resetInput()
    
    }

    function showSaveToast(mode: ProductMode){
        if(status.type === 'draft'){
            showToast('✓ Product Saved as Draft', 'success')

        }else{

            if(mode === 'create'){
                showToast('✓ Product Created', 'success')

            }else{
                showToast('✓ Product Updated', 'success')

            }
        
        }

    }

    function handleSaveProduct(){
        const name = selectedProductName.trim() || 'New Product'

        createProduct(name, input)

        showSaveToast(productMode)

    }

    function handleUpdateProduct(){
        if(!selectedProductId) return

        const name = selectedProductName.trim() || 'New Product'

        updateProduct({id: selectedProductId, name: name ?? '', data: input, createdAt: Date.now()})

        showSaveToast(productMode)

    }

    function handleDeleteProduct(id: string){
        const deletingCurrent = selectedProductId === id

        startDeletingProduct(id)

        if (deletingCurrent) resetInput()
        
        showToast('✓ Product Deleted', 'success')

    }

    function handleLoadDemoProduct(){
        loadDemoProduct()
        showToast('✓ Demo Products Loaded', 'success')

    }

    async function handleLoadProduct(id: string){
        const selectedProduct = findSelectedProduct(id)

        if(!selectedProduct) return

        if(!(await confirmDiscardDirty())) return

        setInput(selectedProduct.data)
        editProduct(selectedProduct)

    }

    async function executeCreateMode(){
        if(selectedProductName !== 'New Product' || hasUnsavedInput(input)){
            const hasConfirmed = await customConfirm({
                message: 'Discard unsaved changes?',
                confirmText: 'Discard'
            
            })
    
            if(hasConfirmed){
                resetInput()
                clearSelection()
                showToast('✓ Unsaved discarded', 'success')
    
            }

        }else{
            resetInput()
            clearSelection()

            if(document.activeElement instanceof HTMLElement) document.activeElement.blur()

        }
    
    }

    async function executeEditMode(){
        if(!draftProduct) return
    
        if(dirty){
            const hasConfirmed = await customConfirm({
                message: 'Discard unsaved changes?',
                confirmText: 'Discard'
    
            })
    
            if(hasConfirmed){
                setInput(draftProduct.data)
                cancelEditing()
                showToast('✓ Unsaved discarded', 'success')
                
            }

        }else{
            setInput(draftProduct.data)
            cancelEditing()
    
            if(document.activeElement instanceof HTMLElement) document.activeElement.blur()

        }
    
    }

    async function executeExit(){
        switch (productMode){
            case 'create':
                return executeCreateMode()

            case 'edit':
                return executeEditMode()

        }
    
    }

    async function handleDeplicateProduct(id: string){
        const selectedProduct = findSelectedProduct(id)

        if(!selectedProduct) return

        if(!(await confirmDiscardDirty())) return

        const newProduct = deplicateProduct(selectedProduct)

        editProduct(newProduct)

        setInput(newProduct.data)

        showToast('✓ Product Duplicated', 'success')

    }

    async function handleClearProduct(){
        const hasConfirmed = await customConfirm({
            message: 'Delete all products?',
            confirmText: 'Delete'

        })

        if(!hasConfirmed) return false

        clearProduct()

        showToast('✓ All products deleted', 'success')

    }

    function openImportDialog(){
        const input = document.createElement("input")

        input.type = "file"
        input.accept = ".json"

        input.onchange = async() => {
            const file = input.files?.[0]

            if(!file) return

            await handleImportProducts(file)

        }

        input.click()

    }

    function validateImportedProducts(raw: unknown): Result<Product[], ImportError>{
        if(!Array.isArray(raw)) return{ ok: false, error: 'Invalid_Product' }
 
        for(const item of raw){
            if(typeof item !== "object" || item === null) return{ ok: false, error: 'Invalid_Product' }

            if(!("id" in item)) return{ ok: false, error: 'Invalid_Product' }

            if(!("name" in item)) return{ ok: false, error: 'Invalid_Product' }

            if(!("data" in item)) return{ ok: false, error: 'Invalid_Product' }

            if(!("createdAt" in item)) return{ ok: false, error: 'Invalid_Product' }

        }

        return { ok: true, data: raw as Product[]}

    }

    async function handleImportProducts(file: File){
        

        const text = await file.text()

        let raw

        try { 
            raw = JSON.parse(text) 

        }catch {
            showToast("✕ Invalid JSON file", "error")

            return

        }

        const result = validateImportedProducts(raw)

        if(!result.ok){
            showToast("✕ Invalid product file", "error")

            return

        }

        const hasConfirmed = await customConfirm({
            message: 'Importing will replace all existing products.\nThis action cannot be undone.',
            confirmText: 'Replace'

        })

        if(!hasConfirmed) return

        replaceProducts(result.data)
            
        showToast('✓ Products imported successfully', 'success')

    }

    function getToday(){
        const today = new Date()

        return today.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).split("/").join("-")

    }

    function handleExportJson(){
        const today = getToday()

        const filename = `products_backup_${today}.json`

        downloadJson(filename, products)

        showToast("✓ Products exported successfully", "success")

    }

    function handleExportCsv(){
        const today = getToday()

        const filename = `products_report_${today}.csv`

        const report = products.map(product => {

            const status = getProductStatus(product.data)

            if(status.type === 'draft'){
                return{
                    name: product.name,
                    status: "Draft",
                    revenue: "-",
                    totalCost: "-",
                    profit: "-",
                    margin: "-",
                    markup: "-",
                    createAt: new Date(product.createdAt).toLocaleDateString()

                }

            }

            const result = calculateProfit(product.data, exchangeRateState.data!.rates, currencyPair, settings.defaultScenario)

            return {
                name: product.name,
                status: "Ready",
                revenue: result.revenue,
                totalCost: result.totalCost,
                profit: result.profit,
                margin: result.margin,
                markup: result.markup,
                createAt: new Date(product.createdAt).toLocaleDateString()

            }

        })

        downloadCsv(filename, report)
        
        showToast("✓ Products exported successfully", "success")

    }

    return{
        openImportDialog, handleExportJson, handleExportCsv, handleCreateProduct, handleSaveProduct, handleUpdateProduct, handleDeleteProduct, handleLoadDemoProduct, handleLoadProduct, executeExit, handleDeplicateProduct, handleClearProduct, handleImportProducts

    }

}