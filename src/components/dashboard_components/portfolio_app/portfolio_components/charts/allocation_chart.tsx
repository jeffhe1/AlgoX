import { Card, CardTitle } from "@/components/ui/card";
import { readPortfolio } from "../action";
import { useEffect, useState } from "react";
import { find_avg_price, find_total_quantity, get_symbol_list } from "../holdings_table";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Label, Pie, PieChart } from "recharts";
import { LoaderCircle, RefreshCw } from "lucide-react";
import { set } from "zod";
import { Router, useRouter } from "next/router";

export default function AllocationChart({chartData}:{
    chartData:({
        symbol: string, 
        last_price:number,
        current_price:number, 
        daily_change_p: number,
        avg_price: number, 
        total_quantity: number, 
        position_total_value: number,
        pnl: number,
        position_change_p: number,
        position_pnl_daily: number,
    } & { fill?: string })[]
}){
    
    const [refresh, setRefresh] = useState<boolean>(false);
    var data:{label: string, value: number, fill: string}[] = [];
    const total_value = chartData.reduce((acc, curr) => acc + curr.position_total_value, 0);
    var acc_sum = 0;
    for (let i=0; i < chartData.length; i++) {
        if(i<4) {data.push({
            label: chartData[i].symbol,
            value: chartData[i].position_total_value,
            fill: "hsl(var(--chart-"+(i+1)+"))",
        });
        acc_sum += chartData[i].position_total_value;
    
    }
        if(i>4) {break;}
    }
    data.push({
        label: "other",
        value: total_value - acc_sum,
        fill: "hsl(var(--chart-5))",
    })

    let chartConfig: {[key:string]: {label:string, color: string}} = {};
    for (let i=0; i < chartData.length; i++) {
        if(i<5){chartConfig[chartData[i].symbol] = {
            label: chartData[i].symbol,
            color: "hsl("+(360/5)*i+", 100%, 50%)",
        }}
        if(i>5){break;}
    }
    chartConfig["other"] = {
        label: "other",
        color: "hsl(360, 100%, 50%)",
    }
    console.log("chart config: ", chartConfig);
    console.log("chart data: ", data);
    return(
        <Card className="h-[30vh] aspect-video">
            <CardTitle className="w-full px-3 pt-5 font-bold text-center inline-grid auto-cols-max grid-flow-col-dense">
                Capital Allocation
            <RefreshCw 
                className="my-auto ml-2 w-[20px] h-[20px] cursor-pointer hover:scale-110 hover:rotate-180 duration-500 transition-all ease-in-out " 
                onClick={() => {setRefresh(!refresh)}
                }/>
            </CardTitle>
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[350px] ">
                <PieChart className="inline-grid auto-cols-max grid-flow-dense">
                    <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                    <Label width={30} position="center"
                        content={<text>100%</text>}>
                    </Label> 
                    <ChartLegend content={<ChartLegendContent/>} />   
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="label"
                        innerRadius={100}
                        outerRadius={150}
                        strokeWidth={5}
                        animationEasing={"ease-in-out"}
                        animationDuration={3000}
                    />
                    
                </PieChart>
            </ChartContainer>
        </Card>
    );
}

