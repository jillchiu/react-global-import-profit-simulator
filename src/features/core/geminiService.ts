import { fetchGemini } from "../api/fetchGemini";
import mapGeminiData from "../mappers/mapGeminiData";
import type { Result, GeminiData, ApiError } from "../model/types";

export default async function geminiService(prompt: string, controller: AbortSignal): Promise<Result<GeminiData, ApiError>>{
    const result = await fetchGemini(prompt, controller)

    if(!result.ok) return result

    const mapped = mapGeminiData(result.data)

    return{ok: true, data: mapped}

}