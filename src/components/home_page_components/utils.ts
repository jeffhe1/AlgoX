import axios from "axios";
import { IntradayData, WeeklyData } from "../../lib/custom_interfaces";
const DAY_MS = 86400;
function timeConverter(UNIX_timestamp : number){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + '-' + month + '-' + year;
    return time;
}
export async function fetchDailyData(
    symbols: {
        "symbol_name": string,
        "exchange_id": string,
        "current_price": number,
        "last_price": number,
        "daily_change_p": number,
        "intraday_data": IntradayData[],
        "last_week_data": WeeklyData[],
    }[],
){
    function ticker_body(symbols:{symbol_name:string, exchange_id:string}[]) {
        const len = symbols.length;
        var ticker_body = symbols[0].symbol_name + '.' + symbols[0].exchange_id + '?';
        if (len > 1) {
            ticker_body += 's=';
            ticker_body += symbols.slice(1).map((symbol) => symbol.symbol_name + '.' + symbol.exchange_id).join(',');
        }
        return ticker_body;
    }
    const url = "https://eodhd.com/api/real-time/" + ticker_body(symbols) + '&api_token=' + process.env.NEXT_PUBLIC_EOD_KEY+ '&fmt=json';
    const response = await axios.get(url);
    const data = response?.data;
    if (data.length > 0){
        for (let i=0; i < symbols.length; i++) {
            symbols[i].last_price = symbols[i].current_price;
            symbols[i].current_price = data[i]['close'];
            symbols[i].daily_change_p = data[i]['change_p'];
        }
    }else{
        symbols[0].last_price = symbols[0].current_price;
        symbols[0].current_price = data['close'];
        symbols[0].daily_change_p = data['change_p'];
    }
    return;
};

export async function fetchIntradayData(
    symbols: {
        "symbol_name": string,
        "exchange_id": string,
        "current_price": number,
        "last_price": number,
        "daily_change_p": number,
        "intraday_data": IntradayData[],
        "last_week_data": WeeklyData[],
    }[],
    day_offset:number
){
    symbols.map(async (symbol) => {
        const ticker = symbol.symbol_name +'.'+ symbol.exchange_id;
        const to = Math.floor(Date.now()/1000);
        const from = to - day_offset*DAY_MS ;
        const url = 'https://eodhd.com/api/intraday/'+ticker+'?interval=1h&from='+from+'&to='+to+'&api_token='+process.env.NEXT_PUBLIC_EOD_KEY+'&fmt=json'
        const response = await axios.get(url);
        const data = response.data;
        symbol.intraday_data = data;
    });
}

export async function fetchWeeklyData(
    symbols:{
        "symbol_name": string,
        "exchange_id": string,
        "current_price": number,
        "last_price": number,
        "daily_change_p": number,
        "intraday_data": IntradayData[],
        "last_week_data": WeeklyData[],
    }[],
    day_offset:number
){
    symbols.map(async (symbol) => {
        const ticker = symbol.symbol_name + symbol.exchange_id;
        const to = Math.floor(Date.now()/1000); // To date in unix
        const to_date = timeConverter(to); // dd-mm-yyyy
        const from = to - day_offset*DAY_MS; // From date in unix
        const from_date = timeConverter(from); // dd-mm-yyyy
        const url = 'https://eodhd.com/api/eod/'+ticker+'?interval=d&from='+from_date+'&to='+to_date+'&api_token='+process.env.NEXT_PUBLIC_EOD_KEY+'&fmt=json';
        const response = await axios.get(url);
        const data = response.data;
        symbol.last_week_data = data;
    })
    return;
}