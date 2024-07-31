"use client";
import React, { PureComponent } from 'react';
import { Label, Pie, PieChart, Sector, SectorProps} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
  } from "@/components/ui/chart"

  const chartData = [
    {symbol:"NVDA", value: 3000, fill: "var(--color-NVDA)"},
    {symbol:"TSLA", value: 2500, fill: "var(--color-TSLA)"} ,
    {symbol:"AMZN", value: 1000, fill: "var(--color-AMZN)"} ,
    {symbol:"GOOGL", value: 1000, fill: "var(--color-GOOGL)"} ,
    {symbol:"MSFT", value: 2500, fill:"var(--color-MSFT)"},
  ]
  
  const chartConfig = {
    NVDA: {
        label: "Nvidia",
        color: "hsl(var(--chart-1))",
    },
    TSLA: {
        label: "Tesla",
        color: "hsl(var(--chart-2))",
    },
    AMZN: {
        label: "Amazon",
        color: "hsl(var(--chart-3))",    
    },
    GOOGL: {
        label: "Google",
        color: "hsl(var(--chart-4))",    
    },
    MSFT: {
        label: "Microsoft",
        color: "hsl(var(--chart-5))",   
     },
  } satisfies ChartConfig

  const renderActiveShape = (props : PieSectorDataItem) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    return (
        <g className='pie-slice-enlarge'>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    )

  }

export default class DemoPortfolioDistribution extends PureComponent {
    state = {
        activeIndex: 0,
    };

    onPieEnter = (_ : any, index : any) => {
        this.setState({ activeIndex: index });
    }

    render() {
        return (
            <Card className="flex flex-col h-[500px] w-[500px] shadow-lg shadow-[var(--shadow)]">
                <CardTitle className="text-2xl flex justify-center py-2">Portfolio Distribution</CardTitle>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[400px]">
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                        <Label width={30} position="center"
                            content={<text>100%</text>}>
                        </Label>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="symbol"
                            innerRadius={100}
                            outerRadius={150}
                            strokeWidth={5}
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            onMouseEnter={this.onPieEnter}
                            animationEasing={"ease-in-out"}
                            animationDuration={2000}

                        />
                        <ChartLegend content={<ChartLegendContent/>} />
                    </PieChart>
    
                </ChartContainer>
            </Card>
        )
    }
  }