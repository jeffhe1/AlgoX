"use client";
import { Navbar } from '@/components/Navbar';
import './styles.css';
import '../../components/custom_animations.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apikey = process.env.API_KEY;

export default function Homepage() {

    const [Ticker, setTicker] = useState("");
    const [data, setData] = useState(null);
    const [url, seturl] = useState("");
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        seturl('https://api.polygon.io/v2/aggs/ticker/'+Ticker+'/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=adwOSvN5pUhv4tRun5FnAFQGjIYbJrs_');
        console.log(url);
        console.log(Ticker);
       try { const fetchData = async () => {
            const response = await axios.get(url)
            setData(response.data.results[1].c);
        };
        fetchData();}
        catch(err) {
            console.log(err);
            setData(null);
        }
    }
    
;    useEffect(() => {
        
    }, []);

    return (
        <section>
            <section className="flex items-center justify-center bg-background h-[100vh]">
                <div className="flex-row justify-center place-items-start gap-5">
                    <h1 className="font-bold text-9xl fade-in-image prevent-select darken">Hello</h1>

                    <div className="font-bold fade-in-image"> 
                        <form onSubmit={handleSubmit}>
                            <label>Ticker:
                                <input type='text' value={Ticker} onChange={(e) => setTicker(e.target.value)}/>
                                <button>
                                    <input type="submit" value="Submit" className="cursor-pointer"/>
                                </button>
                                
                            </label>
                        </form>
                    </div>
                    {data ? (
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    ):(
                        <p>Loading...</p>
                    )}
                </div>
            </section>
        </section> 
    )
}