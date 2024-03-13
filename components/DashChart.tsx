"use client"
import React from 'react'
import {Status} from "@prisma/client";
import {BarChart, Bar, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";


interface dataProps {
    data: dataElements[]
}
interface dataElements {
    name: Status,
    total: number
}
const DashChart = ({data} : dataProps) => {
    return <Card className="col-span-4 min-h-full">
        <CardHeader>
            <CardTitle>Ticket Counts</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        stroke="#e0e0e0"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#e0e0e0"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Bar dataKey="total" fill="#60A5FA" radius={[4,4,0,0]} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
}
export default DashChart
