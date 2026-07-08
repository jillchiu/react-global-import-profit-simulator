import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"

type Props = {
    actionControl: () => void
    text: string

}

export default function ProductButton({
    actionControl, text

}: Props){

    const {role} = useAuth()

    const {theme} = useTheme()

    return(
        <>
            {role === 'admin' &&
                <div className="text-sm">
                    <div className="flex gap-2">
                        <button type="button" className={`flex-1 px-4 py-3 rounded-xl ${theme.background} ${theme.border} ${theme.text} ${theme.hover}`} 
                                onClick={()=> actionControl()}
                        >
                            {text}
                        
                        </button> 

                    </div>

                </div>
            }
            
        </>

    )

}