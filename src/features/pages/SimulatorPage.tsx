import ExchangeRatePanel from "../components/ExchangeRatePanel"
import ProfitChart from "../components/ProfitChart"
import SimulatorForm from "../components/SimulatorForm"
import ProfitSummary from "../components/ProfitSummary"
import ScenarioPanel from "../components/ScenarioPanel"
import { useCalculator } from "../hooks/useCalculator"
import AIOverlay from "../components/AIOverlay"

export default function SimulatorPage(){

    const { profitResult } = useCalculator()

    return (
        <>
            <ExchangeRatePanel />
        
            <SimulatorForm />

            <ScenarioPanel />

            { profitResult && <ProfitSummary /> }

            <ProfitChart />

            <AIOverlay />

        </>

    )

}