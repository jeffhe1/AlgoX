"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import axios from "axios";
import React, {useState, useEffect} from 'react';
import { Button } from "../../components/ui/button";
import { fetchDailyData, fetchIntradayData, fetchWeeklyData } from "../../components/home_page_components/utils";
import '../../components/custom_animations.css';
import { Progress } from "@/components/ui/progress";
import { IntradayData, WeeklyData } from "../../lib/custom_interfaces";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import IntradayGraph from "@/components/home_page_components/stock_intraday_graph";
import WeeklyGraph from "@/components/home_page_components/stock_weekly_graph";


export var ticker_list:{
    symbol:string, 
    current_price:number, 
    last_price:number, 
    daily_change_p:number, 
    intraday_data:IntradayData[]
    last_week_data: WeeklyData[]
}[] = [
    {
        symbol:"BTC-USD.CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol:"SOL-USD.CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol:"NEAR-USD.CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol:"ETH-USD.CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol:"BNB-USD.CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol:"DOGE-USD.CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol:"XRP-USD.CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol:"PYTH-USD.CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    }
];

export function ProgressBar() {
    const [progress, setProgress] = useState(13)
   
    useEffect(() => {
        const timer1 = setTimeout(() => setProgress(66), 1000)
        const timer2 = setTimeout(() => setProgress(98), 2000)
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        }
    }, [])
   
    return <Progress value={progress} className="w-[100%]" />
  }
  
export default function StockDisplayTable() {
    const [requestState, setRequestState] = useState(false);
    const [weekly, setWeekly] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const RT_URL = process.env.NEXT_PUBLIC_EOD_RT_URL ?? '';
    const apikey = process.env.NEXT_PUBLIC_EOD_KEY ?? '';
    useEffect(() => {
        if (!weekly) {
            fetchWeeklyData(ticker_list);
            setWeekly(true);
        };
        var interval = setInterval(async () => {
            fetchDailyData(ticker_list);
            setRequestState(!requestState);
            console.log("requested");
        }, 6000);
        console.log(ticker_list)
        return () => clearInterval(interval);
        },[refresh, requestState]);
    

    return(
        <div className="w-[1000px] h-[550px] items-center pt-20 round-box">
            <Table className="w-[100%] h-[100%] table-fixed">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Symbol</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">24H%</TableHead>
                        <TableHead className="text-right">Last 7 Days</TableHead>
                    </TableRow>
                </TableHeader>
                    {ticker_list[0].current_price > 0 ? (ticker_list.map((data_point) => (
                        <TableBody>
                        <TableRow key={data_point['current_price']}>
                            <TableCell>{data_point['symbol'].replace('.US','').replace('.CC','')}</TableCell>
                            
                            <TableCell className="text-right">
                                {data_point.current_price > data_point.last_price? (
                                    <span className='price-update-green'>
                                        {data_point['current_price'].toFixed(2)}
                                    </span>
                                ):(
                                    <span className='price-update-red'>
                                        {data_point['current_price'].toFixed(2)}
                                    </span>
                                )}
                            </TableCell>

                            <TableCell className="text-right">
                                {data_point['daily_change_p'] > 0? (
                                    <span className="text-green-500">{data_point['daily_change_p'].toFixed(2) +"%"}</span>
                                ):(
                                    <span className="text-red-500">{data_point['daily_change_p'].toFixed(2) +"%"}</span>
                                )}
                            </TableCell>

                            <TableCell className="text-right">
                                {data_point['last_week_data'].length > 0 ? (
                                    <WeeklyGraph data={data_point.last_week_data}/>
                                ):(
                                    <span className="text-red-500">Loading...</span>
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    )
                    )
                    ):(
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} className='text-center text-2xl flex-col'>Loading...<ProgressBar/></TableCell>
                        </TableRow>
                    </TableBody>
                    )}
            </Table>
            <Button className="font-bold" onClick={() => setRefresh(!refresh)}>Refresh</Button>
        </div>
    )       
}