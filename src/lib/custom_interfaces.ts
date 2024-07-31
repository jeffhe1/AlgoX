export interface IntradayData {
    "timestamp": number,
    "gmtoffset": number,
    "datetime": string,
    "open": number,
    "high": number,
    "low": number,
    "close": number,
    "volume": number
}

export interface WeeklyData{
    "date":string,
    "open":number,
    "high":number,
    "low":number,
    "close":number,
    "adjusted_close":number,
    "volumne":number,
}

export interface TickerList{
    "symbol_name": string,
    "exchange_id": string,
    "current_price": number,
    "last_price": number,
    "daily_change_p": number,
    "intraday_data": IntradayData[],
    "last_week_data": WeeklyData[],
}