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
    if(isLoaded)
      console.log("Loaded!!!!")
  },[isLoaded])

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setTwoSecondDone(true)
    },1000)
    return ()=>clearTimeout(timer)
  },[])

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
      {(!isLoaded||!twoSecondDone)&&(<div className="absolute top-0 left-0 right-0 bottom-0 z-[10001] bg-black">
        <div className="relative grid place-items-center h-full">
          <Image
            priority
            unoptimized
            src={'/apple.svg'}
            className="invert"
            width={64}
            height={64}
            alt='apple'
          />
          <div className="absolute bottom-10 w-full h-10 grid place-items-center">
            <div className="h-2 w-[200px] bg-gray-400 rounded-xl">
              <div style={{
                animation: 'widthExpand 1s ease-in-out forwards',
              }}  className=" h-full bg-white rounded-xl">
              </div>
            </div>
          </div>
        </div>
      </div>)}
      {isMobile?(<IOS/>):(<MacOS loaded={isLoaded&&twoSecondDone}/>)}
    </>    
  ):(<></>)
}

export default App;
