import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserMenu from "../components/UserMenu";
import { useTheme } from "../hooks/useTheme";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import LoginRole from "../components/LoginRole";
import { useConfirm } from "../hooks/useConfirm";
import ConfirmModal from "../components/ConfirmModal";
import ToastMessage from "../components/ToastMessage";
import { useProduct } from "../hooks/useProduct";
import { useCalculator } from "../hooks/useCalculator";
import { useEffect } from "react";

export default function RootLayout(){

    const {theme} = useTheme()

    const {isLoggedIn} = useAuth()

    const {confirmOptions, setConfirmOptions, confirmResolver} = useConfirm()

    const {clearSelection} = useProduct()

    const {resetInput} = useCalculator()

    useEffect(() => {
        if (!isLoggedIn) {
            resetInput()
            clearSelection()

        }

    }, [isLoggedIn])

    return(
        <div className={`min-h-screen ${theme.background}`}>
            <title>Global Import Profit Simulator</title>

            <Header />
            
            <div className={`max-w-4xl mx-auto mb-6 rounded-3xl ${theme.card} ${theme.border} px-8 py-4 flex justify-between items-center`}>
                <Navbar />

                {( isLoggedIn ) && <UserMenu /> }

            </div>

            <main className="max-w-4xl mx-auto ">
                {( !isLoggedIn ) ? ( <LoginRole /> ) : ( <Outlet/> ) }

            </main>

            {confirmOptions &&
                <ConfirmModal
                    onConfirm = {() => {
                        confirmResolver?.(true)
                        setConfirmOptions(null)

                    }}
                    onCancel = {() => {
                        confirmResolver?.(false)
                        setConfirmOptions(null)

                    }}

                />

            }

            <ToastMessage />

        </div>

    )

}