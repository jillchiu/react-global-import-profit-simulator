import type { ProfitResult } from "../model/types";

export default function sameProfitResult(a: ProfitResult, b: ProfitResult){
    return(
        a.totalCost === b.totalCost &&
        a.revenue === b.revenue &&
        a.profit === b.profit &&
        a.margin === b.margin &&
        a.markup === b.markup
        
    )

}