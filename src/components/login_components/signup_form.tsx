"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signup } from "@/app/login/actions";
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
import { ArrowLeft, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";


const signupformSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters long"
    }),
    email: z.string().email(),
    password: z.string().min(8,{
        message: "Password must be at least 8 characters long"
    }),
    confirmPassword: z.string().min(8),
    isVerified: z.boolean().optional(),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ['confirmPassword']
        });
    };
})


export default function SignupForm(){

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordType, setPasswordType ] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType ] = useState("password");
    const [response, setResponse] = useState(true);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        setPasswordType(showPassword ? "password" : "text");
    };
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
        setConfirmPasswordType(showConfirmPassword ? "password" : "text");
    };
    const form = useForm<z.infer<typeof signupformSchema>>({
        resolver: zodResolver(signupformSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: z.infer<typeof signupformSchema>) => {
        const validatePassword = data.password === data.confirmPassword;
        if(!validatePassword){
            return
        }
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        setLoading(true);
        setResponse(await signup(formData));
        setLoading(false);
        return
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Your Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Your Email" {...field} />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field})=>(
                        <FormItem>
                            <div className="flex gap-2">
                                <FormLabel>Password</FormLabel>
                                {showPassword ? 
                                    <Eye className="h-4 w-4 cursor-pointer" onClick={toggleShowPassword}/> 
                                : 
                                    <EyeOff className=" h-4 w-4 cursor-pointer" onClick={toggleShowPassword}/>
                                } 
                            </div>
                            <FormControl>
                                <Input type={passwordType} placeholder="Enter Your Password" {...field}/> 
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field})=>(
                        <FormItem>
                            <div className="flex gap-2">
                                <FormLabel>Confirm Password</FormLabel>
                                {showConfirmPassword ? 
                                    <Eye className="h-4 w-4 cursor-pointer" onClick={toggleShowConfirmPassword}/> 
                                    : 
                                    <EyeOff className=" h-4 w-4 cursor-pointer" onClick={toggleShowConfirmPassword}/>
                                } 
                            </div>
                            <FormControl>
                                    <Input type={confirmPasswordType} placeholder="Confirm Your Password" {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!response?(
                    <div className="grid grid-rows-2">
                        <p className="text-red-900 text-sm">Email already exists</p>
                        <a href='/login' className="grid auto-cols-max grid-flow-col-dense hover:underline">
                            <p className="flex justify-center">Go back to login?</p>
                        </a>
                    </div>
                    
                ):<p></p>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
                </Button>
                <Link href='/login'>
                    <Button variant='ghost' className="w-full my-3">
                        <ArrowLeft/>Back to Login
                    </Button>
                </Link>
                
            </form>
        </Form>
    )
}