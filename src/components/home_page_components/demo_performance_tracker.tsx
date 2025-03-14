"use client";
import React, { PureComponent, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ChartContainer, ChartConfig } from '../ui/chart';
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
    "Portfolio Percentage Return": { 
        label: "Portfolio Return",
        color: "hsl(var(--chart-1))",
    },
    "S&P 500 return": { 
        label: "S&P 500",
        color: "hsl(var(--chart-2))",
    },
    "NASDAQ 100 return": { 
        label: "NASDAQ 100",
        color: "hsl(var(--chart-3))",
    },
    "BTC return": { 
        label: "BTC",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig

const data = [{"date":"2014-07-15","Portfolio Total":10000.0,"Portfolio Percentage Return":0.0,"S&P 500 return":0.0,"NASDAQ 100 return":0.0,"BTC return":0.0},{"date":"2014-12-04","Portfolio Total":10451.8727798305,"Portfolio Percentage Return":4.5187277983,"S&P 500 return":4.9666194619,"NASDAQ 100 return":9.7311939987,"BTC return":-38.2315369777},{"date":"2015-04-30","Portfolio Total":10983.3747258459,"Portfolio Percentage Return":9.8337472585,"S&P 500 return":6.1501112685,"NASDAQ 100 return":13.2840175036,"BTC return":-63.4770224324},{"date":"2015-09-22","Portfolio Total":11623.2195171863,"Portfolio Percentage Return":16.2321951719,"S&P 500 return":-1.9421404006,"NASDAQ 100 return":8.4184205043,"BTC return":-61.2418467216},{"date":"2016-02-16","Portfolio Total":11484.9451439967,"Portfolio Percentage Return":14.84945144,"S&P 500 return":-4.5266032774,"NASDAQ 100 return":3.6049176912,"BTC return":-63.601216782},{"date":"2016-07-08","Portfolio Total":16415.4193805447,"Portfolio Percentage Return":64.1541938054,"S&P 500 return":6.7418571718,"NASDAQ 100 return":13.742446343,"BTC return":-43.2478596636},{"date":"2016-11-29","Portfolio Total":23830.4411543112,"Portfolio Percentage Return":138.3044115431,"S&P 500 return":11.5314586284,"NASDAQ 100 return":23.5986663888,"BTC return":-35.3987767663},{"date":"2017-04-25","Portfolio Total":27530.6120500985,"Portfolio Percentage Return":175.306120501,"S&P 500 return":20.3267246611,"NASDAQ 100 return":40.216711815,"BTC return":13.6304105188},{"date":"2017-09-15","Portfolio Total":39777.4463037942,"Portfolio Percentage Return":297.7744630379,"S&P 500 return":25.7788792231,"NASDAQ 100 return":51.656595124,"BTC return":-3.6640558971},{"date":"2018-02-08","Portfolio Total":51223.1431378041,"Portfolio Percentage Return":412.231431378,"S&P 500 return":35.5502731135,"NASDAQ 100 return":67.420295895,"BTC return":54.940838328},{"date":"2018-07-03","Portfolio Total":54229.7161456831,"Portfolio Percentage Return":442.2971614568,"S&P 500 return":38.008294558,"NASDAQ 100 return":80.6730568869,"BTC return":91.5012354918},{"date":"2018-11-23","Portfolio Total":37999.0812493246,"Portfolio Percentage Return":279.9908124932,"S&P 500 return":33.1074246409,"NASDAQ 100 return":65.7532819337,"BTC return":274.6927399532},{"date":"2019-04-22","Portfolio Total":46312.3524794835,"Portfolio Percentage Return":363.1235247948,"S&P 500 return":46.2522759458,"NASDAQ 100 return":94.3529902063,"BTC return":851.5771069491},{"date":"2019-09-12","Portfolio Total":47036.5428285388,"Portfolio Percentage Return":370.3654282854,"S&P 500 return":52.3619259559,"NASDAQ 100 return":101.7503646593,"BTC return":1379.9611610397},{"date":"2020-02-05","Portfolio Total":67389.3831357137,"Portfolio Percentage Return":573.8938313571,"S&P 500 return":68.0507788792,"NASDAQ 100 return":139.8624713482,"BTC return":1304.0719617546},{"date":"2020-06-29","Portfolio Total":89092.9357711342,"Portfolio Percentage Return":790.9293577113,"S&P 500 return":52.4428484726,"NASDAQ 100 return":150.0312565118,"BTC return":934.4119283592},{"date":"2020-11-18","Portfolio Total":132783.1864297578,"Portfolio Percentage Return":1227.8318642976,"S&P 500 return":82.5359093668,"NASDAQ 100 return":203.9174828089,"BTC return":547.7372848535},{"date":"2021-04-15","Portfolio Total":166814.9844155704,"Portfolio Percentage Return":1568.1498441557,"S&P 500 return":109.2555128464,"NASDAQ 100 return":253.6882683892,"BTC return":536.2841153588},{"date":"2021-09-07","Portfolio Total":215061.0534928986,"Portfolio Percentage Return":2050.610534929,"S&P 500 return":128.9652033178,"NASDAQ 100 return":297.6661804543,"BTC return":1365.973351799},{"date":"2022-01-28","Portfolio Total":212620.2189508221,"Portfolio Percentage Return":2026.2021895082,"S&P 500 return":118.8347157597,"NASDAQ 100 return":257.397374453,"BTC return":1206.4503951058},{"date":"2022-06-23","Portfolio Total":167054.7519301721,"Portfolio Percentage Return":1570.5475193017,"S&P 500 return":90.4916042889,"NASDAQ 100 return":195.0718899771,"BTC return":1089.8508600168},{"date":"2022-11-14","Portfolio Total":155688.1057731879,"Portfolio Percentage Return":1456.8810577319,"S&P 500 return":100.6170341898,"NASDAQ 100 return":197.8328818504,"BTC return":1006.5265878231},{"date":"2023-04-11","Portfolio Total":229229.5862775566,"Portfolio Percentage Return":2192.2958627756,"S&P 500 return":107.4954481084,"NASDAQ 100 return":231.1419045635,"BTC return":1434.639155572},{"date":"2023-09-01","Portfolio Total":383701.5486573587,"Portfolio Percentage Return":3737.0154865736,"S&P 500 return":129.1978555533,"NASDAQ 100 return":296.3325692853,"BTC return":2088.3221296363},{"date":"2024-01-26","Portfolio Total":447231.3700023601,"Portfolio Percentage Return":4372.3137000236,"S&P 500 return":146.6063119563,"NASDAQ 100 return":342.2171285685,"BTC return":6151.8534704321},{"date":"2024-06-20","Portfolio Total":941461.8670573951,"Portfolio Percentage Return":9314.618670574,"S&P 500 return":177.8879223144,"NASDAQ 100 return":406.7930818921,"BTC return":6838.6395820586}]



export default class DemoPerformanceTracker extends PureComponent {
    state = {
        data: data,
        show : 0,
    }

    onHover = () => {
        this.setState({
            show: !this.state.show
        })
    }
    render() {

        return (
            <Card className='flex flex-col h-[500px] w-[750px] shadow-lg shadow-[var(--shadow)]'>
                <CardTitle className="text-2xl flex justify-center py-2">Portfolio Performance</CardTitle>
                <ChartContainer config={chartConfig} className='mx-auto w-[750px] h-[400px]'>
                    <AreaChart 
                        width={600} 
                        height={400} 
                        data={data}
                        margin={{
                            top:5,
                            right:30,
                            left:20,
                            bottom:5
                        }}>
                        <defs>
                            <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stop-color="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                <stop offset="95%" stop-color="hsl(var(--chart-1))" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorS&P" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stop-color="hsl(var(--chart-2))" stopOpacity={0.5}/>
                                <stop offset="95%" stop-color="hsl(var(--chart-2))" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorNASDAQ" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stop-color="hsl(var(--chart-3))" stopOpacity={0.5}/>
                                <stop offset="95%" stop-color="hsl(var(--chart-3))" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorBTC" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stop-color="hsl(var(--chart-4))" stopOpacity={0.5}/>
                                <stop offset="95%" stop-color="hsl(var(--chart-4))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="Portfolio Percentage Return" stroke="hsl(var(--chart-1))" animationEasing={"ease-in-out"} fillOpacity={1} fill="url(#colorPortfolio)" strokeWidth={2} onMouseOver={this.onHover}/>
                        <Area type="monotone" dataKey="S&P 500 return" stroke="hsl(var(--chart-2))" animationEasing={"ease-in-out"} fillOpacity={1} fill="url(#colorS&P)" strokeOpacity={0.5}/>
                        <Area type="monotone" dataKey="NASDAQ 100 return" stroke="hsl(var(--chart-3))" animationEasing={"ease-in-out"} fillOpacity={1} fill="url(#colorNASDAQ)" strokeOpacity={0.5}/>
                        <Area type="monotone" dataKey="BTC return" stroke="hsl(var(--chart-4))" animationEasing={"ease-in-out"} fillOpacity={1} fill="url(#colorBTC)" strokeOpacity={0.5}/>
                        <ChartTooltip content={<ChartTooltipContent indicator="line"/>}/>
                        <YAxis 
                            dataKey={"Portfolio Percentage Return"}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <XAxis 
                            dataKey={"Date"}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0,7)}
                        />
                        <ChartLegend content={<ChartLegendContent/>}/>
                    </AreaChart>
                </ChartContainer>
                {this.state.show ? (
                    <CardContent className="fade-in-image">
                         <CardDescription>
                             Dispplay some information
                         </CardDescription>
                     </CardContent>  
                ):(
                    <div>
                    </div>
                )
                }
            </Card>
        )
    }
}