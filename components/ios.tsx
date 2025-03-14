import { wallpapers } from "@/utils/settingsOptions";
import Image from "next/image";
import { Dispatch, SetStateAction, use, useEffect, useRef, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GPTPage from "./apps/gpt";
import IOSGPT from "./ios/apps/gptIos";
import IOSGame from "./ios/apps/gameIos";
import { convertRemToPixels } from "@/utils/func";
import SpotifyApp from "./apps/spotify";
import ContactMePage from "./apps/contactMe";
import IOSFinder from "./ios/apps/finderIos";


const IOS = ({ loaded, setIsLoaded }: { loaded: boolean, setIsLoaded: Dispatch<SetStateAction<boolean>> }) => {
    const [openedApp, setOpenedApp] = useState<number>(0)
    const modelRef = useRef<HTMLDivElement>(null);
    const gridBoxRef = useRef<HTMLDivElement>(null)
    const drawerRef = useRef<HTMLDivElement>(null)



    const [flag, setFlag] = useState(true)
    const [appStates, setAppStates] = useState<any>({
        'gpt':{
            chats:[]
        },
        'finder':{
            'fav_toggle':true,
            'languages_toggle':true,
            'tabValue':'home',
            'openedDoc':null
        },
        4:{
            'name':'',
            'email':'',
            'message':''
        }
    })

    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()

    const q = searchParams.get('q'); // Get the 'id' query parameter
    
    console.log(q);
    useEffect(() => {
        if (q === 'resume') {
            window.location.href = 'https://drive.google.com/file/d/13t7MdZ0BkNp1dvGeoOJmJLA1ThGsMtHZ/view?usp=sharing';
        }
    }, [q]);
  

    


    const getCoords = (appNum: number): [number, number, number, number] => {
        let appCoord = document.querySelectorAll('.iosApp')
        try {
            let rect = appCoord[appNum - 1].getBoundingClientRect();
            return [rect.top + 30, rect.left + 30, window.innerHeight - rect.bottom + 30, window.innerWidth - rect.right + 30]
        } catch (error) {
            let rect = document.querySelector('.spotify')?.getBoundingClientRect()
            if(rect)
                return [rect.top + 120, rect.left + 120, window.innerHeight - rect.bottom + 120, window.innerWidth - rect.right + 120]
            else
                return [0,0,0,0]
        }

        
    }

    useEffect(()=>{
        const params = new URLSearchParams(searchParams)
        const iosApps = parseInt(params.get('iosApp')??"0")??0
        if (iosApps!==0){
            if(openedApp===iosApps)
            return 
                CloseApp(openedApp)
            if (openedApp!=0)
                setTimeout(()=>{
                    OpenApp(iosApps)
                },400)
            else OpenApp(iosApps)
        }
        else{
            CloseApp(openedApp)
        }

        const finderAppState = params.get('finderAppState')
        if(finderAppState){
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.delete('finderAppState');
            router.replace(`${pathname}?${updatedParams.toString()}`, { scroll: false });
        }

    },[searchParams, pathname])

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

    useEffect(()=>{
        if(gridBoxRef.current){
            console.log(gridBoxRef.current.clientWidth, gridBoxRef.current.clientHeight)
            if(drawerRef.current){
                drawerRef.current.style.height = (gridBoxRef.current.clientHeight + convertRemToPixels(0.5))+'px'
            }
        }
    },[flag])

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
        // setOpenedApp(0)
        setTimeout(()=>setOpenedApp(0),170)
        
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
    <IOSFinder key={1} appStates={appStates} setAppStates={setAppStates}/>,
    <IOSGPT key={2} appStates={appStates} setAppStates={setAppStates}/>,
    <IOSGPT key={3} appStates={appStates} setAppStates={setAppStates}/>,
    <ContactMePage key={4} isMobile={true} CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>,
    <GithubPage key={5}/>,
    <LinkedInPage key={6}/>,
    <IOSInsta key={7}/>,
    <IOSGame key={8}/>,
    <SpotifyApp key={9}/>
  ]

  useEffect(()=>{
    console.log({appStates})
  },[appStates])

      
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
            <div ref={drawerRef} className="absolute w-full bottom-4 z-[0]">
                <div className="h-full bg-black bg-opacity-20 backdrop-blur-[100px] mx-4 rounded-[2rem]"></div>
            </div>

            {/* grid-rows-8 */}
            <div className={cn("h-full w-full select-none absolute z-1 p-5 grid grid-cols-4 gap-3", flag?"grid-rows-8":"grid-rows-7")}>
                <IOSNameWidget loaded={loaded} />

                <IOSSpotifyWidget onClick={()=>{
                     const params = new URLSearchParams(searchParams)
                     params.set('iosApp', ''+(appSelector.length))
                     // replace(`${pathname}?${params.toString()}`)
                     router.push(`${pathname}?${params.toString()}`)
                }} loaded={loaded} />

                {iosApps.slice(0,4).map((app, key)=>(
                    <div key={key} className=" h-full w-full flex flex-col gap-1 items-center justify-center ">
                        <div onClick={()=>{
                           
                            const params = new URLSearchParams(searchParams)
                            params.set('iosApp', ''+(key+1))
                            // replace(`${pathname}?${params.toString()}`)
                            router.push(`${pathname}?${params.toString()}`)

                        }} className="iosApp w-[16vw] max-h-[70%] relative aspect-square">
                            <Image
                                src={app.imageSrc}
                                style={{
                                    scale:app.scale?'1.2':'1'
                                }}
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

                {iosApps.slice(4).map((app, key)=>(
                    <div key={key} className={cn("h-full w-full flex flex-col gap-1 items-center justify-center",flag?"row-start-8":"row-start-7")}>
                        <div onClick={()=>{
                           
                            const params = new URLSearchParams(searchParams)
                            params.set('iosApp', ''+(4+key+1))
                            // replace(`${pathname}?${params.toString()}`)
                            router.push(`${pathname}?${params.toString()}`)

                        }} className="iosApp w-[16vw] max-h-[70%] relative aspect-square">
                            <Image
                                src={app.imageSrc}
                                style={{
                                    scale:app.scale?'1.2':'1'
                                }}
                                className="object-contain"
                                alt='github'
                                fill
                            />
                        </div>
                        {/* <p className="text-xs">{app.tooltip}</p> */}
                    </div>
                ))}
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
                    <div className="grid h-full grid-rows-[25px_1fr]">
                        <div onClick={()=>{
                            // CloseApp(openedApp)
                            const params = new URLSearchParams(searchParams)
                            params.delete('iosApp')
                            router.push(`${pathname}?${params.toString()}`)
                            router

                        }} className="text-start text-sm flex items-center w-full h-[25px] bg-black">
                            X Close
                        </div>
                        <div style={{
                            overflow:'overlay'
                        }} className="h-full overflow-y-scroll">
                            {appSelector[openedApp-1]}
                        </div>
                    </div>
                )}
            </div>
      
        </div>
    );
}

export default IOS;