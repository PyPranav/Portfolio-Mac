import { cn } from "@/lib/utils";
import { wallpapers } from "@/utils/settingsOptions";
import Image from "next/image";
import { useEffect, useState } from "react";

const WallpaperTab = ({openedApp, appStates, setAppStates }: {openedApp:number, appStates: any, setAppStates: any }) => {
    const [photoWidth, setPhotoWidth] = useState(0)

    useEffect(() => {
        const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        return (...args: Parameters<T>) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
            func(...args);
            }, delay);
        };
        };

        const handleResize = () => {
        let winWidth = window.innerWidth
        let numberOfPhotoPerRow = 0
        if (winWidth >= 1600)
            numberOfPhotoPerRow = 5
        else if (winWidth >= 1450)
            numberOfPhotoPerRow = 4
        else if (winWidth >= 1000)
            numberOfPhotoPerRow = 3
        else if (winWidth >= 750)
            numberOfPhotoPerRow = 2
        else
            numberOfPhotoPerRow = 1

        let availWidth = winWidth - 80 - 40 * (numberOfPhotoPerRow - 1) - 10 -302 - 3*2*3
        let perPhotoWidth = availWidth / numberOfPhotoPerRow

        setPhotoWidth(perPhotoWidth)
        console.log('hey')


        };
        handleResize()
        const debouncedHandleResize = debounce(handleResize, 200);

        window.addEventListener('resize', debouncedHandleResize);
        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, []);
    
    // useEffect(()=>{
    //     setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'bg': '/wallpapers/Sonoma Dark.jpg' } })
    // },[])
    return ( 
    <section className="w-full px-10 py-2 ">
        <p className="text-lg font-bold sticky top-0 bg-[#2d2d2d] z-[1000] pb-3">Wallpaper</p>
        <div className="flex flex-wrap gap-[40px] items-center mt-[20px] pb-16">
            {wallpapers.map((url, ind) => (
                <div key={ind}>
                    <div className={cn('rounded-xl overflow-hidden',url===appStates[openedApp].bg?"relative border-[3px] border-blue-700 before:border-[2px] before:border-[black] before:absolute before:top-[0px] before:left-[0px] before:right-[0px] before:bottom-[0px] before:bg-transparent before:z-[10] before:rounded-lg before:overflow-hidden":'')}>
                        <Image
                            src={url}
                            className={'object-cover  cursor-pointer border-[0px] '}
                            style={{
                                height:photoWidth/2
                            }}
                                
                            onClick={() => {
                                setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'bg': url, 'bgChanged': false } })
                            }}

                            height={photoWidth}
                            width={url===appStates[openedApp].bg?photoWidth-6: photoWidth}
                            alt={url}
                        />
                    </div>
                    <p className={cn("text-center font-light pt-3",url===appStates[openedApp].bg?'mt-[-6px]':'')}>{url.split('/').at(-1)?.split('.')[0]}</p>
                </div>
            ))}
        </div>
    </section>
    );
}
 
export default WallpaperTab;