import Image from "next/image";
import IOSListItem from "../../IOSList/listItem";
import IOSListContainer from "../../IOSList/listContainer";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import { wallpapers } from "@/utils/settingsOptions";

const IOSWallpaperSettings = ({ changeAppState, appStates, setAppStates }: { changeAppState: (newState?: string) => void, appStates: any, setAppStates: any }) => {
    const [showStickyHeader, setShowStickyHeader] = useState(false);
    const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(wallpapers.findIndex((wallpaper) => wallpaper === appStates['settings']['bg']));
    const titleRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        // setCurrentWallpaperIndex(wallpapers.findIndex((wallpaper) => wallpaper === appStates['settings']['bg']))
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowStickyHeader(!entry.isIntersecting);
            },
            { threshold: 0 }
        );
        
        if (titleRef.current) {
            observer.observe(titleRef.current);
        }
        
        return () => {
            if (titleRef.current) {
                observer.unobserve(titleRef.current);
            }
        };
    }, []);

    useEffect(()=>{
        const wallpaper = wallpapers[currentWallpaperIndex]
        if (wallpaper!=appStates['settings']['bg']){
            setAppStates({
                ...appStates,
                'settings': {
                    ...appStates['settings'], 'bg': wallpaper
                }
            })
            localStorage.setItem("background", wallpaper)
        }
    }, [currentWallpaperIndex])

    const goToNextWallpaper = () => {
        setCurrentWallpaperIndex((prev) => (prev + 1) % wallpapers.length);
    };

    const goToPrevWallpaper = () => {
        setCurrentWallpaperIndex((prev) => (prev - 1 + wallpapers.length) % wallpapers.length);
    };

    const setSelectedWallpaper = (index: number) => {
        setCurrentWallpaperIndex(index);
        // You could also update appStates here to track the selected wallpaper
        setAppStates({
            ...appStates,
            selectedWallpaper: wallpapers[index]
        });
    };

    return (
        <>
            <div className={`fixed top-[25px] left-0 right-0 bg-[#1c1c1e] bg-opacity-90 backdrop-blur-md z-50 py-2 px-4 transition-all duration-300 ${showStickyHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="relative flex items-center justify-center">
                    <button className="absolute left-0 flex gap-1 items-center cursor-pointer" onClick={() => {
                        changeAppState()
                    }}>
                        <Image
                            className="h-full"
                            style={{ filter: "invert(42%) sepia(93%) saturate(1352%) hue-rotate(199deg) brightness(101%) contrast(101%)" }}
                            src={'/back.svg'}
                            height={20}
                            width={20}
                            alt={'back'}
                        />
                        <p className="ml-[-5px] text-sm cursor-pointer text-[#438bfe] select-none max-[300px]:hidden">
                            Settings
                        </p>
                    </button>
                    <p className="text-white text-base font-semibold">Wallpapers</p>
                </div>
            </div>
            
            <div ref={titleRef} className="relative">
                <button className="flex gap-1 items-center cursor-pointer" onClick={() => {
                    changeAppState()
                }}>
                    <Image
                        className="h-full"
                        style={{ filter: "invert(42%) sepia(93%) saturate(1352%) hue-rotate(199deg) brightness(101%) contrast(101%)" }}
                        src={'/back.svg'}
                        height={20}
                        width={20}
                        alt={'back'}

                    />
                    <p className=" ml-[-5px] text-sm cursor-pointer text-[#438bfe] select-none max-[300px]:hidden">
                        Settings    
                    </p>
                    <div className=" font-semibold absolute top-0 bottom-0 left-0 right-0 grid place-items-center">
                        <p>Wallpapers</p>
                    </div>
                </button>
            </div>
            
            <div className="flex flex-col items-center justify-center mt-7">
                <div className="bg-[#2c2c2e] rounded-xl p-6 w-full max-w-md">
                    <h2 className="text-center text-gray-400 text-lg mb-4">CURRENT</h2>
                    
                    {/* Carousel Container */}
                    <div className="relative w-full flex justify-center">
                        {/* Left Arrow */}
                        <button 
                            onClick={goToPrevWallpaper}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-40 rounded-full p-2"
                        >
                            <Image
                                src="/back.svg"
                                height={20}
                                width={20}
                                alt="Previous"
                                style={{ filter: "invert(100%)" }}
                            />
                        </button>
                        
                        {/* Wallpaper Display */}
                        <div className="relative w-[240px] h-[480px] rounded-3xl overflow-hidden">
                            {wallpapers.map((wallpaper, index) => (
                                <div 
                                    key={index}
                                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${index === currentWallpaperIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={wallpaper}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 240px"
                                            style={{ objectFit: "cover" }}
                                            alt={`Wallpaper ${index + 1}`}
                                        />
                                        
                                        {/* Time Display */}
                                        <div className="absolute top-10 w-full text-center">
                                            <div className="text-sm text-white">Tuesday 9 January</div>
                                            <div className="text-white text-5xl font-semibold">9:41</div>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Right Arrow */}
                        <button 
                            onClick={goToNextWallpaper}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-40 rounded-full p-2"
                        >
                            <Image
                                src="/back.svg"
                                height={20}
                                width={20}
                                alt="Next"
                                className="invert rotate-180"
                                
                            />
                        </button>
                    </div>
                    
                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-4 gap-2">
                        {wallpapers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedWallpaper(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentWallpaperIndex ? 'bg-white scale-110' : 'bg-gray-500'}`}
                            />
                        ))}
                    </div>
                    
                    {/* Add New Wallpaper Button */}
                    {/* <div className="flex justify-center mt-6">
                        <button className="bg-[#0A84FF] text-white px-4 py-2 rounded-full flex items-center">
                            <span className="mr-1 text-xl">+</span> Add New Wallpaper
                        </button>
                    </div> */}
                </div>
                
                {/* Lock Screen Info */}
                <div className="bg-[#2c2c2e] rounded-xl p-6 w-full max-w-md mt-6">
                    <h2 className="text-white text-lg font-semibold mb-2">Change your Wallpaper here</h2>
                    <p className="text-gray-400">Try out the various wallpapers and have fun!</p>
                    
                    <div className="flex justify-center mt-4">
                        <div className="bg-[#1c1c1e] w-16 h-32 rounded-xl flex items-center justify-center">
                            <span className="text-white">9:41</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default IOSWallpaperSettings;