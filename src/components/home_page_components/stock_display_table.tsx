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
import { Button } from "../ui/button";
import { fetchDailyData, fetchIntradayData } from "./utils";

const ticker_list:{symbol:string}[] = [
    {
        symbol:"BTC-USD.CC"
    },
    {
        symbol:"SOL-USD.CC"
    },
    {
        symbol:"NEAR-USD.CC"
    },
];
  
export default function StockDisplayTable() {
    const [data, setData] = useState([]);
    const [intradaydata, setIntradaydata] = useState<{[key: string]: any}>({});
    const [refresh, setRefresh] = useState(false);
    const RT_URL = process.env.NEXT_PUBLIC_EOD_RT_URL ?? '';
    const apikey = process.env.NEXT_PUBLIC_EOD_KEY ?? '';
    useEffect(() => {
        try {
            const hashmap = fetchIntradayData(ticker_list); 
            hashmap.then((response) => 
                setIntradaydata(response)
            );
        }catch(e) {
            console.log(e);
        }

        var interval = setInterval(() => {
            fetchDailyData(ticker_list, setData, RT_URL, apikey);
            console.log("requested");
        }, 6000);

        return () => clearInterval(interval);
        },[refresh]);
    
    return(
        <div className="w-[1000px] h-[850px] items-center pt-20">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Symbol</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">24H%</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((data_point) => (
                        <TableRow key={data_point['code']}>
                            <TableCell>{data_point['code'].replace('.US','').replace('.CC','')}</TableCell>
                            <TableCell className="text-right">{data_point['close'].toFixed(2)}</TableCell>
                            {data_point['change_p'] > 0? (
                                <TableCell className="text-right text-green-800">
                                    {data_point['change_p'].toFixed(2) +"%"}
                                </TableCell>
                            ):(
                                <TableCell className="text-right text-red-800">{data_point['change_p'].toFixed(2) + "%"}</TableCell>
                            )}
                            
                        </TableRow>
                    ))

                    }
                </TableBody>
            </Table>
        
            <Button className="font-bold" onClick={() => setRefresh(!refresh)}>Refresh</Button>
        </div>
        
    )
        
}