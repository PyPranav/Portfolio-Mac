import "./macos.css";
import { useEffect, useRef, useState } from "react";
import { scaleValue } from "../utils/scale";
import { dockAppList } from "@/utils/dockApps";
import SettingsPage from "@/components/apps/settings";
import PhotosApp from "@/components/apps/photos";

import CalenderWidget from "@/components/custom/Widgets/calendarWidget";
import NameWidget from "@/components/custom/Widgets/nameWidget";
import SpotifyWidget from "@/components/custom/Widgets/spotifyWidget";
import SpotifyApp from "@/components/apps/spotify";
import ArcPage from "@/components/apps/arc";
import Image from "next/image";
import { wallpapers } from "@/utils/settingsOptions";
import { PhotoDetails } from "@/utils/photos";

const maxAdditionalSize = 5;
const MacOS = ({loaded}:{loaded:boolean}) => {
  const dockRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const [openedApp, setOpenedApp] = useState<number>(0)
  const [appStates, setAppStates] = useState<any>({
    1:{},
    2:{},
    3:{
      tabValue:'x',
    },
    4:{
      tabValue:'id',
      wifi:true,
      bluetooth: true,
      bg: wallpapers[0],
      bgChanged: true
    },
    5:{
      albumOpened:null as (null|'personal'|'projects'|'certificates'),
      photoOpened:null as (null|number),
      currentPersonalPhotoIndex:0,
      currentCertificatesPhotoIndex:0,
      currentProjectPhotoIndex:0,
    },
    6:{},
    7:{},
    8:{},
  })


  const handleAppHover = (ev: React.MouseEvent<HTMLLIElement>) => {
    if (!dockRef.current) return;

    const mousePosition = ev.clientX;
    const iconPositionLeft = ev.currentTarget.getBoundingClientRect().left;
    const iconWidth = ev.currentTarget.getBoundingClientRect().width;

    const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    );

    dockRef.current.style.setProperty(
      "--dock-offset-left",
      `${offsetPixels * -1}px`
    );

    dockRef.current.style.setProperty(
      "--dock-offset-right",
      `${offsetPixels}px`
    );
  };
  const getCoords = (appNum:number):[number,number,number,number] => {
    let appCoord = document.querySelectorAll('.app')
    let rect = appCoord[appNum-1].getBoundingClientRect();
    return [rect.top+30,rect.left+30,window.innerHeight - rect.bottom+30,window.innerWidth - rect.right + 30]
  }

  const CloseApp = (appNum:number)=>{
    if(appNum===0)
        return
    let appCoord = getCoords(appNum)
    setTimeout(()=>setOpenedApp(0),400)
    
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
  }

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

  const appSelector = [
    (<SettingsPage key={1} CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<SettingsPage key={2} CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<ArcPage key={3} CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<SettingsPage key={4} CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<PhotosApp key={5} CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<SpotifyApp key={6} CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<SettingsPage key={7} CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<SettingsPage key={8} CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
  ]


  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = localStorage.getItem("background");
      if (url && wallpapers.includes(url)) {
        setAppStates({ ...appStates, [4]: { ...appStates[openedApp], 'bg': url, 'bgChanged': false } })
      }
    }

    (['certificates','personal','projects'] as (('personal'|'certificates'|'projects')[])).forEach((type)=>{
      PhotoDetails[type].forEach((url,ind)=>{
        const img =  document.createElement('img');
        img.style.height='0px'
        img.style.width = '0px'
        img.src = url?.replace('.jpg','.webp')?.replace('.png','.webp')?.replace('.jpeg','.webp')??'';
        img.alt = url??'';
        img.addEventListener('load', () => {
          console.log('loaded', url)
          // img.remove();
        });
  
        document.body.appendChild(img);
  
      })
    })
    
  }, []);



  return (
    <div className="page">
      <div className="h-full w-full select-none absolute z-0">
        <Image 
          src={appStates[4].bg}
          className="object-cover object-center"
          sizes="100vw ,75vw , 50vw"
          fill
          alt='bg'
          
          quality={90}
        />
      </div>
      {/* bg-[url(/wallpapers/macos-monterey-wallpaper.webp)] bg-no-repeat bg-cover bg-center */}
      <div ref={bgRef} className="h-full w-full select-none absolute z-1 p-5">
        <div className="w-[600px]">
          <NameWidget loaded={loaded}/>

          <div className="mt-5 flex gap-5">
            <CalenderWidget/>
            <SpotifyWidget loaded={loaded}/>
            
          </div>
         
        </div>
      </div>
      <div
      ref={modelRef}
      style={{
        position:'absolute',
        // background:'black',
        backdropFilter: "blur(20px)",
        opacity:0,
        // display:openedApp==0?"none":'block'
        zIndex:5
      }}
      >
        {openedApp!=0&&(appSelector[openedApp-1])}
      </div>
      
      
      <nav ref={dockRef} className="dock backdrop-blur-md">
        <ul>
          {dockAppList.map((dockApp,key)=>(
            <li key={key} className="app" onMouseMove={handleAppHover}>
              <div onClick={()=>{
                if(openedApp===key+1)
                  return
                CloseApp(openedApp)
                if (openedApp!=0)
                  setTimeout(()=>{
                    OpenApp(key+1)
                  },400)
                else OpenApp(key+1)
              }}>
                <Image width={100} height={100} src={dockApp.imageSrc}  alt={'app'}/>
                <span className="tooltip">{dockApp.tooltip}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
 
export default MacOS;