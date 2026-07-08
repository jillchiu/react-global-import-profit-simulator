import type { Currency, CurrencyPair, ExchangeRateData, ThemeMode, ProfitInput, Product, UserRole, Settings } from "../model/types"

const EXCHANGE_RATE_KEY = 'exchange_rate'
const THEMEMODE_KEY = 'exchange_theme_mode'
const BASEANDTARGET_KEY = 'exchange_base_and_target'
const PROFIT_FORM_KEY = 'profit_form'
const PRODUCTS_LIST_KEY = 'products_list'
const ROLE_KEY = 'role'
const SETTINGS_KEY = 'settings'

export function saveExchangeRate(data: ExchangeRateData){
    localStorage.setItem(EXCHANGE_RATE_KEY, JSON.stringify(data))

}

export function getExchangeRate(){
    const stored = localStorage.getItem(EXCHANGE_RATE_KEY)

    if(!stored) return null

    return JSON.parse(stored)

}

export function saveThemeMode(mode: ThemeMode){
    localStorage.setItem(THEMEMODE_KEY, mode)

}

export function getThemeMode(): ThemeMode{
    const stored = localStorage.getItem(THEMEMODE_KEY)
    
    if(stored==='light'){
        return 'light'
    }

    return 'dark'

}

export function saveBaseAndTargetCurrency(base: Currency, target: Currency){
    localStorage.setItem(BASEANDTARGET_KEY, JSON.stringify({base, target}))

}

export function getBaseAndTargetCurrency(): CurrencyPair | null{
    const stored = localStorage.getItem(BASEANDTARGET_KEY)

    if(!stored) return null

    return JSON.parse(stored)

}

export function saveProfitForm(input: ProfitInput){
    localStorage.setItem(PROFIT_FORM_KEY, JSON.stringify(input))

}

export function getProfitForm(): ProfitInput | null{
    const stored = localStorage.getItem(PROFIT_FORM_KEY)

    if(!stored) return null

    return JSON.parse(stored)

}

export function saveProductsList(products: Product[]){
    localStorage.setItem(PRODUCTS_LIST_KEY, JSON.stringify(products))

}

export function getProductsList(): Product[]{
    const stored = localStorage.getItem(PRODUCTS_LIST_KEY)

    if(!stored) return []

    return JSON.parse(stored)

}

export function saveRole(role: UserRole){
    localStorage.setItem(ROLE_KEY, JSON.stringify(role))

}

export function getRole(): UserRole{
    const stored = localStorage.getItem(ROLE_KEY)

    if(!stored) return null

    return JSON.parse(stored)

}

export function saveSettings(settings: Settings){
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))

}

export function getSettings(): Settings{
    const stored = localStorage.getItem(SETTINGS_KEY)

    if(!stored) return {themeMode: 'dark', 'defaultScenario': 0}

    return JSON.parse(stored)

}