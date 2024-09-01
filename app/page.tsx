"use client"
import IOS from "@/components/ios";
import MacOS from "@/components/macos";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  
  
  return isMobile!==null?(
    <>
      {isMobile?(<IOS/>):(<MacOS loaded={isLoaded&&twoSecondDone} setIsLoaded={setIsLoaded}/>)}
    </>    
  ):(<></>)
}

export default App;
