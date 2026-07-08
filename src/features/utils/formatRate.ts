export function formatRate(rate: number){
    
    if(rate >= 100) return rate.toFixed(2)

    if(rate >= 1) return rate.toFixed(4)

    if(rate >= 0.01) return rate.toFixed(6)

    return rate.toFixed(8)

}