import Image from "next/image";
import IOSListContainer from "../../IOSList/listContainer";
import { PersonalInfo } from "@/utils/personalInfo";
import IOSListItem from "../../IOSList/listItem";
import { settingsOptions } from "@/utils/settingsOptions";
import { useEffect, useRef, useState } from "react";

const IOSHomeSettings = ({ changeAppState }: { changeAppState: (newState?: string) => void }) => {
    const [showStickyHeader, setShowStickyHeader] = useState(false);
    const titleRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the main title is not intersecting (scrolled out of view),
                // show the sticky header
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
    
    return (<>
        <div className={`fixed top-[25px] left-0 right-0 bg-[#1c1c1e] bg-opacity-90 backdrop-blur-md z-50 py-2 transition-all duration-300 ${showStickyHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <p className="text-white text-base font-semibold text-center">Settings</p>
        </div>
        <div ref={titleRef}>
            <p className="text-white text-3xl font-bold text-left pt-0">Settings</p>
        </div>
        <IOSListContainer className="">
            <button onClick={() => {
                changeAppState('about')
            }} className="gap-2 grid grid-cols-[70px_1fr_40px] pl-4 p-2 pr-0 w-full focus:bg-white focus:bg-opacity-10  active:bg-white active:bg-opacity-10">
                <div className="flex items-center justify-center h-full">
                    <Image
                        src={PersonalInfo.profilePic}
                        className="object-cover rounded-[130px] w-[70px] h-[70px] opacity-80 group-hover:opacity-100 duration-500"
                        width={139}
                        height={139}
                        alt="Pranav"
                    />
                </div>
                <div className="h-full flex flex-col justify-center">
                    <p className="text-left font-semibold text-xl">{PersonalInfo.name}</p>
                    <p className="text-left text-sm opacity-40">{PersonalInfo.tag}</p>

                </div>
                <div className="h-full">
                    <Image
                        className="rotate-180 invert opacity-40 py-1 h-full "
                        src={'/back.svg'}
                        height={25}
                        width={25}
                        alt={'back'}
                    />
                </div>
            </button>
        </IOSListContainer>
        {[[0, 5], [5, 9], [9, 13]].map((s, key) => (
            <IOSListContainer key={key} className="w-full mt-7">
                {settingsOptions.slice(s[0],s[1]).map((app, key) => (
                    <IOSListItem
                        key={key}
                        onClick={() => { 
                            if(app.allowed)
                                changeAppState(app.name.split(" ")[0].toLowerCase())
                        }}
                        className="grid-cols-[55px_1fr_40px] duration-150"
                        start_icon={(
                            <div className="px-0 bg-[#7e7e7e] rounded-lg overflow-hidden w-[30px] h-[30px]">
                                <Image
                                    src={app.icon}
                                    width={40}
                                    height={40}
                                    className="rounded-[1000px] object-cover scale-[1.15]"
                                    alt={app.name}
                                />
                            </div>
                        )}
                        end_icon={
                            <Image
                                className="rotate-180 invert opacity-40 py-1 h-full "
                                src={'/back.svg'}
                                height={25}
                                width={25}
                                alt={'back'}
                            />}
                        label={app.name}
                    />
                ))}


            </IOSListContainer>
        ))}


    </>);
}

export default IOSHomeSettings;