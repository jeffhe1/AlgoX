"use client";
import './styles.css';
import '../../components/custom_animations.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import StockDisplayTable from '@/components/home_page_components/stock_display_table';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import DemoPortfolioDistribution from '@/components/home_page_components/demo_portfolio_tracker';
import DemoPerformanceTracker from '@/components/home_page_components/demo_performance_tracker';
import SupportTable from '@/components/home_page_components/support_table';


export default async function Homepage() {

    return (
        <section>
            <section className="bg-background h-[60vh]">
                <div className="container lg:pt-15 flex flex-row items-center justify-between gap-10 mt-10">
                    <div className='h-[50%] w-[45%] fade-in-image'>
                        <h1 className="font-bold text-9xl prevent-select darken content-center text-primary">POWER</h1>
                        <p className="text-5xl prevent-select">Your portfolio with the technology of <span className='text-primary prevent-select darken'>AI</span></p>
                    </div>
                    <div className="h-[100%] w-[55%] fade-in-image">
                        <StockDisplayTable/>
                    </div>
                    
                </div>
            </section>
            <section className="bg-background h-[70vh]">
                <div className='container mt-10 fade-in-image'>
                    <h1 className="text-5xl prevent-select fade-in-image">
                        <span className="text-primary darken">Simple and Powerful </span> 
                    </h1>
                    <h1 className="text-5xl prevent-select fade-in-image">
                        Portfolio Management and Analytics
                    </h1>
                    <p className="text-xl">Track your investments and make informed decisions with our analytic feed</p>
                </div>
                <div className="flex mt-20 fade-in-image container justify-between">
                    <DemoPortfolioDistribution/>
                    <DemoPerformanceTracker/>
                </div>
            </section>

            <section className='bg-background h-[50vh]'>
                <div className='container mt-10 fade-in-image text-right'>
                    <h1 className="text-5xl prevent-select fade-in-image">
                        <span className="text-primary darken">Track All</span>
                    </h1>
                    <h1 className="text-5xl prevent-select fade-in-image">
                        Your investments in one place
                    </h1>
                    <p className="text-xl">We support tracking cryptocurrencies, stocks, forex, and more</p>
                </div>
                <div className="flex mt-20 fade-in-image container justify-between">
                    <SupportTable/>
                </div>
            </section>

            <section className='bg-background h-[50vh]'>
                <div className='container mt-10 fade-in-image'>
                    <h1 className="text-5xl prevent-select fade-in-image">
                        <span className="text-primary darken">Create and Build</span>
                    </h1>
                    <h1 className="text-5xl prevent-select fade-in-image">
                        Your Portfolio from Scratch
                    </h1>
                    <p className="text-xl">With our interactive portfolio builder, optimize your portfolio for success</p>
                </div>
            </section>
        </section>
    )
}