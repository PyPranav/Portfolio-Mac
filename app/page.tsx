"use client"
import IOS from "@/components/ios";
import MacOS from "@/components/macos";
import { useEffect, useState } from "react";


function App() {
  const [isMobile, setIsMobile] = useState<boolean|null>(null)

  useEffect(()=>{
    const handleResize = () => {
      if(isMobile!==window.innerWidth < 700)
        setIsMobile(window.innerWidth < 700);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  },[])
  
  
  return isMobile!==null?(
    <>
      {isMobile?(<IOS/>):(<MacOS/>)}
    </>    
  ):(<></>)
}

export default App;
