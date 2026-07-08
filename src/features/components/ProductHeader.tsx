import { useAuth } from "../hooks/useAuth"
import { useProduct } from "../hooks/useProduct"
import { useTheme } from "../hooks/useTheme"

type Props = {
    nameInputRef: React.RefObject<HTMLInputElement | null>

}

export default function ProductHeader({
    nameInputRef

}:Props){

    const {role} = useAuth()

    const {theme} = useTheme()

    const {selectedProductName, setSelectedProductName} = useProduct()

    return(
        <>
            {role === 'admin' &&
                <div className="text-sm">
                    <label className={`${theme.subText}`}>Product Name</label>

                    <div className="flex gap-2">
                        <input 
                            type = "text"
                            value = {selectedProductName}
                            onChange = {(e) => setSelectedProductName(e.target.value)}
                            className = {`flex-1 px-4 py-3 rounded-xl ${theme.background} ${theme.border} ${theme.text}`}
                            ref = {nameInputRef}
                            
                        /> 

                    </div>

                </div>

            }

        </>

    )

}