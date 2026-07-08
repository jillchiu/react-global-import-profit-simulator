import { useTheme } from "../hooks/useTheme"

export default function Header(){

  const {theme} = useTheme()

    return(
        <header className="mx-auto px-2 py-6 flex justify-between items-center max-w-4xl">
          <div>
            <h1 className={`text-xl font-bold ${theme.text}`}>
              Global Import Profit Simulator

            </h1>

            <p className={`text-sm ${theme.subText}`}>
              Analyze how exchange-rate fluctuations affect profit margins
              
            </p>
          
          </div>

        </header>
    )
}