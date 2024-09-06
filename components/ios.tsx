import { wallpapers } from "@/utils/settingsOptions";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import NameWidget from "./custom/Widgets/nameWidget";
import SpotifyWidget from "./custom/Widgets/spotifyWidget";
import { PersonalInfo } from "@/utils/personalInfo";
import IOSNameWidget from "./ios/widgets/nameWidgetIos";
import IOSSpotifyWidget from "./ios/widgets/spotifyWidgetIos";
import { cn } from "@/lib/utils";
import { iosApps } from "@/utils/dockApps";
import GithubPage from "./custom/ArcPages/github";
import LinkedInPage from "./custom/ArcPages/linkedin";
import InstagramPage from "./custom/ArcPages/instagram";
import IOSInsta from "./ios/apps/instagramIos";

const IOS = ({ loaded, setIsLoaded }: { loaded: boolean, setIsLoaded: Dispatch<SetStateAction<boolean>> }) => {
    const [openedApp, setOpenedApp] = useState<number>(0)
    const modelRef = useRef<HTMLDivElement>(null);
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

    const OpenApp = (appNum:number)=>{
        setOpenedApp(appNum)
        console.log({'opened': appNum})
        let appCoord = getCoords(appNum)
        console.log({appCoord})
        if (modelRef.current){
          modelRef.current.style.transition = "all 0s ease-in-out";
          setTimeout(()=>{
            if (modelRef.current){
              modelRef.current.style.top = `${appCoord[0]}px`;
              modelRef.current.style.left = `${appCoord[1]}px`;
              modelRef.current.style.bottom = `${appCoord[2]}px`;
              modelRef.current.style.right = `${appCoord[3]}px`;
              modelRef.current.style.opacity = "0.5"
              // modelRef.current.style.clipPath = 'polygon(0 0, 100% 0, 50% 100%, 50% 100%)';
            }
          },10)
          setTimeout(()=>{
            if (modelRef.current)
              modelRef.current.style.transition = "all 0.3s ease-in-out";
    
          },20)
    
          setTimeout(() => {
            if(modelRef.current){
              modelRef.current.style.top = `${0}px`; // Adjust these values to control the final size
              modelRef.current.style.left = `${0}px`;
              modelRef.current.style.bottom = `${0}px`;
              modelRef.current.style.right = `${0}px`;
              modelRef.current.style.opacity = "1";
              // modelRef.current.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
            }
          }, 30);
        }
      }

      const CloseApp = (appNum:number)=>{
        if(appNum===0)
            return
        let appCoord = getCoords(appNum)
        setTimeout(()=>setOpenedApp(0),250)
        
        console.log({appCoord})
        if (modelRef.current){
          modelRef.current.style.top = `${appCoord[0]}px`;
          modelRef.current.style.left = `${appCoord[1]}px`;
          modelRef.current.style.bottom = `${appCoord[2]}px`;
          modelRef.current.style.right = `${appCoord[3]}px`;
          modelRef.current.style.opacity = "0.5"
          // modelRef.current.style.clipPath = 'polygon(0 0, 100% 0, 50% 100%, 50% 100%)';
          modelRef.current.style.transition = "all 0.3s ease-in-out";    
        }
        setTimeout(()=>{
            if(modelRef.current)
                modelRef.current.style.opacity = "0"

        },150)
        
      }

      
  const appSelector = [
    <GithubPage key={1}/>,
    <LinkedInPage key={2}/>,
    <IOSInsta key={3}/>
  ]

      
    return (
        <div className="bg-black h-full font-normal text-white text-3xl text-center  grid place-items-center">
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

                {iosApps.map((app, key)=>(
                    <div key={key} className=" h-full w-full flex flex-col gap-1 items-center justify-center">
                        <div onClick={()=>{
                            if(openedApp===key+1)
                            return 
                                CloseApp(openedApp)
                            if (openedApp!=0)
                                setTimeout(()=>{
                                    OpenApp(key+1)
                                },400)
                            else OpenApp(key+1)
                        }} className="iosApp w-[16vw] max-h-[70%] relative aspect-square">
                            <Image
                                src={app.imageSrc}
                                className="object-contain"
                                alt='github'
                                fill
                            />
                        </div>
                        <p className="text-xs">{app.tooltip}</p>
                    </div>
                ))}
                <div ref={gridBoxRef} className=" h-full w-full flex flex-col gap-1 items-center justify-center">
                    
                </div>
            </div>
            
            <div
            ref={modelRef}
            style={{
                position:'absolute',
                background:'black',
                opacity:0,
                zIndex:5
            }}
            >
                {openedApp!=0&&(
                    <>
                    <div onClick={()=>{
                        CloseApp(openedApp)
                    }} className="text-start text-sm flex items-center w-full h-[25px] bg-black">
                        X Close
                    </div>
                    {appSelector[openedApp-1]}
                    </>
                )}
            </div>
      
        </div>
    );
}

export default IOS;