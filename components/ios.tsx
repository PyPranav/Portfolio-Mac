import { wallpapers } from "@/utils/settingsOptions";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import NameWidget from "./custom/Widgets/nameWidget";
import SpotifyWidget from "./custom/Widgets/spotifyWidget";
import { PersonalInfo } from "@/utils/personalInfo";
import IOSNameWidget from "./ios/widgets/nameWidgetIos";
import IOSSpotifyWidget from "./ios/widgets/spotifyWidgetIos";

const IOS = ({ loaded, setIsLoaded }: { loaded: boolean, setIsLoaded: Dispatch<SetStateAction<boolean>> }) => {
    const [openedApp, setOpenedApp] = useState<number>(0)
    const getCoords = (appNum: number): [number, number, number, number] => {
        let appCoord = document.querySelectorAll('.iosApp')
        let rect = appCoord[appNum - 1].getBoundingClientRect();
        return [rect.top + 30, rect.left + 30, window.innerHeight - rect.bottom + 30, window.innerWidth - rect.right + 30]
    }
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
            <div className="h-full w-full select-none absolute z-1 p-5 grid grid-cols-4 grid-rows-8 gap-3">
                <IOSNameWidget loaded={loaded} />
                <IOSSpotifyWidget loaded={loaded} />
                <div className="h-full w-full flex flex-col gap-1 items-center justify-center">
                    <div style={{
                        width: '16vw'
                    }} className="iosApp relative aspect-square">
                        <Image
                            src='/arc/githubLogo.png'
                            className="object-contain"
                            alt='github'
                            fill
                        />
                    </div>
                    <p className="text-xs">Github</p>
                </div>
                <div className="h-full w-full flex flex-col gap-1 items-center justify-center">
                    <div className="iosApp relative w-[16vw] aspect-square">
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