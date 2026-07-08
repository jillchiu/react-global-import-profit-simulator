import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"

export default function LoginRole(){

    const {login} = useAuth()

    const {theme} = useTheme()

    return(
        <div className={`rounded-3xl ${theme.card} ${theme.border} p-8`}>
          <div>
            <p className={`text-sm ${theme.subText}`}>
              Choose your role
              
            </p>
          
          </div>

          <div className="flex gap-4 mt-6">
            <button className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-500 hover:bg-sky-700" onClick={() => login('admin')}>Login as Admin</button>

            <button className="px-4 py-2 rounded-xl bg-green-500/20 text-green-500 hover:bg-green-700" onClick={() => login('viewer')}>Login as Viewer</button>

          </div>

        </div>

    )

}