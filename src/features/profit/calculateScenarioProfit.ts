import type { ProfitInput } from "../model/types";
import calculateProfitByRate from "./calculateProfitByRate";

export default function calculateScenarioProfit(input: ProfitInput, scenarioRate: number){
    return calculateProfitByRate(input, scenarioRate)

}