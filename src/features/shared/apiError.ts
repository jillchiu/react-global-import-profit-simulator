import type { ApiError } from "../model/types";

export function mapHttpError(status: number): ApiError{
    
    switch(status){
        case 429:
            return {type: "API_LIMIT"}

        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            return {type: "SERVICE_UNAVAILABLE"}

        default:
            return {type: 'UNKNOWN'}
    
    }
    
}

export function getErrorMessage(err: ApiError): string{

    switch(err.type){
        case "NETWORK":
            return "✗ Network error"

        case "API_LIMIT":
            return "✗ API rate limit exceeded"

        case "ABORT":
            return "✗ Abort error"

        case "UNKNOWN":
            return "✗ Unknown error"

        case "INVALID_DATA":
            return "✗ Invalid API response"

        case "SERVICE_UNAVAILABLE":
            return "✗ Service temporarily unavailable"

    }

}

export function shouldRetry(err: ApiError): boolean{

    switch(err.type){
        case "NETWORK":
            return true

        case "API_LIMIT":
            return true
            
        case "SERVICE_UNAVAILABLE":
            return true

        case "INVALID_DATA":
            return false

        case "ABORT":
            return false

        case "UNKNOWN":
            return false

    }

}