"use client"
import IOS from "@/components/ios";
import MacOS from "@/components/macos";
import Image from "next/image";
import { useEffect, useState } from "react";

function useCompleteLoad() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let imagesLoaded = 0;
    let imagesTotal = 0;

    const markAsLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === imagesTotal) {
        setIsLoaded(true);
      }
    };

    const handleImageLoad = (image:any) => {
      if (image.complete) {
        markAsLoaded();
      } else {
        image.addEventListener('load', markAsLoaded);
        image.addEventListener('error', markAsLoaded);
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'IMG') {
              imagesTotal++;
              handleImageLoad(node);
            }
          });
        }
      });
    });

    const checkImages = () => {
      const images = document.getElementsByTagName('img');
      imagesTotal = images.length;
      Array.from(images).forEach(handleImageLoad);
    };

    if (document.readyState === 'complete') {
      checkImages();
    } else {
      window.addEventListener('load', checkImages);
    }

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      const images = document.getElementsByTagName('img');
      Array.from(images).forEach((img) => {
        img.removeEventListener('load', markAsLoaded);
        img.removeEventListener('error', markAsLoaded);
      });
    };
  }, []);

  return isLoaded;
}

function App() {
  const [isMobile, setIsMobile] = useState<boolean|null>(null)
  const isLoaded = useCompleteLoad();
  const [twoSecondDone, setTwoSecondDone] = useState<boolean>(false)

  useEffect(()=>{
    console.log(isLoaded, ';)')
    if(isLoaded){
      console.log("Loaded!!!!")
      const loader = document.getElementById('whiteLoader')
      const timer = setTimeout(()=>{
        setTwoSecondDone(true)
      },500)
      
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  },[])
  
  
  return isMobile!==null?(
    <>
      {isMobile?(<IOS/>):(<MacOS loaded={isLoaded&&twoSecondDone}/>)}
    </>    
  ):(<></>)
}

export default App;
