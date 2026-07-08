import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Calculator, Package, Settings } from "lucide-react";

export default function Navbar(){

    const {theme} = useTheme()

    return(
        <nav className={`flex items-center gap-6 font-medium ${theme.text}`}>
            <NavLink className={({isActive}) => isActive ? `${theme.text} font-semibold flex items-center gap-2.5` : `${theme.subText} flex items-center gap-2.5`} to="/" >
                <Calculator size={18} />Simulator

            </NavLink>

            <NavLink className={({isActive}) => isActive ? `${theme.text} font-semibold flex items-center gap-2.5` : `${theme.subText} flex items-center gap-2.5`} to="/products">
                <Package size={18} />Products

            </NavLink>

            <NavLink className={({isActive}) => isActive ? `${theme.text} font-semibold flex items-center gap-2.5` : `${theme.subText} flex items-center gap-2.5`} to="/settings">
                <Settings size={18} />Settings

            </NavLink>

        </nav>

    )

}