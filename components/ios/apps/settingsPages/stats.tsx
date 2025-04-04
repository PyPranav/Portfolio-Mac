import Image from "next/image";
import IOSListItem from "../../IOSList/listItem";
import IOSListContainer from "../../IOSList/listContainer";
import { PersonalInfo } from "@/utils/personalInfo";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";

const IOSStatsSettings = ({ changeAppState, appStates, setAppStates }: { changeAppState: (newState?: string) => void, appStates: any, setAppStates: any }) => {
    const [showStickyHeader, setShowStickyHeader] = useState(false);
    const titleRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
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
                    <p className="text-white text-base font-semibold">Website Stats</p>
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
                        <p>Website Stats</p>
                    </div>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center mt-7">
                <IOSListContainer className="w-full">
                    <IOSListItem
                        onClick={() => {
                            setAppStates({ ...appStates, 'settings': { ...appStates['settings'], 'stats': !appStates['settings']['stats'] } })
                        }}
                        className="grid-cols-[55px_1fr_70px]"
                        start_icon={
                            <div className="px-0 bg-[#7e7e7e] rounded-lg overflow-hidden w-[30px] h-[30px]">
                                <Image
                                    src={'/settings_icon/screentime.png'}
                                    width={40}
                                    height={40}
                                    className="rounded-[1000px] object-cover scale-[1.15]"
                                    alt={'Stats'}
                                />
                            </div>
                        }
                        end_icon={
                            <div className="h-full grid place-items-center">
                                <Switch checked={appStates['settings']['stats']} className="data-[state=unchecked]:bg-[#454746] data-[state=checked]:bg-[#1463d9]" />
                            </div>
                        }
                        label="Website Stats"
                        last
                    />
                </IOSListContainer>
                {appStates['settings']['stats'] && appStates['settings']['statsData'] && (
                    <>
                        <p className=" text-left w-full mt-5 text-sm opacity-60 pl-5 ">Experience</p>
                        <IOSListContainer className="w-full">
                                <IOSListItem
                                    onClick={() => { }}
                                    className="grid-cols-[55px_1fr_40px] duration-150"
                                    start_icon={(
                                        <div className="bg-green-600 rounded-xl w-[34.5px] h-[34.5px] flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                    )}
                                    end_icon={
                                        <div className="h-full ">
                                            
                                        </div>
                                    }
                                    label={"Total Visits"}
                                    supersublabel={<><span className="font-bold text-sm text-green-400">{appStates['settings']['statsData'].total_visits}</span> visitors have explored this portfolio!</>}
                                    sublabel={<>Including <span className="font-semibold ">{appStates['settings']['statsData'].total_visits_in_last_24_hours}</span> curious minds in the last day</>}
                                />

                                <IOSListItem
                                    onClick={() => { }}
                                    className="grid-cols-[55px_1fr_40px] duration-150"
                                    start_icon={(
                                        <div className="bg-purple-600 rounded-xl w-[34.5px] h-[34.5px] flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                    )}
                                    end_icon={
                                        <div className="h-full ">
                                            
                                        </div>
                                    }
                                    label={"Unique Visitors"}
                                    supersublabel={<><span className="font-bold text-sm text-purple-400">{appStates['settings']['statsData'].total_unique_visitors}</span> different people discovered this site</>}
                                    sublabel={'Bringing their uniqueness to this portfolio'}
                                />
                                <IOSListItem
                                    onClick={() => { }}
                                    className="grid-cols-[55px_1fr_40px] duration-150"
                                    start_icon={(
                                        <div className="bg-orange-600 rounded-xl w-[35.5px] h-[35.5px] flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                    )}
                                    end_icon={
                                        <div className="h-full ">
                                            
                                        </div>
                                    }
                                    label={"Device Breakdown"}
                                    supersublabel={<><span className="font-bold text-sm text-orange-400">{appStates['settings']['statsData'].total_mobile_visitors || 0}</span> mobile and <span className="font-bold text-sm text-orange-400">{appStates['settings']['statsData'].total_desktop_visitors || 0}</span> desktop visitors</>}
                                    sublabel={'Experiencing across different devices'}
                                    last
                                />
                        </IOSListContainer>

                    </>
                )}

            </div>
        </>
    );
}
 
export default IOSStatsSettings;