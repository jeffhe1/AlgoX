import { NextResponse } from "next/server";
import prisma from '@/lib/db';
export async function POST(request: Request){
    const data = await request.json();
    await prisma.user.update({
        where: data.where,
        data: data.data
    })
    return NextResponse.json({
        data
    })
}
export async function GET(){
    
}