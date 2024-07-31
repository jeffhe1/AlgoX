import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Loader, LoaderPinwheel, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { symbol } from "zod";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { TickerList } from "@/lib/custom_interfaces";
import { fetchDailyData } from "@/components/home_page_components/utils";
import PercentUp from "@/components/ui/percup";
import { PercentDown } from "@/components/ui/percdown";
import PriceDown from "@/components/ui/pricedown";
import PriceUp from "@/components/ui/priceup";
import { Skeleton } from "@/components/ui/skeleton";

export function find_avg_price(symbol: string, holdings: {
    updateAt: Date, 
    symbol: string
    amount: number, 
    price: number,
    current_price: number,
    portfolioId: string
}[]) {
    let total = 0;
    let count = 0;
    holdings.map((position) => {
        position.symbol === symbol ? (total += position.price * position.amount, count+= position.amount) : null;
    })
    return total / count;
}

export function get_symbol_list(holdings:{
    updateAt: Date, 
    symbol: string|null,
    amount: number|null, 
    price: number|null,
    current_price: number|null,
    portfolioId: string|null
}[]){
    let symbol_list: string[] = [];
    holdings.map((position) => {
        if (position.symbol == null){return;}
        if(!symbol_list.includes(position.symbol)){
           symbol_list.push(position.symbol); 
        }    
    })
    return symbol_list;
}

export function find_total_quantity(symbol: string, holdings: {
    updateAt: Date, 
    symbol: string
    amount: number, 
    price: number,
    current_price: number,
    portfolioId: string
}[]) {
    let total = 0;
    holdings.map((position) => {
        position.symbol === symbol ? (total += position.amount) : null;
    })
    return total;
}


export function create_table_data(symbol_list: string[], holdings: {
    updateAt: Date, 
    symbol: string
    amount: number, 
    price: number,
    current_price: number,
    portfolioId: string
}[]){
    let table_data: {
        symbol: string, 
        last_price:number,
        current_price:number, 
        daily_change_p: number,
        avg_price: number, 
        total_quantity: number, 
        position_total_value: number
        pnl: number,
        position_change_p: number,
        position_pnl_daily: number,
    }[] = [];
    symbol_list.map((symbol_name) => {
        table_data.push({
            symbol: symbol_name,
            last_price:0,
            current_price: 0,
            daily_change_p: 0,
            avg_price: find_avg_price(symbol_name, holdings),
            total_quantity: find_total_quantity(symbol_name, holdings),
            position_total_value: 0,
            pnl: 0,
            position_change_p: 0,
            position_pnl_daily:0,
        })
    })
    return table_data;
}

export function construct_ticker_list(symbol_list: string[]){
    let ticker_list: TickerList[] = [];
    symbol_list.map((symbol) => {
        const symbol_name = symbol.split(".")[0];
        const exchange_id = symbol.split(".")[1];
        ticker_list.push({
            symbol_name: symbol_name,
            exchange_id: exchange_id,
            current_price:0,
            last_price:0,
            daily_change_p: 0,
            intraday_data: [],
            last_week_data: []
        })
    })
    return ticker_list;
}

export function get_tlv(table_data: {
    symbol: string, 
    last_price:number,
    current_price:number, 
    daily_change_p: number,
    avg_price: number, 
    total_quantity: number, 
    position_total_value: number
    pnl: number,
    position_change_p: number,
    position_pnl_daily: number,
}[] ){
    return table_data.reduce((acc, curr) => acc + curr.position_total_value, 0)
}

export default function HoldingsTable({holdings, setTLV, setChartData}:{
    holdings: {
        updateAt: Date, 
        symbol: string
        amount: number, 
        price: number,
        current_price: number,
        portfolioId: string
    }[],
    setTLV: React.Dispatch<React.SetStateAction<number>>,
    setChartData: React.Dispatch<React.SetStateAction<{
        symbol: string, 
        last_price:number,
        current_price:number, 
        daily_change_p: number,
        avg_price: number, 
        total_quantity: number, 
        position_total_value: number
        pnl: number,
        position_change_p: number,
        position_pnl_daily: number,
    }[]>>
}) {
    const num_holdings:number = holdings.length;
    const symbol_list = get_symbol_list(holdings);
    var ticker_list = construct_ticker_list(symbol_list);
    var data = create_table_data(symbol_list, holdings);

    const [refresh, setRefresh] = useState(false);
    var [table_data, setTableData] = useState(data);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTableData([])
        const fetch_data = async () => {
            if (num_holdings > 0 ){
                await fetchDailyData(ticker_list);
                data.map((position) => {
                    position.last_price = ticker_list?.find((ticker) => ticker.symbol_name+"."+ticker.exchange_id === position.symbol)?.last_price??0;
                    position.current_price = ticker_list?.find((ticker) => ticker.symbol_name+"."+ticker.exchange_id === position.symbol)?.current_price??0;
                    position.daily_change_p = ticker_list?.find((ticker) => ticker.symbol_name+"."+ticker.exchange_id === position.symbol)?.daily_change_p??0;
                    position.position_total_value = position.current_price * position.total_quantity;
                    position.pnl= position.position_total_value - position.avg_price * position.total_quantity;
                    position.position_change_p = position.pnl / (position.avg_price * position.total_quantity) * 100;
                    position.position_pnl_daily = position.pnl * (1 - 1/(1 + (position.daily_change_p/100)));
                })
                setTLV(get_tlv(data));
                setTableData(data);
            }else {
                setTLV(0);
            };
        }
        fetch_data();
        var interval = setInterval(async () => {
            setLoading(true);
            await fetch_data();
            setLoading(false);
        }, 12000);
        return () => clearInterval(interval);
        },[refresh, num_holdings]);
    table_data.sort((a, b) => b.position_total_value - a.position_total_value);
    setChartData(table_data);
    

    return (
        <div className="w-[100%]">
            
        {holdings.length > 0 ? (
        <>
            <div className="flex justify-end px-3 py-2">
                <RefreshCw 
                className=" w-[20px] h-[20px] cursor-pointer hover:scale-110 hover:rotate-180 duration-500 transition-all ease-in-out " 
                onClick={() => {setRefresh(!refresh)}
                }/>
            </div>
            <Table className="w-[100%] h-[100%] table-fixed overflow-hidden z-0">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Instrument</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-center">24H %chg</TableHead>
                        <TableHead className="text-right">Avg. Buy Price ($)</TableHead>
                        <TableHead className="text-center">Qty.</TableHead>
                        <TableHead className="text-right">Position Total Value ($)</TableHead>
                        <TableHead className="text-right">Position PnL</TableHead>
                        <TableHead className="text-right">PnL %</TableHead>
                        <TableHead className="text-right">Daily PnL</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
            {!(table_data.find((position) => position.current_price===0))? (
                <>
                    {table_data.map((position) => (
                        <TableRow key={position.symbol} className="h-[73px]">
                            <TableCell id="instrument">
                                <span className="text-primary prevent-select darken">{position.symbol.split('-')[0].split('.')[0]}</span>
                            </TableCell>
                            <TableCell id="price" className="text-right">
                                {position.current_price > position.last_price ? (
                                    <PriceUp price={position.current_price}/>
                                ):(
                                    <PriceDown  price={position.current_price}/>
                                )}
                            </TableCell>
                            <TableCell id="24H %chg" className="text-center">
                                {(position.daily_change_p)>0?(
                                    <span className="text-green-500 inline-grid auto-cols-max grid-flow-col-dense">
                                        <ChevronUp className="w-4 h-4"/>{position.daily_change_p.toFixed(2)}%
                                    </span>
                                ):(
                                    <span className="text-red-500 inline-grid auto-cols-max grid-flow-col-dense">
                                        <ChevronDown className="w-4 h-4"/>{position.daily_change_p.toFixed(2)}%
                                    </span>
                                )}
                            </TableCell>
                            <TableCell id="Avg.Buy Price" className="text-right">
                                {position.avg_price.toFixed(2)}
                            </TableCell>
                            <TableCell id="Qty." className="text-center">
                                {position.total_quantity}
                            </TableCell>
                            <TableCell id="Total Value" className="text-right">
                                {(position.position_total_value).toFixed(2)}
                            </TableCell>
                            <TableCell id="PNL" className="text-right">
                                {(position.pnl) > 0 ? (
                                    <span className="text-green-500">+{(position.pnl).toFixed(2)}</span>
                                ):(
                                    <span className="text-red-500">{(position.pnl).toFixed(2)}</span>
                                )}
                            </TableCell>
                            <TableCell id="PnL %" className="text-right">
                                {position.position_change_p > 0 ? (
                                    <span className="text-green-500 inline-grid auto-cols-max grid-flow-col-dense">
                                        <ChevronUp className="w-4 h-4"/>{position.position_change_p.toFixed(2)}%
                                    </span>
                                ):(
                                    <span className="text-red-500 inline-grid auto-cols-max grid-flow-col-dense">
                                        <div>
                                            
                                        </div>
                                        <ChevronDown className="w-4 h-4"/>{position.position_change_p.toFixed(2)}%
                                    </span>
                                )}
                            </TableCell>
                            <TableCell id="Daily PnL" className="text-right">
                                {position.position_pnl_daily > 0 ? (
                                    <span className="text-green-500">+{(position.position_pnl_daily).toFixed(2)}</span>
                                ):(
                                    <span className="text-red-500">{(position.position_pnl_daily).toFixed(2)}</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))
                    }
                </>
            ):(
                <>
                    {table_data.map((position) => (
                        <TableRow key={position.symbol} className="h-[73px]">
                            <TableCell id="instrument">
                                <span className="text-primary prevent-select darken">{position.symbol.split('-')[0].split('.')[0]}</span>
                            </TableCell>
                            <TableCell id="price" className="text-right">
                                <Skeleton className="w-[100%] h-[20px] rounded-s"/>
                            </TableCell>
                            <TableCell id="24H %chg" className="text-center">
                                <Skeleton className="w-[100%] h-[20px] rounded-full"/>
                            </TableCell>
                            <TableCell id="Avg.Buy Price" className="text-right">
                                {position.avg_price.toFixed(2)}
                            </TableCell>
                            <TableCell id="Qty." className="text-center">
                                {position.total_quantity}
                            </TableCell>
                            <TableCell id="Total Value" className="text-right">
                                <Skeleton className="w-[100%] h-[20px] rounded-s"/>
                            </TableCell>
                            <TableCell id="PNL" className="text-right">
                                <Skeleton className="w-[100%] h-[20px] rounded-s"/>
                            </TableCell>
                            <TableCell id="PnL %" className="text-right">
                                <Skeleton className="w-[100%] h-[20px] rounded-s"/>
                            </TableCell>
                            <TableCell id="Daily PnL" className="text-right">
                                <Skeleton className="w-[100%] h-[20px] rounded-s"/>
                            </TableCell>
                        </TableRow>
                    ))}
                </>
            )}
                    
                </TableBody>
            </Table>
        </>
        ):null}
        </div>

    )
}