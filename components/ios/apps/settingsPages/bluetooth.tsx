import Image from "next/image";
import IOSListItem from "../../IOSList/listItem";
import IOSListContainer from "../../IOSList/listContainer";
import { PersonalInfo } from "@/utils/personalInfo";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";

const IOSBluetoothSettings = ({ changeAppState, appStates, setAppStates }: { changeAppState: (newState?: string) => void, appStates: any, setAppStates: any }) => {
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
                    <p className="text-white text-base font-semibold">Qualifications</p>
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
                        <p>Qualifications</p>
                    </div>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center mt-7">
                <IOSListContainer className="w-full">
                    <IOSListItem
                        onClick={() => {
                            setAppStates({ ...appStates, 'settings': { ...appStates['settings'], 'bluetooth': !appStates['settings']['bluetooth'] } })
                        }}
                        className="grid-cols-[55px_1fr_70px]"
                        start_icon={
                            <div className="px-0 bg-[#7e7e7e] rounded-lg overflow-hidden w-[30px] h-[30px]">
                                <Image
                                    src={'/settings_icon/bluetooth.png'}
                                    width={40}
                                    height={40}
                                    className="rounded-[1000px] object-cover scale-[1.15]"
                                    alt={'Bluetooth'}
                                />
                            </div>
                        }
                        end_icon={
                            <div className="h-full grid place-items-center">
                                <Switch checked={appStates['settings']['bluetooth']} className="data-[state=unchecked]:bg-[#454746] data-[state=checked]:bg-[#1463d9]" />
                            </div>
                        }
                        label="Bluetooth"
                        last
                    />
                </IOSListContainer>
                {appStates['settings']['bluetooth'] && (
                    <>
                        <p className=" text-left w-full mt-5 text-sm opacity-60 pl-5 ">Experience</p>
                        <IOSListContainer className="w-full">
                            {PersonalInfo.experience.map((lang, key) => (
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
                                        <div className="h-full ">
                                            
                                        </div>
                                    }
                                    label={lang.position}
                                    supersublabel={lang.companyName}
                                    sublabel={lang.duration}
                                    last={key===PersonalInfo.experience.length-1}
                                />
                            ))}
                        </IOSListContainer>


                        <p className=" text-left w-full mt-5 text-sm opacity-60 pl-5 ">Education</p>
                        <IOSListContainer className="w-full mb-10">
                            {PersonalInfo.education.map((lang, key) => (
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
                                        <div className="h-full">
                                            
                                        </div>
                                    }
                                    label={lang.institute}
                                    supersublabel={lang.course}
                                    sublabel={lang.duration}
                                    last={key===PersonalInfo.education.length-1}
                                />
                            ))}
                        </IOSListContainer>

                    </>
                )}

            </div>
        </>
    );
}
 
export default IOSBluetoothSettings;