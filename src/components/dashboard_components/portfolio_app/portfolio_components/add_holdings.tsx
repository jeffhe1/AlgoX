import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, z, ZodNumber } from "zod";
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
import { addHoldings } from "./action";
import { useRouter } from "next/router";


const AddHoldingsFormSchema = z.object({
    symbol: z.string().min(1,{
        message: "Symbol is required",
    }),
    amount: z.string().min(1,{
        message: "Amount is required",
    }),
    price: z.string().min(1,{
        message: "Price is required",
    }),
})

export default function AddHoldings({userID, portfolioId, setIsAddHoldingsCardOpen}:{
    userID: string,
    portfolioId: ZodNumber | number,
    setIsAddHoldingsCardOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const form = useForm<z.infer<typeof AddHoldingsFormSchema>>({
        resolver: zodResolver(AddHoldingsFormSchema),
        defaultValues: {
            symbol: '',
            amount: '',
            price: '',
        }
    });
    async function handleSubmit(data: z.infer<typeof AddHoldingsFormSchema>) {
        setIsAddHoldingsCardOpen(false);
        const holdingsData = new FormData();
        holdingsData.append('symbol', data.symbol);
        holdingsData.append('amount', data.amount);
        holdingsData.append('price', data.price);
        await addHoldings(userID, Number(portfolioId), holdingsData);
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="symbol"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Symbol</FormLabel>
                            <FormControl>
                                <Input 
                                type="text" 
                                {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                The symbol of the asset
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input 
                                type="text" 
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input 
                                type="text" 
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    Add
                </Button>
            </form>
        </Form>
    )
}