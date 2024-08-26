import { useState } from "react";
import { cn } from "@/lib/utils"

const IframeComponent = ({src, title, className}:{src:string, title:string, className?:string}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const handleIframeLoad = () => {
        setIsLoaded(true);
    };
    return (  
        <>
            {!isLoaded && <div className="w-full h-full flex justify-center">
                <div className="max-w-full w-[150px] h-0  border-2 border-gray-500  rounded-full animate-ping duration-500"></div>
            </div>}
            <iframe
                src={src}
                className={cn(
                    "w-full h-full rounded-lg backdrop-blur-none",
                    className
                  )}
                title={title}
                onLoad={handleIframeLoad}
                allowFullScreen>
            </iframe> 
        </>  
    );
}
 
export default IframeComponent;