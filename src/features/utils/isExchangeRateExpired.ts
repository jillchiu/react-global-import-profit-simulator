export default function isExchangeRateExpired(nextUpdated: number){
    return Date.now() > nextUpdated * 1000

}