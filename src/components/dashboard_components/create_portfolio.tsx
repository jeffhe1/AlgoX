"use client";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight} from "lucide-react";
import { useState } from "react";
import HoldingsForm from "./holdings_form";
import prisma from "@/lib/db";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { updateDatabase } from "@/app/api/prisma/update_database";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


const formSchema = z.object({
    portfolio_name: z.string().nonempty("Portfolio name is required!"),
})

export default function CreatePortfolio() {
    const [step, setStep] = useState(1);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            portfolio_name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
    }

    if (step === 1) {      
        return(
            <div className="round-box w-[1000px] h-[1000px] flex items-center justify-center">
                <div className="grid grid-rows-2 gap-5 content-center fade-in-image">
                    <h1 className="font-bold text-5xl">Create Your First Portfolio</h1>
                    <div className="flex justify-center items-center">
                        <Button className="w-[200px] text-2xl" onClick={() => {setStep(2)}}>
                            Create
                        </Button>
                    </div>
                    
                </div>
            </div>
            
        )
    }
    else if (step === 2 ) {
        return (
            <div className="round-box w-[1000px] h-[1000px] ">
                <Button variant='ghost' className="w-[80px]" onClick={() => {setStep(step-1)}}>
                    <ArrowLeft/>
                    Back
                </Button>
                <div className="container flex justify-center fade-in-image">
                    <h1 className="font-bold text-5xl">
                        Give your portfolio a name!
                    </h1>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="portfolio_name"
                            render = {({field})=>(
                                <FormItem>
                                    <FormLabel>Portfolio Name</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                        Enter a name for your portfolio
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                            <Button type="submit">
                                Continue
                                <ArrowRight/>
                            </Button>
                    </form>
                </Form>
                
            </div>
        )
    }
    
    return (
        <div className="round-box w-[1000px] h-[1000px]">
            <div className="flex content-center border-b fade-in-image pb-5 items-center" style = {{borderColor: "white"}}>
                <Button variant='ghost' className="w-[80px]" onClick={() => {setStep(1)}}>
                    <ArrowLeft/>
                    Back
                </Button>
                <h1 className="font-bold text-5xl prevent-select">
                    Enter Your Holdings
                </h1>
            </div>
            <h1>
                holding 1:
            </h1>
            
        </div>
    )
}