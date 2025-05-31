import { cn } from "@/lib/utils"
import Image from "next/image"

const IOSListItem = ({onClick, start_icon, end_icon, label,supersublabel,sublabel,className,last = false }: {onClick?: () => void, start_icon: React.ReactNode, end_icon: React.ReactNode,label: string, supersublabel?:any,sublabel?:any, last?: boolean, className?:string}) => {
    return ( 

        <button onClick={onClick} className={cn("grid grid-cols-[50px_1fr_40px] py-2 w-full active:bg-white active:bg-opacity-10 ", className)}>
            <div className="flex items-center justify-center h-full">
                {start_icon}
            </div>
            <div className="h-full">
                <p className="text-left h-full flex flex-col justify-center">
                    {label}
                    {supersublabel&&<p className="text-xs">{supersublabel}</p>}
                    {sublabel&&<p className="text-xs opacity-60">{sublabel}</p>}
                </p>
                
                {!last && <hr className="opacity-10 mt-1"/>}
            </div>
            <div className="h-full">
                {end_icon}
                {!last && <hr className="opacity-10 mt-1"/>}
            </div>
        </button>
     );
}
 
export default IOSListItem;