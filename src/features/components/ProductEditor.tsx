import ProfitForm from "./ProfitForm"
import { useTheme } from "../hooks/useTheme"
import { useProduct } from "../hooks/useProduct"
import ProductHeader from "./ProductHeader"
import ProductButton from "./ProductButton"
import { useProductActions } from "../hooks/useProductActions"
import { useEffect, useRef } from "react"

export default function ProductEditor(){

    const {theme} = useTheme()

    const {handleStartEditing} = useProduct()

    const {handleCreateProduct, handleSaveProduct, handleUpdateProduct} = useProductActions()

    const {productMode, handlePrimaryText} = useProduct()

    const editorRef = useRef<HTMLDivElement>(null)

    const nameInputRef = useRef<HTMLInputElement>(null)

    const actionControl =
        productMode==='idle' ? handleCreateProduct : productMode==='create' ? handleSaveProduct : handleUpdateProduct
    
    useEffect(() => {
        if(productMode === 'create' || productMode === 'edit'){
            editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

            nameInputRef.current?.focus()

            nameInputRef.current?.select()

        }

    }, [productMode])

    return(
        <div ref = {editorRef}>
            <form className={`max-w-4xl mx-auto rounded-3xl p-8 ${theme.border} ${theme.card} grid gap-6`}>
                <div className="space-y-6" onFocus = {handleStartEditing}>

                    <ProductHeader 
                            nameInputRef = {nameInputRef} 
                    
                    />

                    <ProfitForm />
                    
                </div>

                <ProductButton 
                        actionControl = {actionControl}
                        text = {handlePrimaryText}

                />

            </form>
        </div>

    )

}