import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react";
import prisma from "@/lib/db";
import { all } from "axios";
import { createPortfolio } from "./action";
import { useRouter } from "next/router";

const CreatePortfolioFormSchema = z.object({
    name : z.string().min(1, {
        message: "Name is required",
    }).max(20, {
        message: "Name must be less than 20 characters",
    }),
    fiat_reserve: z.string().min(2, {
        message: "Your initial fiat deposit must be at least 10 $USD",
    })
})

export default function CreatePortfolioForm({userID, setIsCreatePortfolioOpen}:{
    userID : string,
    setIsCreatePortfolioOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const CreatePortfolioForm = useForm<z.infer<typeof CreatePortfolioFormSchema>>({
        resolver: zodResolver(CreatePortfolioFormSchema),
        defaultValues: {
            name: '',
            fiat_reserve: '',
        }
    });

    async function onSubmit(data: z.infer<typeof CreatePortfolioFormSchema>) {
        setIsCreatePortfolioOpen(false);
        const portfolioData = new FormData();
        portfolioData.append('name', data.name);
        portfolioData.append('fiat_reserve', data.fiat_reserve);
        await createPortfolio(userID, portfolioData);
    }
    
    var length = useRef(0);
    return(
        <Form {...CreatePortfolioForm}>
            <form onSubmit={CreatePortfolioForm.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={CreatePortfolioForm.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Portfolio Name</FormLabel>
                            <FormControl>
                                <Input 
                                type="text" 
                                {...field}
                                placeholder="Enter portfolio name"
                                onInput={(e) => {length.current = (e.target as HTMLInputElement)?.value.length}}
                                />
                            </FormControl>
                            <FormDescription>
                                {length.current}/20 characters long
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={CreatePortfolioForm.control}
                    name="fiat_reserve"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Total Capital <span className="text-primary ml-5 text-sm">$USD</span></FormLabel>
                            <FormControl>
                                <Input 
                                type='text' 
                                {...field}
                                placeholder="Enter initial deposit"
                                />
                            </FormControl>
                            <FormDescription>
                                Minimum of 10 $USD
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>                
            </form>
        </Form>
    )
}