"use client";
import './styles.css';
import '../../components/custom_animations.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import StockDisplayTable from '@/components/home_page_components/stock_display_table';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';


export default async function Homepage() {

    return (
        <section className="bg-background h-[100vh]">
            <div className="container lg:pt-15 flex flex-row items-center justify-between gap-10">
                <div className='h-[50vh] w-[50vw]'>
                    <h1 className="font-bold text-9xl fade-in-image prevent-select darken content-center">Hello</h1>
                </div>
                
                <StockDisplayTable/>

            </div>
        </section>

    )
}