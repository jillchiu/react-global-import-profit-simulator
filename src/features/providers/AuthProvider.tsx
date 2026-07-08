import type React from "react"
import { useEffect, useState } from "react"
import type { UserRole } from "../model/types"
import { AuthContext } from "../context/AuthContext"
import { getRole, saveRole } from "../utils/localStorage"

type Props = {
    children: React.ReactNode

}

export function AuthProvider({
    children

}:Props) {
    const [role, setRole] = useState<UserRole | null>(() => getRole() ?? null)

    useEffect(() => { saveRole(role) }, [role])

    const login = (role: Exclude<UserRole, null>) => { setRole(role) }

    const logout = () => setRole(null)

    const isLoggedIn = role !== null

    return(
        <AuthContext.Provider value = {{role, isLoggedIn, login, logout}}>
            {children}
        
        </AuthContext.Provider>

    )

}