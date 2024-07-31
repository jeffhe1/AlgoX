import { ChevronsDown } from "lucide-react";

export default function PriceDown({price}:
    {price : number}) {
    if (price > 10) {
        return (
        <span className="price-update-red inline-grid auto-cols-max grid-flow-col-dense">
            <ChevronsDown className="w-[12px] h-[12px] price-update-red-chevron"/>
            <p className="col-span-2 text-right">{price.toFixed(2)}</p>
            
        </span>
        )
    }
    if (price > 1){
        return (
        <span className="price-update-red inline-grid auto-cols-max grid-flow-col-dense">
            <ChevronsDown className="w-[12px] h-[12px] price-update-red-chevron"/>
            <p className="col-span-2 text-right">{price.toFixed(3)}</p>
        </span>)
    }
    return (
        <span className="price-update-red inline-grid auto-cols-max grid-flow-col-dense">
            <ChevronsDown className="w-[12px] h-[12px] price-update-red-chevron"/> 
            <p className="col-span-2 text-right">{price.toFixed(4)}</p>
        </span>
    )
}