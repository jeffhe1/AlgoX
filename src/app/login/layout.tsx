

export default function LoginLayout( {
    children,
}: Readonly<{
    children: React.ReactNode;
}>) { 
    return ( 
            <main className="bg-background h-[100vh] flex justify-center">
                {children} 
            </main>
    )
}