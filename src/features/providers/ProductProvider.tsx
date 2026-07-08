import type React from "react"
import { useEffect, useState } from "react"
import type { Product, ProductMode, ProfitInput } from "../model/types"
import { getProductsList, saveProductsList } from "../utils/localStorage"
import { ProductContext } from "../context/ProductContext"
import createDemoProducts from "../utils/createDemoProducts"

type Props ={
    children: React.ReactNode

}

export default function ProductProvider({
    children

}:Props){

    const [products, setProducts] = useState<Product[]>(() => getProductsList() ?? [])

    function updateProduct(product: Product) { setProducts(prev => prev.map(p => p.id === product.id ? product : p)) }

    function loadDemoProduct() { setProducts(createDemoProducts()) }

    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

    const [selectedProductName, setSelectedProductName] = useState<string>('')

    const [draftProduct, setDraftProduct] = useState<Product | null>(null)

    const [productMode, setProductMode] = useState<ProductMode>('idle')

    useEffect(() => { saveProductsList(products) }, [products])

    function startCreatingProduct(){
        setProductMode('create')
        setSelectedProductId(null)
        setSelectedProductName('New Product')

    }

    function handleStartEditing(){
        if(productMode !== 'idle') return
        if(!selectedProductId) return startCreatingProduct()

        const product = products.find(p => p.id === selectedProductId)

        if(!product) return

        setDraftProduct(product)

        setProductMode('edit')

    }

    function clearSelection(){
        setSelectedProductId(null)
        setSelectedProductName('')
        setDraftProduct(null)
        setProductMode('idle')

    }

    function startDeletingProduct(id: string){
        setProducts(prev => prev.filter(p => p.id !== id))

        if (selectedProductId === id) {
            clearSelection()

        }

    }

    function cancelEditing(){
        if(!draftProduct) return null

        setSelectedProductId(draftProduct.id)
        setSelectedProductName(draftProduct.name)
        setDraftProduct(null)
        setProductMode('idle')

    }

    function editProduct(data: Product){
        setProductMode('edit')
        setSelectedProductId(data.id)
        setSelectedProductName(data.name)
        setDraftProduct(data)

    }

    const handlePrimaryText = productMode==='idle' ? 'Create New Product' : productMode==='create' ? 'Save Product' : 'Update Existing Product'
    
    function createProduct(name: string, input: ProfitInput){
        const newProduct: Product = {
            id: crypto.randomUUID(),
            name: name,
            data: input,
            createdAt: Date.now()

        }

        setProducts(prev => [...prev, newProduct])
        clearSelection()

    }

    function findSelectedProduct(id: string){
        return products?.find( product => product.id === id )

    }

    function deplicateProduct(product: Product){
        const newProduct: Product = {
            id: crypto.randomUUID(),
            name: `${product.name} (Copy)`,
            data: {...product.data},
            createdAt: Date.now()

        }

        setProducts(prev => [...prev, newProduct])

        return newProduct

    }

    function clearProduct(){
        setProducts([])

    }

    function replaceProducts(product: Product[]){
        setProducts(product)

    }

    return(
        <ProductContext.Provider value = {{
            products, 
            handlePrimaryText, 
            draftProduct, 
            productMode, 
            selectedProductId, 
            selectedProductName, 

            clearProduct, 
            replaceProducts, 
            deplicateProduct, 
            findSelectedProduct, 
            startCreatingProduct, 
            createProduct, 
            editProduct, 
            clearSelection, 
            cancelEditing, 
            handleStartEditing, 
            startDeletingProduct,
            updateProduct, 
            loadDemoProduct, 
            setSelectedProductName
        }}>
            {children}

        </ProductContext.Provider>

    )

}