import { createContext } from "react"
import type { UserRole } from "../model/types"


type AuthContextType = {
    role: UserRole

    isLoggedIn: boolean

    login: (role: Exclude<UserRole, null>) => void

    logout: () => void

}

export const AuthContext = createContext<AuthContextType | null>(null)
