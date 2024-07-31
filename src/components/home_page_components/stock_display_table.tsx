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
import React, {useState, useEffect} from 'react';
import { Button } from "../../components/ui/button";
import { fetchDailyData, fetchIntradayData } from "./utils";
import '../../components/custom_animations.css';
import { Progress } from "@/components/ui/progress";
import { IntradayData, WeeklyData } from "../../lib/custom_interfaces";
import IntradayGraph from "@/components/home_page_components/stock_intraday_graph";
import { Card } from "../ui/card";
import { CustomChevronDown, CustomChevronUp, CustomChevronsDown, CustomChevronsUp } from "./resources/small_widgets";
import PriceUp from "../ui/priceup";
import PriceDown from "../ui/pricedown";
import { Skeleton } from "../ui/skeleton";
import PercentUp from "../ui/percup";
import { PercentDown } from "../ui/percdown";
import { ChevronsDown, ChevronsUp, ChevronUp } from "lucide-react";




export var ticker_list:{
    symbol_name:string,
    exchange_id: string, 
    current_price:number, 
    last_price:number, 
    daily_change_p:number, 
    intraday_data: IntradayData[]
    last_week_data: WeeklyData[]
}[] = [
    {
        symbol_name:"BTC-USD",
        exchange_id:"CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol_name:"SOL-USD",
        exchange_id:"CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol_name:"NEAR-USD",
        exchange_id:"CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol_name:"ETH-USD",
        exchange_id:"CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol_name:"BNB-USD",
        exchange_id:"CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol_name:"DOGE-USD",
        exchange_id:"CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol_name:"XRP-USD",
        exchange_id:"CC",
        current_price:0,
        last_price:0,
        daily_change_p: 0,
        intraday_data: [],
        last_week_data: []
    },
    {
        symbol_name:"PYTH-USD",
        exchange_id:"CC",
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
    const [intraday, setIntraday] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const RT_URL = process.env.NEXT_PUBLIC_EOD_RT_URL ?? '';
    const apikey = process.env.NEXT_PUBLIC_EOD_KEY ?? '';
    useEffect(() => {
        if (!intraday) {
            fetchIntradayData(ticker_list, 7);
            setIntraday(true);
        }
        var interval = setInterval(async () => {
            fetchDailyData(ticker_list);
            setRequestState(!requestState);
            console.log("requested");
        }, 6000);
        return () => clearInterval(interval);
        },[refresh, requestState]);
    const handleClick = () => {
        setRefresh(!refresh);
        setIntraday(!intraday);
    }

    return(
        <Card className="w-[100%] h-[100%] flex flex-col bg-[hsl(var(--card))] shadow-lg shadow-[var(--shadow)]">
            <Table className="w-[100%] h-[100%] table-fixed overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Symbol</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">24H %chg</TableHead>
                        <TableHead className="text-center">Last 7 Days</TableHead>
                    </TableRow>
                </TableHeader>
                    {ticker_list[0].current_price > 0 ? (ticker_list.map((data_point) => (
                        <TableBody>
                        <TableRow key={data_point['current_price']} className='h-[73px]'>
                            <TableCell>
                                <span className="text-primary prevent-select darken">{data_point['symbol_name'].split("-")[0]}</span>
                                <span className="text-xs ml-1 prevent-select">/USD</span>
                            </TableCell>
                            
                            <TableCell className="text-right">
                                {data_point.current_price > data_point.last_price? (
                                    <PriceUp price={data_point['current_price']}/>
                                ):(
                                    <PriceDown price={data_point['current_price']}/>
                                )}
                            </TableCell>

                            <TableCell className="text-right">
                                {data_point['daily_change_p'] > 0? (
                                    <span className="text-green-500 inline-grid auto-cols-max grid-flow-col-dense">
                                        <ChevronsUp className="w-4 h-4"/>{data_point['daily_change_p'].toFixed(2)}%
                                    </span>
                                ):(
                                    <span className="text-red-500 inline-grid auto-cols-max grid-flow-col-dense">
                                        <ChevronsDown className="w-4 h-4"/>{data_point['daily_change_p'].toFixed(2)}%
                                    </span>
                                )}
                            </TableCell>

                            <TableCell className="text-left">
                                {data_point['intraday_data'].length > 0 ? (
                                    <IntradayGraph data={data_point.intraday_data}/>
                                ):(
                                    <span><Skeleton className="w-[100%] h-[40px] rounded-s"/></span>
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    )
                    )
                    ):(
                    <TableBody>
                        {ticker_list.map((data_point) => (
                            <TableRow key={data_point['symbol_name']} className="h-[73px]">
                                <TableCell>
                                    <span className="text-primary prevent-select darken">{data_point['symbol_name'].split("-")[0]}</span>
                                    <span className="text-xs ml-1 prevent-select">/USD</span>
                                </TableCell>
                                <TableCell className="text-center"><Skeleton className="w-[100%] h-[20px] rounded-full"/></TableCell>
                                <TableCell className="text-center"><Skeleton className="w-[100%] h-[20px] rounded-full"/></TableCell>
                                <TableCell className="text-center"><Skeleton className="w-[100%] h-[40px] rounded-medium"/></TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                    )}
            </Table>
            <Button className="font-bold" onClick={() => handleClick()}>Refresh</Button>
        </Card>
    )       
}