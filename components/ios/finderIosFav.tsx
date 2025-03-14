import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FinderIosFav = ({appStates, setAppStates, searchParams}: {appStates: any, setAppStates: any, searchParams: any}) => {
    
    const pathname = usePathname()
    const router = useRouter()

    return ( 
        <div className="relative">
                    <div className="text-white text-xl font-bold text-left pt-5 flex flex-row justify-between" onClick={() => {
                        setAppStates({...appStates, 'finder': {...appStates['finder'], 'fav_toggle': !appStates['finder']['fav_toggle']}})
                        
                    }}>
                        <p>Favorites</p>
                        <Image
                            src={'/back.svg'}
                            className={cn("mr-3 object-cover rounded-xl opacity-100 cursor-pointer py-1 [filter:invert(24%)_sepia(97%)_saturate(1789%)_hue-rotate(193deg)_brightness(101%)_contrast(101%)] transition-transform duration-300 ease-in-out", appStates['finder']['fav_toggle'] ? "-rotate-90" : "-rotate-180")}
                            height={25}
                            width={25}
                            alt={'back'}
                        />
                    </div>
                    <div 
                        className={cn(
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            appStates['finder']['fav_toggle'] ? "max-h-96 opacity-100 transform translate-y-0" : "max-h-0 opacity-0 transform -translate-y-4"
                        )}
                    >
                        <div className="bg-[#1c1c1e] rounded-lg mt-2">
                            <div onClick={()=>{
                                const params = new URLSearchParams(searchParams)
                                params.set('iosApp', '1')
                                params.set('finderAppState', 'home/projects')
                                router.push(`${pathname}?${params.toString()}`)

                                // setAppStates({...appStates, 'finder': {...appStates['finder'], 'tabValue': 'home/projects'}})
                            }} className="grid grid-cols-[50px_1fr_40px] py-2   w-full">
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={'/folder.svg'}
                                        className="text-blue-500 opacity-70 [filter:brightness(0)_saturate(100%)_invert(36%)_sepia(83%)_saturate(5449%)_hue-rotate(204deg)_brightness(103%)_contrast(106%)]"
                                        height={25}
                                        width={25}
                                        alt={'folder'}
                                    />
                                </div>
                                <div>
                                    <p className="text-left h-full flex items-center">Projects</p>
                                    <hr className="opacity-10 mt-1"/>
                                </div>
                                <div>
                                    <Image
                                        className="rotate-180 invert opacity-40 py-1 h-full "
                                        src={'/back.svg'}
                                        height={25}
                                        width={25}
                                        alt={'back'}
                                    />
                                    <hr className="opacity-10 mt-1"/>
                                </div>
                            </div>
                            <div onClick={()=>{
                                const params = new URLSearchParams(searchParams)
                                params.set('iosApp', '1')
                                params.set('finderAppState', 'home/resume')
                                router.push(`${pathname}?${params.toString()}`)

                                // setAppStates({...appStates, 'finder': {...appStates['finder'], 'tabValue': 'home/projects'}})
                            }} className="grid grid-cols-[50px_1fr_40px] py-2   w-full">
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={'/document.svg'}
                                        className="text-blue-500 opacity-70 [filter:brightness(0)_saturate(100%)_invert(36%)_sepia(83%)_saturate(5449%)_hue-rotate(204deg)_brightness(103%)_contrast(106%)]"
                                        height={25}
                                        width={25}
                                        alt={'document'}
                                    />
                                </div>
                                <div>
                                    <p className="text-left h-full flex items-center">Resume</p>
                                    {/* <hr className="opacity-20"/> */}
                                </div>
                                <div>
                                    <Image
                                        className="rotate-180 invert opacity-40 py-1 h-full "
                                        src={'/back.svg'}
                                        height={25}
                                        width={25}
                                        alt={'back'}
                                    />
                                    {/* <hr className="opacity-20"/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
     );
}
 
export default FinderIosFav;