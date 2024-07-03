import axios from "axios";

export async function fetchDailyData(
    symbols: {symbol:string}[],
    setDailyData: React.Dispatch<React.SetStateAction<never[]>>,
    RT_URL: string,
    apikey: string,
){
    function ticker_body(symbols:{symbol:string}[]) {
        const len = symbols.length;
        var ticker_body = symbols[0].symbol + '?';
        if (len > 1) {
            ticker_body += 's=';
            ticker_body += symbols.slice(1).map((symbol) => symbol.symbol).join(',');
        }
        return ticker_body;
    }

    const response = await axios.get(RT_URL + ticker_body(symbols) + '&api_token=' + apikey + '&fmt=json');
    setDailyData(response.data);
};

export async function fetchIntradayData(symbols: {symbol:string}[]){
    var result: {[key:string]: {name:string, close:number}[]} = {};
    symbols.map(async (symbol) => {
        const to = Math.floor(Date.now()/1000);
        const from = to - 86400 ;
        const response = await axios.get('https://eodhd.com/api/intraday/'+symbol.symbol+'?interval=1h&from='+from+'&to='+to+'&api_token='+process.env.NEXT_PUBLIC_EOD_KEY+'&fmt=json');
        console.log('https://eodhd.com/api/intraday/'+symbol.symbol+'?interval=1h&from='+from+'&to='+to+'&api_token='+process.env.NEXT_PUBLIC_EOD_KEY+'&fmt=json');
        var arr:{name:string, close:number}[] = [];
        response.data.map((item:any) => {
           arr.push({name: item.timestamp.toString(), close: item.close.toFixed(1)});
        });
        result[symbol.symbol] = arr;
    });
    return result;
}