import { wallpapers } from "@/utils/settingsOptions";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import NameWidget from "./custom/Widgets/nameWidget";

const IOS = ({loaded,setIsLoaded}:{loaded:boolean, setIsLoaded:Dispatch<SetStateAction<boolean>>}) => {
    return ( 
    <div className="bg-black h-full text-white text-3xl text-center font-semibold grid place-items-center">
        <div className="h-full w-full select-none absolute z-0">
            <Image 
            src={wallpapers[0]}
            id={'bgImage'}
            onLoad={()=>{
                setIsLoaded(true)
            }}
            className="object-cover object-center"
            sizes="100vw ,75vw , 50vw"
            fill
            alt='bg'
            
            quality={90}
            />
        </div>
        <div className="h-full w-full select-none absolute z-1 p-5">
            <div className="w-full">
                <NameWidget loaded={loaded}/>
            </div>
        </div>
    </div> 
    );
}
 
export default IOS;