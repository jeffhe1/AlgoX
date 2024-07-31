import { ChevronsUp } from "lucide-react";
export default function PriceUp({price}:{
    price:number
}) {
    if (price > 10) {
        return (
        <span className="price-update-green inline-grid auto-cols-max grid-flow-col-dense">
            <ChevronsUp className="w-[12px] h-[12px] price-update-green-chevron"/>
            <p className="col-span-2 text-right">{price.toFixed(2)}</p>
        </span>)
    }
    if (price > 1){
        return (
        <span className="price-update-green inline-grid auto-cols-max grid-flow-col-dense">
            <ChevronsUp className="w-[12px] h-[12px] price-update-green-chevron"/>
            <p className="col-span-2 text-right">{price.toFixed(3)}</p>
        </span>)
    }
    return(
        <span className="price-update-green inline-grid auto-cols-max grid-flow-col-dense">
            <ChevronsUp className="w-[12px] h-[12px] price-update-green-chevron"/>
            <p className="col-span-2 text-right">{price.toFixed(4)}</p>
        </span>
    )
}