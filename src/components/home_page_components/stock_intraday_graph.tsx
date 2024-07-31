import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IntradayData } from '../../lib/custom_interfaces';
import { ChartConfig, ChartContainer } from '../ui/chart';

const chartConfig={
    "close": {
        "color": "hsl(var(--chart-1))",
    }
} satisfies ChartConfig;
type IntradayGraphProps = {
    data: IntradayData[];
  } & React.HTMLAttributes<HTMLDivElement>;
  

export default function IntradayGraph({data}: IntradayGraphProps) {
    return (
        <ChartContainer config={chartConfig} className='w-[100%] h-[40px]'>
            <LineChart width={300} height={100} data={data}>
                <YAxis domain={["dataMin", "dataMax"]} axisLine={false} tickLine={false} tick={false} scale={"pow"} />
                <Line type="monotone" dataKey="close" stroke="hsl(var(--chart-1))" dot={false} />
            </LineChart>
        </ChartContainer>
            
    )
}