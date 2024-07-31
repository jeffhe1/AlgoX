import { ChevronUp } from "lucide-react";

export default function PercentUp(input : {percent: number}) {
    const percent:number = input.percent;
    return (
        <span className="text-green-500 inline-grid auto-cols-max grid-flow-col-dense">
            <p className="col-span-2">{percent.toFixed(2)}%</p>
            <ChevronUp className="w-[12px] h-[12px] flex"/>
        </span>
    )
}