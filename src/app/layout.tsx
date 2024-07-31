import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import "./styles.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Navbar } from "@/components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlgoX",
  description: "AlgoX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/ax.ico"></link>
        <script src="https://accounts.google.com/gsi/client" async></script>
      </head>
      <UserProvider>
        <body className={inter.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
         
          {children}
      </ThemeProvider>
      </body>
      </UserProvider>
      
    </html>
  );
}
