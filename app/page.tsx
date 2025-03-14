"use client"
import IOS from "@/components/ios";
import MacOS from "@/components/macos";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Image from "next/image";
import { useEffect, useState } from "react";
import {sendVisit } from "@/utils/fetchData";

function App() {
  const [isMobile, setIsMobile] = useState<boolean|null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [twoSecondDone, setTwoSecondDone] = useState<boolean>(false)

  useEffect(()=>{
    console.log(isLoaded, ';)')
    if(isLoaded){
      console.log("Loaded!!!!")
      const loader = document.getElementById('whiteLoader')
      const timer = setTimeout(()=>{
        setTwoSecondDone(true)
        if(!isMobile)
          toast({
            title: "For an immersive experience",
            className:'w-fit fixed top-8 right-8 p-3 pb-0 border-0 bg-black bg-opacity-10 backdrop-blur-[100px] rounded-2xl p-4 text-white ', 
            action: <ToastAction onClick={()=>{
              var elem = document.documentElement;
              if (elem.requestFullscreen) 
                elem.requestFullscreen()
            }} className="bg-red-500 bg-opacity-40 p-2 mb-0 rounded-xl hover:bg-opacity-50 duration-500" altText="Try again">Go Fullscreen!</ToastAction>,
            
          })
      },1000)
      //can go to a min of 500ms
      
      if (loader){
        loader.style.removeProperty('animation')

        loader.style.width = '50%'
        setTimeout(()=>{
          loader.style.width = '100%'
        },10)
      }
      return ()=>clearTimeout(timer)
    }
  },[isLoaded])

  useEffect(()=>{
    if(isLoaded&&twoSecondDone)
    {
      const loader = document.getElementById('loader')
      if (loader)
        loader.style.display = 'none'
    }
  },[isLoaded, twoSecondDone])

  useEffect(()=>{
    const handleResize = () => {
      if(isMobile!==window.innerWidth < 700)
        setIsMobile(window.innerWidth < 700);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const bgImg = document.getElementById('bgImage')
    if(bgImg)
      bgImg.onload = ()=>{
        // console.log('hello')
      }

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  },[])

  useEffect(()=>{
    sendVisit()
  },[])
  
  
  return isMobile!==null?(
    <>
      {isMobile?(<IOS loaded={isLoaded&&twoSecondDone} setIsLoaded={setIsLoaded}/>):(<MacOS loaded={isLoaded&&twoSecondDone} setIsLoaded={setIsLoaded}/>)}
    </>    
  ):(<></>)
}

export default App;
