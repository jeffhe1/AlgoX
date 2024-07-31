"use client";
import { useEffect, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../ui/collapsible";
import { ArrowLeft, ChevronDown, ChevronsUpDown, Ellipsis, LoaderCircle, Plus, Router, Trash, X } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HoldingsTable from "./portfolio_components/holdings_table";
import Link from "next/link";
import { useRouter } from "next/router";
import "@/components/custom_animations.css";
import AddHoldings from "./portfolio_components/add_holdings";
import { set } from "react-hook-form";
import CreatePortfolioForm from "./portfolio_components/create_portfolio_form";
import { deletetPortfolio, renamePortfolio } from "./portfolio_components/action";
import { Input } from "@/components/ui/input";
import AllocationChart from "./portfolio_components/charts/allocation_chart";

export default function PortfolioLayout({userData}: 
    {userData: 
        {
            id: string,
            profileImage: string | null,
            name: string,
            email: string,
            stripeCustomerId: string | null,
            colorScheme: string        
            portfolios: {
                name: string, 
                id: number,
                fiat_reserve: number,
                holdings: {
                    updateAt: Date, 
                    symbol: string
                    amount: number, 
                    price: number,
                    current_price: number,
                    portfolioId: string
                }[]
            }[]}
    }
){

    const [viewPortfolioID, setViewPortfolioID] = useState((userData.portfolios.length > 0) ? userData.portfolios[0].id : 1);
    const [isOpen, setIsOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [isAddHoldingsCardOpen, setIsAddHoldingsCardOpen] = useState(false);
    const [isCreatePortfolioOpen, setIsCreatePortfolioOpen] = useState(false);
    const [isRename, setIsRename] = useState(false);
    const [num_portfolios, setNumPortfolios] = useState(0);
    const [TLV, setTLV] = useState(0);
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState<{
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
    }[]>([]);

    useEffect(()=> {
        setNumPortfolios(userData.portfolios.length);
    },[isConfirm])

    const portfolios = userData.portfolios;
    const currentPortfolio = portfolios.find((portfolio) => portfolio.id === viewPortfolioID);
    const num_holdings:number = currentPortfolio?.holdings.length??0;
    const capital_reserve:number = currentPortfolio?.fiat_reserve??0;

    const deleteOnConfirm = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const response = await deletetPortfolio(userData.id, Number(currentPortfolio?.id), currentPortfolio?.name as string);
        setIsToolsOpen(false);
        console.log(response);

    }
    
    const handleRenameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const newName = e.target[0].value;
        const response = renamePortfolio(userData.id, Number(currentPortfolio?.id), currentPortfolio?.name as string, newName);
        setLoading(false)
        setIsRename(false);
        setIsToolsOpen(false);
        console.log(response);

    }


    return (
        <div>
            <div className="h-[36px] flex justify-end" style={{zIndex:2}}>
                <Collapsible 
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-[200px]"
                >
                <Card className="flex justify-between px-3 py-2 align-middle">
                    <p className="text-primary content-center">Portfolios</p>
                    <CollapsibleTrigger>
                        <ChevronsUpDown className="h-4 w-4 text-primary pointer-cursor"/>
                    </CollapsibleTrigger>
                </Card>
                    {num_portfolios > 0 ? (
                        <div>
                            {portfolios.map((portfolio) => (
                                <CollapsibleContent key={portfolio.id} className="border bg-background border-t-0 border-b-0 fade-in-image">
                                    <Button variant="ghost" onClick={() => setViewPortfolioID(portfolio.id)} className="w-full flex justify-start">
                                        <p>{portfolio.name}</p>
                                    </Button>
                                </CollapsibleContent>
                            ))}
                        </div>
                    ):null}
                    
                    <CollapsibleContent key={"new"} className="border bg-background border-t-0 fade-in-image">
                        <Button 
                            variant="ghost" 
                            className="w-full flex justify-start"
                            onClick={() => {setIsCreatePortfolioOpen(true); setIsOpen(!isOpen)}}>
                            <span className="text-primary">Add Portfolio</span>
                        </Button>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {isAddHoldingsCardOpen ? (
                    <div className="w-[60vw] h-[90vh] flex justify-center fixed" style={{zIndex:10, animation:"forwards 1s fadeIn"}}>
                        <Card className="h-[700px] w-[600px] bg-background" style={{zIndex:10, position:"fixed"}}>
                            <div className="flex justify-end px-2 py-2">
                                <X className="h-6 w-6 text-primary hover:text-primary/80 cursor-pointer" onClick={() => setIsAddHoldingsCardOpen(false)}/>
                            </div>
                            <CardTitle className="text-center">Add Holdings</CardTitle>
                            <CardContent>
                                <AddHoldings userID={userData.id} portfolioId={Number(currentPortfolio?.id)} setIsAddHoldingsCardOpen={setIsAddHoldingsCardOpen}/>
                            </CardContent>
                        </Card>
                    </div>
            ):null}

            {isCreatePortfolioOpen ? (
                <div className="w-[60vw] h-[90vh] flex justify-center fixed" style={{zIndex:10, animation:"forwards 1s fadeIn"}}>
                 <Card className="h-[700px] w-[600px]" style={{zIndex:10, position:"fixed"}}>
                     <div className="flex justify-end px-2 py-2">
                             <X className="h-6 w-6 text-primary hover:text-primary/80 cursor-pointer" onClick={() => setIsCreatePortfolioOpen(false)}/>
                     </div>
                     <CardTitle className="text-center">Create Portfolio</CardTitle>
                     <CardContent>
                         <CreatePortfolioForm userID={userData.id} setIsCreatePortfolioOpen={setIsCreatePortfolioOpen}/>
                     </CardContent>
                 </Card>
             </div>
            ):null}

            

            {num_portfolios > 0 ? (
                <div>
                    <div className="flex flex-cols z-10"> 
                        
                        <h1 className="text-primary font-bold text-5xl text-start px-3 py-2">{!loading? (
                            <>
                                {currentPortfolio?.name}
                            </>
                        ):(
                            <LoaderCircle className="w-8 h-8 animate-spin"/>
                        )}</h1>
                        <Button 
                            variant="ghost" 
                            className="block my-auto relative cursor-pointer" 
                            onClick={() => {setIsToolsOpen(!isToolsOpen); setIsConfirm(false); setIsRename(false)}}>
                            <Ellipsis />
                        </Button>
                        {isToolsOpen ? (
                            <>
                            {isConfirm ? (
                            <>
                                <Button 
                                    variant="ghost"
                                    className="my-auto relative cursor-pointer"
                                    style={{animation:"forwards 2s fadeIn"}}
                                    onClick={() => setIsConfirm(!isConfirm)}
                                >
                                    <ArrowLeft/>
                                </Button>
                                <Button 
                                    className="my-auto relative cursor-pointer bg-red-500"
                                    style={{animation:"forwards 3s fadeIn"}}
                                    onClick={(e) => deleteOnConfirm(e)}
                                >
                                    Confirm
                                </Button>
                            </>
                            ):(
                            <>
                                <Button variant="ghost" 
                                className="my-auto relative cursor-pointer hover:bg-primary"
                                style={{animation:"forwards 1s fadeIn"}}
                                onClick={()=> setIsConfirm(!isConfirm)}
                                >
                                Delete
                                </Button>
                                <Button variant="ghost"
                                    className="my-auto relative cursor-pointer hover:bg-primary"
                                    style={{animation:"forwards 2s fadeIn"}}
                                    onClick={() => setIsRename(!isRename)}
                                >
                                    Rename
                                </Button>
                                {isRename ? (
                                    <>
                                    <form 
                                    className="inline-grid auto-cols-max grid-flow-col-dense"
                                    onSubmit={(e) => handleRenameSubmit(e)}
                                    >
                                    <Input
                                        className="w-[300px] my-auto relative cursor-text mx-2"
                                        placeholder="Type in new name..."
                                        style={{animation:"forwards 1s fadeIn"}}
                                    />
                                    <Button 
                                        type='submit'
                                        variant="ghost" 
                                        className="my-auto relative cursor-pointer hover:bg-primary" 
                                        style={{animation:"forwards 5s fadeIn"}}>
                                        Submit
                                    </Button>
                                    </form>
                                    </>
                                ):null}
                            </>
                            )}
                            
                            </>
                        ):null}
                        
                    </div>
                    
                    <h2 className="text-2xl text-start px-3 font-bold">Total Liquidation Value: <span className="text-primary">${(TLV + capital_reserve).toFixed(2)}</span></h2>
                    
                {num_holdings > 0 ? (
                    <div className="py-5 inline-grid auto-cols-max grid-flow-col-dense">
                        <div className="w-[100%] flex justify-center mx-2 px-10">
                            <AllocationChart chartData={chartData}/>
                        </div>
                        
                        <div className="w-[100%] flex justify-center">
                            <Card className="h-[30vh] aspect-video content-center">
                                <CardTitle className="flex justify-center"> Chart 2 placeholder </CardTitle>
                            </Card>
                        </div>
                    </div>
                ):null}
                    
                <div className="w-[100%] pt-2 border-t-medium">
                    
                    <h1 className="text-primary text-3xl py-2 px-3">Holdings</h1>
                    <HoldingsTable holdings={currentPortfolio?.holdings??[]} setTLV={setTLV} setChartData={setChartData}/>
                    <div className="px-3 py-2">
                        <Button
                            onClick={()=>setIsAddHoldingsCardOpen(true)}
                            >Add Holdings <Plus/></Button>
                    </div>
                </div> 
            </div>
            ):(
            <div className="w-[100%] flex justify-center">
                <div className="h-[500px] aspect-square flex justify-center content-center flex-col">
                    <div style={{zIndex:1}}>
                        <h1 className="text-3xl text-center">Create your first Portfolio</h1>
                        <div className="w-[100%] flex justify-center py-10">
                            <Button 
                                variant="ghost" 
                                className="w-[150px] text-primary" 
                                onClick={() => {setIsCreatePortfolioOpen(true); setIsOpen(!isOpen)}}>
                                    <Plus className="w-4 h-4"/>Add Portfolio
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            )}
           
        </div>
    )
}