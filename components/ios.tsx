import { wallpapers } from "@/utils/settingsOptions";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import NameWidget from "./custom/Widgets/nameWidget";
import SpotifyWidget from "./custom/Widgets/spotifyWidget";
import { PersonalInfo } from "@/utils/personalInfo";
import IOSNameWidget from "./ios/widgets/nameWidgetIos";
import IOSSpotifyWidget from "./ios/widgets/spotifyWidgetIos";

const IOS = ({loaded,setIsLoaded}:{loaded:boolean, setIsLoaded:Dispatch<SetStateAction<boolean>>}) => {
    return ( 
    <div className="bg-black h-full text-white text-3xl text-center font-semibold grid place-items-center">
        <div className="h-full w-full select-none absolute z-0">
            <Image 
            src={wallpapers[1]}
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
        <div className="h-full w-full select-none absolute z-1 p-5 grid grid-cols-4 grid-rows-8 gap-3">
            <IOSNameWidget loaded={loaded}/>
            <IOSSpotifyWidget loaded={loaded}/>
        </div>
    </div> 
    );
}
 
export default IOS;