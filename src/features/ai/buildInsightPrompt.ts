import type { ProfitInput, ProfitResult } from "../model/types"

export function buildInsightPrompt(input: ProfitInput, result: ProfitResult, scenarioPercent: number){
    return `
    You are a business profitability analyst.

    Analyze the following profit simulation result.

    Exchange Rate Scenario:
    ${scenarioPercent}%

    Product Cost:
    ${input.productCost}

    Domestic Shipping:
    ${input.domesticShipping}

    International Shipping:
    ${input.internationShipping}

    Selling Price:
    ${input.sellingPrice}

    Revenue:
    ${result.revenue}

    Total Cost:
    ${result.totalCost}

    Profit:
    ${result.profit}

    Profit Margin:
    ${result.margin}%

    Markup:
    ${result.markup}%

    Rules:

    Focus on:

    - Product cost
    - Domestic shipping
    - International shipping
    - Selling price
    - Exchange rate impact

    Do not speculate about:
    - Fraud
    - Lawsuits
    - Criminal activity
    - Accounting scandals
    - Operational disasters

    Only analyze the provided numbers.

    Schema:

    {
        "summary": "string",
        "reasons": [
            "string"
        ],
        "recommendations": [
            "string"
        ]
    }
    `

}