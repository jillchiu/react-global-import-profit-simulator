import React, { createContext } from "react";
import type { Product, ProductMode, ProfitInput } from "../model/types";

type ProductContextType = {
    products: Product[]

    selectedProductId: string | null

    selectedProductName: string
    setSelectedProductName: React.Dispatch<React.SetStateAction<string>>

    draftProduct: Product | null

    productMode: ProductMode

    updateProduct: (product: Product) => void
    loadDemoProduct: () => void

    startCreatingProduct: () => void
    handleStartEditing: () => void
    startDeletingProduct: (id: string) => void

    clearProduct: () => void
    replaceProducts: (prodct: Product[]) => void

    clearSelection: () => void
    cancelEditing: () => void
    editProduct: (data: Product) => void

    deplicateProduct: (product: Product) => Product

    createProduct: (name: string, input: ProfitInput) => void
    findSelectedProduct: (id: string) => Product | undefined

    handlePrimaryText: string

}

export const ProductContext = createContext<ProductContextType | null>(null)