import type { Result, ApiError, GeminiResponse } from "../model/types";
import { mapHttpError } from "../shared/apiError";
// import { GoogleGenAI } from "@google/genai"

export async function fetchGemini(prompt: string, signal?: AbortSignal): Promise<Result<GeminiResponse, ApiError>>{
    try{
        const apikey = import.meta.env.VITE_GEMINI_API_KEY

        // const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apikey}`,
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apikey}`,
        {
            method: "POST",

            headers: { "Content-Type": "application/json" }, 
            
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),

            signal

        })

        if(!res.ok){
            return {ok: false, error: mapHttpError(res.status)}

        }else{
            const data = await res.json()

            if(!data.candidates?.[0]?.content?.parts?.[0]?.text) return {ok: false, error: {type: 'INVALID_DATA'}}

            return {ok: true, data: data}

        }

    } catch (err) {
        if(err instanceof DOMException && err.name === 'AbortError'){
            return { ok: false, error: {type: 'ABORT'} }

        }

        return { ok: false, error: {type: 'NETWORK'} }

    }

}