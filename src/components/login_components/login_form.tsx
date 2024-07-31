"use client" 
import { login } from "@/app/login/actions";
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
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const loginformSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{
        message: "Password must be at least 8 characters long"
    }),
})

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(true);

    const loginForm = useForm<z.infer<typeof loginformSchema>>({
        resolver: zodResolver(loginformSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    async function onSubmit(data: z.infer<typeof loginformSchema>) {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        setLoading(true);
        const resp = await login(formData);
        if (resp === false) {
            setResponse(resp);
        }
        setLoading(false);
        return
    }


    return(
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={loginForm.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                type="email" {...field} 
                                placeholder="Enter your email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={loginForm.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                    type="password" {...field} 
                                    placeholder="Enter your password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!response?(
                    <p className="text-red-900 text-sm">Email or password incorrect pleasse try again</p>
                ):<p></p>}
                <Button type="submit" className="w-full">
                    {loading? (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    ):null}
                    Login
                </Button>
                
            </form>
        </Form>
    )
}