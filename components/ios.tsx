import { wallpapers } from "@/utils/settingsOptions";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import NameWidget from "./custom/Widgets/nameWidget";
import SpotifyWidget from "./custom/Widgets/spotifyWidget";
import { PersonalInfo } from "@/utils/personalInfo";
import IOSNameWidget from "./ios/widgets/nameWidgetIos";
import IOSSpotifyWidget from "./ios/widgets/spotifyWidgetIos";
import { cn } from "@/lib/utils";

const IOS = ({ loaded, setIsLoaded }: { loaded: boolean, setIsLoaded: Dispatch<SetStateAction<boolean>> }) => {
    const [openedApp, setOpenedApp] = useState<number>(0)
    const gridBoxRef = useRef<HTMLDivElement>(null)
    const [flag, setFlag] = useState(true)
    const getCoords = (appNum: number): [number, number, number, number] => {
        let appCoord = document.querySelectorAll('.iosApp')
        let rect = appCoord[appNum - 1].getBoundingClientRect();
        return [rect.top + 30, rect.left + 30, window.innerHeight - rect.bottom + 30, window.innerWidth - rect.right + 30]
    }
    useEffect(()=>{
        if(gridBoxRef.current){
            console.log(gridBoxRef.current.clientWidth, gridBoxRef.current.clientHeight)
            if(gridBoxRef.current.clientWidth-5<=gridBoxRef.current.clientHeight){
                setFlag(true)
            }
            else{
                setFlag(false)
            }
        }
    },[])
    return (
        <div className="bg-black h-full font-light text-white text-3xl text-center  grid place-items-center">
            <div className="h-full w-full select-none absolute z-0">
                <Image
                    src={wallpapers[1]}
                    id={'bgImage'}
                    onLoad={() => {
                        setIsLoaded(true)
                    }}
                    className="object-cover object-center"
                    sizes="100vw ,75vw , 50vw"
                    fill
                    alt='bg'

                    quality={90}
                />
            </div>
            {/* grid-rows-8 */}
            <div className={cn("h-full w-full select-none absolute z-1 p-5 grid grid-cols-4 gap-3", flag?"grid-rows-8":"grid-rows-7")}>
                <IOSNameWidget loaded={loaded} />
                <IOSSpotifyWidget loaded={loaded} />
                <div ref={gridBoxRef} className=" h-full w-full flex flex-col gap-1 items-center justify-center">
                    <div className="iosApp w-[16vw] max-h-[70%] relative aspect-square">
                        <Image
                            src='/arc/githubLogo.png'
                            className="object-contain"
                            alt='github'
                            fill
                        />
                    </div>
                    <p className="text-xs">Github</p>
                </div>
                <div className=" h-full w-full  flex flex-col gap-1 items-center justify-center">
                    <div className="iosApp relative w-[16vw] max-h-[70%] aspect-square">
                        <Image
                            src='/arc/githubLogo.png'
                            className="object-contain"
                            alt='github'
                            fill
                        />
                    </div>
                    <p className="text-xs">Github</p>
                </div>

            </div>
        </div>
    );
}

export default IOS;