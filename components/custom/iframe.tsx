import { useState } from "react";

const IframeComponent = ({src, title}:{src:string, title:string}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const handleIframeLoad = () => {
        console.log('Iframe has finished loading');
        setIsLoaded(true);
    };
    return (  
        <>
            {!isLoaded && <div className="w-full h-full flex justify-center">
                <div className="max-w-full w-[150px] h-0  border-2 border-gray-500  rounded-full animate-ping duration-500"></div>
            </div>}
            <iframe
                src={src}
                className="w-full h-full rounded-lg backdrop-blur-none" 
                title={title}
                onLoad={handleIframeLoad}
                allowFullScreen>
            </iframe> 
        </>  
    );
}
 
export default IframeComponent;