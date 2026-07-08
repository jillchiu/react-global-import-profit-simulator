import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "../hooks/useTheme"
import { useCalculator } from "../hooks/useCalculator"

export default function ProfitChart(){

    const {theme} = useTheme()

    const {chartData} = useCalculator()

    return(
        <div className={`max-w-4xl mx-auto rounded-3xl p-6 ${theme.card} ${theme.border}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>
                Scenario Impact Analysis

            </h3>

            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="scenario" />

                    <YAxis yAxisId="left" />

                    <Line yAxisId="left" dataKey="profit" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} className={`${theme.subText}`}/>

                    <YAxis yAxisId="right" orientation="right" />

                    <Line yAxisId="right" dataKey="margin" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} />

                    <Tooltip formatter={(value, name) => {
                                            const num = Number(value)

                                            if (name === "margin") {
                                                return [`${num.toFixed(2)}%`, "Margin"]

                                            }

                                            if (name === "profit") {
                                                return [num.toFixed(2), "Profit"]

                                            }

                                            return [num.toFixed(2), String(name)]

                                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    )
}