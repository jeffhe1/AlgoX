import { ArrowRight, LoaderCircle } from "lucide-react";


export default function ErrorPage() {
    return (
    <section className="bg-background h-[100vh] flex justify-center">
      <div className="flex flex-col justify-center">
        <p className="text-center">Sorry, something went wrong</p>
        <div className="grid auto-cols-max grid-flow-col-dense">
            <a href='/'>Click here to go back to home</a>
            <ArrowRight/>
        </div>
      </div>
    </section>
    )
  }