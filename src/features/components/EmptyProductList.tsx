import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"

type Props = {
    onCreate: () => void
    onLoadDemo: () => void

}

export default function EmptyProductList({
    onCreate, onLoadDemo

}: Props){

    const {theme} = useTheme()

    const {role} = useAuth()

    return(
        <div className={`max-w-4xl mx-auto rounded-3xl p-6 ${theme.card} ${theme.border}`}>
             <div className="text-5xl mb-4">
                📦

            </div>

            <h3 className={`text-lg font-semibold ${theme.text}`}>
                No Products Yet

            </h3>

            <p className={`mt-2 text-sm ${theme.subText}`}>
                Create your first product or load sample data.

            </p>
            
             <div className="mt-6 flex justify-center gap-3">
                {role==='admin' &&
                    <button onClick={onCreate} className="px-4 py-2 rounded-xl bg-sky-500 text-white">
                        + New Product
                    
                    </button>
                    
                }

                <button onClick={onLoadDemo} className={`px-4 py-2 rounded-xl ${theme.border} ${theme.hover} ${theme.text}`}>
                    Load Demo Products
        
                </button>

            </div>

        </div>
            
    )

}