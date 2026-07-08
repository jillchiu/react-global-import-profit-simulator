import { useTheme } from "../hooks/useTheme";
import ProfitForm from "./ProfitForm";

export default function SimulatorForm(){

    const {theme} = useTheme()

    return (
        <>
            <form className={`max-w-4xl mx-auto rounded-3xl p-8 ${theme.border} ${theme.card} grid gap-6`}>
                <ProfitForm />

            </form>
        </>

    )

}