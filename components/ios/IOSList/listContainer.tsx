import { cn } from "@/lib/utils";

const IOSListContainer = ({toggle, children, className}: {toggle?: boolean, children: React.ReactNode, className?: string}) => {
    if (toggle!=undefined)
        return ( 
            <div 
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    toggle ? "max-h-96 opacity-100 transform translate-y-0" : "max-h-0 opacity-0 transform -translate-y-4",
                    className
                )}
            >
                <div className="bg-[#1c1c1e] rounded-lg mt-2">
                {children}
                </div>
            </div>
        );
    else
        return(
            <div className={cn("bg-[#1c1c1e] rounded-lg mt-2", className)}>
                {children}
            </div>

    )
}
 
export default IOSListContainer;