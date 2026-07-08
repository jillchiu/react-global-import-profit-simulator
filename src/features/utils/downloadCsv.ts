import type { ProfitReport } from "../model/types"

export function downloadCsv(filename: string, report: ProfitReport[]){
    const header = ["Product", "Status", "Revenue", "Total Cost", "Profit", "Margin (%)", "Markup (%)", "Created At",]

    const rows = [header.join(",")]

    for (const product of report){
        rows.push([
            product.name, 
            product.status, 
            product.revenue,
            product.totalCost,
            product.profit,
            product.margin,
            product.markup,
            product.createAt

        ].join(","))

    }

    const csv = rows.join("\n")

    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8"}

    )

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")

    a.href = url
    a.download = filename

    a.click()

    URL.revokeObjectURL(url)

}