import Image from "next/image";
import IOSListItem from "../../IOSList/listItem";
import IOSListContainer from "../../IOSList/listContainer";
import { PersonalInfo } from "@/utils/personalInfo";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";

const IOSWifiSettings = ({ changeAppState, appStates, setAppStates }: { changeAppState: (newState?: string) => void, appStates: any, setAppStates: any }) => {
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
    
    const wifi_icon = {
        'Expert': '/settings_icon/skills/wifi_4.webp',
        'Intermediate': '/settings_icon/skills/wifi_3.webp',
        'Beginner': '/settings_icon/skills/wifi_2.webp'
    }
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
                        <p className="ml-[-5px] text-sm cursor-pointer text-[#438bfe] select-none  max-[300px]:hidden">
                            Settings
                        </p>
                    </button>
                    <p className="text-white text-base font-semibold">Skills</p>
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
                    <p className=" ml-[-5px] text-sm cursor-pointer text-[#438bfe] select-none  max-[300px]:hidden">
                        Settings
                    </p>
                    <div className=" font-semibold absolute top-0 bottom-0 left-0 right-0 grid place-items-center">
                        <p>Skills</p>
                    </div>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center mt-7">
                <IOSListContainer className="w-full">
                    <IOSListItem
                        onClick={() => {
                            setAppStates({ ...appStates, 'settings': { ...appStates['settings'], 'wifi': !appStates['settings']['wifi'] } })
                        }}
                        className="grid-cols-[55px_1fr_70px]"
                        start_icon={
                            <div className="px-0 bg-[#7e7e7e] rounded-lg overflow-hidden w-[30px] h-[30px]">
                                <Image
                                    src={'/settings_icon/wifi.png'}
                                    width={40}
                                    height={40}
                                    className="rounded-[1000px] object-cover scale-[1.15]"
                                    alt={'Skills'}
                                />
                            </div>
                        }
                        end_icon={
                            <div className="h-full grid place-items-center">
                                <Switch checked={appStates['settings']['wifi']} className="data-[state=unchecked]:bg-[#454746] data-[state=checked]:bg-[#1463d9]" />
                            </div>
                        }
                        label="Skills"
                        last
                    />
                </IOSListContainer>
                {appStates['settings']['wifi'] && (
                    <>
                        <p className=" text-left w-full mt-5 text-sm opacity-60 pl-5 ">Languages</p>
                        <IOSListContainer className="w-full">
                            {PersonalInfo.skills.lanuages.map((lang, key) => (
                                <IOSListItem
                                    key={key}
                                    onClick={() => { }}
                                    className="grid-cols-[55px_1fr_40px] duration-150"
                                    start_icon={(
                                        <div className="px-0  ">
                                            <Image
                                                src={lang.icon}
                                                width={30}
                                                height={30}
                                                className="object-cover"
                                                alt="Email"
                                            />
                                        </div>
                                    )}
                                    end_icon={
                                        <div className="h-full grid place-items-center">
                                            <Image
                                                src={wifi_icon[lang.level]}
                                                className=" invert"
                                                width={25}
                                                height={25}
                                                alt={lang.level}
                                            />
                                        </div>
                                    }
                                    label={lang.name}
                                    last={key===PersonalInfo.skills.lanuages.length-1}
                                />
                            ))}
                        </IOSListContainer>


                        <p className=" text-left w-full mt-5 text-sm opacity-60 pl-5 ">Frameworks</p>
                        <IOSListContainer className="w-full mb-10">
                            {PersonalInfo.skills.frameworks.map((lang, key) => (
                                <IOSListItem
                                    key={key}
                                    onClick={() => { }}
                                    className="grid-cols-[55px_1fr_40px] duration-150"
                                    start_icon={(
                                        <div className="px-0  ">
                                            <Image
                                                src={lang.icon}
                                                width={30}
                                                height={30}
                                                className="object-cover"
                                                alt="Email"
                                            />
                                        </div>
                                    )}
                                    end_icon={
                                        <div className="h-full grid place-items-center">
                                            <Image
                                                src={wifi_icon[lang.level]}
                                                className=" invert"
                                                width={25}
                                                height={25}
                                                alt={lang.level}
                                            />
                                        </div>
                                    }
                                    label={lang.name}
                                    last={key===PersonalInfo.skills.frameworks.length-1}
                                />
                            ))}
                        </IOSListContainer>

                    </>
                )}

            </div>
        </>
    );
}

export default IOSWifiSettings;