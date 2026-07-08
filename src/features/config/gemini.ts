import type { GeminiState } from "../model/types"

export const initialGeminiState:GeminiState = {isFetching: false, status: 'idle', data: null, error: null, retryCount: 1}