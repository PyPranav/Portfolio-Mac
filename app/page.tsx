"use client"
import "./home.css";
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

const maxAdditionalSize = 5;

function App() {
  const dockRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  const [openedApp, setOpenedApp] = useState<number>(0)
  const [appStates, setAppStates] = useState<any>({
    1:{},
    2:{},
    3:{},
    4:{
      tabValue:'id',
      wifi:true,
      bluetooth: true
    },
    5:{
      albumOpened:null as (null|'personal'|'projects'|'certificates'),
      photoOpened:null as (null|number),
      currentPersonalPhotoIndex:0,
      currentCertificatesPhotoIndex:0,
      currentProjectPhotoIndex:0
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
      modelRef.current.style.clipPath = 'polygon(0 0, 100% 0, 50% 100%, 50% 100%)';
      modelRef.current.style.transition = "all 0.5s ease-in-out";    
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
          modelRef.current.style.clipPath = 'polygon(0 0, 100% 0, 50% 100%, 50% 100%)';
        }
      },10)
      setTimeout(()=>{
        if (modelRef.current)
          modelRef.current.style.transition = "all 0.5s ease-in-out";

      },20)

      setTimeout(() => {
        if(modelRef.current){
          modelRef.current.style.top = `${0}px`; // Adjust these values to control the final size
          modelRef.current.style.left = `${0}px`;
          modelRef.current.style.bottom = `${0}px`;
          modelRef.current.style.right = `${0}px`;
          modelRef.current.style.opacity = "1";
          modelRef.current.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        }
      }, 30);
    }
  }


  useEffect(()=>{
    console.log({appStates})
  },[appStates])

  



  const appSelector = [
    (<SettingsPage CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<SettingsPage CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<ArcPage CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<SettingsPage CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<PhotosApp CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<SpotifyApp CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<SettingsPage CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
    (<SettingsPage CloseApp={CloseApp} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/>),
  ]




  return (
    <div className="page">
      <div className="h-full w-full select-none absolute z-0 p-5">
        <div className="w-[600px]">
          <NameWidget/>

          <div className="mt-5 flex gap-5">
            <CalenderWidget/>
            <SpotifyWidget/>
            
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
          {dockAppList.map((dockApp)=>(
            <li key={dockApp.id} className="app" onMouseMove={handleAppHover}>
              <div onClick={()=>{
                CloseApp(openedApp)
                if (openedApp!=0)
                  setTimeout(()=>{
                    OpenApp(dockApp.id)
                  },500)
                else OpenApp(dockApp.id)
              }}>
                <img src={dockApp.imageSrc} />
                <span className="tooltip">{dockApp.tooltip}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* <div className="source-links">
        <a
          href="https://unsplash.com/photos/4wzRuAb-KWs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wallpaper by Mohammad <br />
          Alizade on Unsplash
        </a>
        <a
          href="https://macosicons.com/#/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Icons by MacOS Icons
        </a>
      </div> */}
      <div className="mobile-message">
        <p>
          What?! MacOS works on mobile?..
          <br />— Unfortunately it doesn't 😢 Open this site on your desktop to
          enjoy the amazing animations! Or watch the video{" "}
          <a href="https://youtu.be/_ZcIFTvLm64" target="_blank">
            on YouTube
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
