import type { LucideIcon } from "lucide-react"

export type ProfitInput = {
    productCost: string
    domesticShipping: string
    internationShipping: string
    sellingPrice: string

    productCurrency: Currency
    domesticShippingCurrency: Currency
    internationShippingCurrency: Currency
    sellingCurrency: Currency

}

export type ExchangeApi = {
    time_last_update_utc: string

    base_code: string

    conversion_rates: number[]
    
}

export type Currency = 
    | 'USD'
    | 'AED'
    | 'AFN'
    | 'ALL'
    | 'AMD'
    | 'ANG'
    | 'AOA'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BAM'
    | 'BBD'
    | 'BDT'
    | 'BGN'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BTN'
    | 'BWP'
    | 'BYN'
    | 'BZD'
    | 'CAD'
    | 'CDF'
    | 'CHF'
    | 'CLF'
    | 'CLP'
    | 'CNH'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CUP'
    | 'CVE'
    | 'CZK'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'EGP'
    | 'ERN'
    | 'ETB'
    | 'EUR'
    | 'FJD'
    | 'FKP'
    | 'FOK'
    | 'GBP'
    | 'GEL'
    | 'GGP'
    | 'GHS'
    | 'GIP'
    | 'GMD'
    | 'GNF'
    | 'GTQ'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HRK'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'IMP'
    | 'INR'
    | 'IQD'
    | 'IRR'
    | 'ISK'
    | 'JEP'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KGS'
    | 'KHR'
    | 'KID'
    | 'KMF'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'KZT'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSL'
    | 'LYD'
    | 'MAD'
    | 'MDL'
    | 'MGA'
    | 'MKD'
    | 'MMK'
    | 'MNT'
    | 'MOP'
    | 'MRU'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXN'
    | 'MYR'
    | 'MZN'
    | 'NAD'
    | 'NGN'
    | 'NIO'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PEN'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLN'
    | 'PYG'
    | 'QAR'
    | 'RON'
    | 'RSD'
    | 'RUB'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SDG'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SLE'
    | 'SLL'
    | 'SOS'
    | 'SRD'
    | 'SSP'
    | 'STN'
    | 'SYP'
    | 'SZL'
    | 'THB'
    | 'TJS'
    | 'TMT'
    | 'TND'
    | 'TOP'
    | 'TRY'
    | 'TTD'
    | 'TVD'
    | 'TWD'
    | 'TZS'
    | 'UAH'
    | 'UGX'
    | 'UYU'
    | 'UZS'
    | 'VES'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XCD'
    | 'XCG'
    | 'XDR'
    | 'XOF'
    | 'XPF'
    | 'YER'
    | 'ZAR'
    | 'ZMW'
    | 'ZWG'
    | 'ZWL'


export type CurrencyPair = {
    base: Currency
    target: Currency

}


export type ProfitResult = {
    totalCost: number
    revenue: number
    profit: number
    margin: number
    markup: number

}

export type ThemeMode = 
    | 'light'
    | 'dark'

export type Theme = {
    background: string
    text: string
    subText: string

    card: string
    border: string
    hover: string

    accent: string

    selectedBorder: string

}

export type ApiError =
    | { type: 'NETWORK' }
    | { type: 'API_LIMIT' }
    | { type: 'ABORT' }
    | { type: 'UNKNOWN' }
    | { type: 'INVALID_DATA' }
    | { type: 'SERVICE_UNAVAILABLE'}

export type Result<T, E> = 
    | {ok: true, data: T}
    | {ok: false, error: E}

export type ExchangeRateResponse = {
    result: "success"

    time_last_update_utc: string

    time_next_update_unix: number

    conversion_rates: Record<Currency, number>

}

export type ExchangeRateData = {
    rates: Record<Currency, number>

    lastUpdated: string

    nextUpdated: number

}

export type ExchangeRateState = {
    status: 'idle' | 'success' | 'error'

    isFetching: boolean

    data: ExchangeRateData | null

    error: ApiError | null

}

export type UpdateInput = <K extends keyof ProfitInput>( key: K, value: ProfitInput[K] ) => void

export interface Product {
    id: string
    name: string
    data: ProfitInput
    createdAt: number

}

export interface ProductWithProfit extends Product {
    profitResult: number | null

}

export type ProductMode = 
    | 'idle'
    | 'create'
    | 'edit'

export type Toast = {
    message: string
    type: 'success' | 'error'
    
}

export type ProductStatus =
    | {type: 'ready', icon: 'green', message: 'Ready'}
    | {type: 'draft', icon: 'yellow', message: 'Draft'}
    | {type: 'invalid', icon: 'red', message: | 'Invalid number' | 'Negative value'}

export type ConfirmOptions = {
    message: string
    confirmText?: string
    cancelText?: string

}

export type UserRole = 
    | 'admin'
    | 'viewer'
    | null

export type ExchangeAction = 
    | {type: 'FETCH'}
    | {type: 'SUCCESS', payload: ExchangeRateData}
    | {type: 'ERROR', payload: ApiError}
    | {type: 'ABORT'}

export type GeminiAction = 
    | {type: 'ANALYZING'}
    | {type: 'SUCCESS', payload: GeminiData}
    | {type: 'ERROR', payload: ApiError}
    | {type: 'ABORT'}
    | {type: 'RETRYING', payload: number}

export type GeminiState = {
    status: 'idle' | 'analyzing' | 'retrying' | 'success' | 'error'
    retryCount: number
    isFetching: boolean
    data: GeminiData | null
    error: ApiError | null

}

export type GeminiResponse = {
    candidates: {
        content: {
            parts: {
                text: string
            }[]

        }

    }[]

}

export type GeminiData = {
    summary: string
    reasons: string[]
    recommendations: string[]

}

export type GeminiInsightInput = {
    profitResult: ProfitResult
    scenarioPercent: number

}

export type ProductFilter = 
    | 'all'
    | 'ready'
    | 'draft'

export type ProductSort =
    | 'latest'
    | 'profit-desc'
    | 'profit-asc'
    | 'name-desc'
    | 'name-asc'

export type GeminiButtonInfo = {
    icon: LucideIcon
    text: string

}

export type Settings = {
    themeMode: ThemeMode
    defaultScenario: number

}

export type TechStack = {
    icon: LucideIcon
    label: string
    
}

export type ImportError =
    | 'Invalid_JSON'
    | 'Invalid_Product'
    | 'Empty'

export type ProfitReport = {
    name: string
    status: string
    revenue: number | string
    totalCost: number | string
    profit: number | string
    margin: number | string
    markup: number | string
    createAt: string

}