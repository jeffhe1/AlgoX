import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IntradayData, WeeklyData } from '../../lib/custom_interfaces';
import { ChartConfig, ChartContainer } from '../ui/chart';


const chartConfig={
    "close": {
        "color": "hsl(var(--chart-1))",
    }
} satisfies ChartConfig;
type WeeklyGraphProps = {
    data: WeeklyData[];
  } & React.HTMLAttributes<HTMLDivElement>;
  

export default function WeeklyGraph({data}: WeeklyGraphProps) {
    return (
        <ChartContainer config={chartConfig} className='mx-auto w-[150px] h-[30px] justify-end flex'>
            <LineChart width={300} height={100} data={data}>
                <YAxis domain={["dataMin", "dataMax"]} axisLine={false} tickLine={false} tick={false} scale={"pow"} />
                <Line type="monotone" dataKey="close" stroke="hsl(var(--chart-1))" dot={false} />
            </LineChart>
        </ChartContainer>
            
    )
}