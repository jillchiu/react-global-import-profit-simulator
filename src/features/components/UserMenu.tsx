import { LogOut, ShieldCheck, UserRound } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"

export default function UserMenu(){

    const {role, logout} = useAuth()

    const {theme} = useTheme()

    return(
        <div className={`flex items-center gap-4`}>
            <span className={`flex items-center gap-2.5 px-3 py-1 rounded-full text-sm ${role === 'admin' ? 'bg-sky-500/20 text-sky-500' : 'bg-green-500/20 text-green-500'}`}>
                {role==='admin' ? <ShieldCheck size={15} /> : <UserRound size={15} />}
                {role==='admin' ? 'Admin' : 'Viewer'}
            
            </span>


            <button onClick={logout} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition ${theme.text} hover:bg-red-500 hover:text-white active:scale-95`}>
                <LogOut size={15} />Logout

            </button>
                    
        </div>

    )

}