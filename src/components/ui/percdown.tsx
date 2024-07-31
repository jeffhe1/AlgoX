import { ChevronDown } from "lucide-react";

export const PercentDown = (input : {percent: number}) => {
    const percent:number = input.percent;
    return(
        <span className="text-red-500 inline-grid auto-cols-max grid-flow-col-dense">
            <p className="col-span-2">{percent.toFixed(2)}%</p>
            <ChevronDown className="w-[12px] h-[12px]"/>
        </span>

        
    )
}