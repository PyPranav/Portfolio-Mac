import { Switch } from "@/components/ui/switch";
import { PersonalInfo } from "@/utils/personalInfo";
import Image from "next/image";

const ExperienceTab = ({openedApp, appStates, setAppStates }: {openedApp:number, appStates: any, setAppStates: any }) => {
    return ( 
    <section className="w-full px-10 py-2 pb-[80px]">
        <p className="text-lg font-bold sticky top-0 bg-[#2d2d2d] z-[1000] pb-3">Experience & Education</p>
        <div className="mt-5 rounded-lg w-full bg-[#303030] border-[#575555] border-[1px]">
                <div className="flex items-center justify-between">
                <div className="p-5 flex gap-3 items-center">
                    <Image
                    src='/settings_icon/bluetooth.png'
                    width={30}
                    height={30}
                    alt="skills"
                    className="mr-2"
                    />
                    Experience & Education
                    
                </div>
                <div className="mr-5">
                    <Switch checked={appStates[openedApp]['bluetooth']} onClick={(e)=>{
                        setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'bluetooth': !appStates[openedApp]['bluetooth'] } })
                    }} className="data-[state=unchecked]:bg-[#454746] data-[state=checked]:bg-[#1463d9]"/>
                </div>
                </div>
            </div>

            {appStates[openedApp]['bluetooth']&&(
                <>
                    <p className="pl-4 mt-10 font-bold">Experience</p>
                    <div className="mt-5 rounded-lg w-full bg-[#303030] border-[#575555] border-[1px]">
                    {PersonalInfo.experience.map((lang, key)=>(
                            <div key={key}>
                                <div className="flex items-center justify-between">
                                    <div className="px-5 py-3 flex gap-5 items-center">
                                        <Image
                                            src={lang.icon}
                                            width={45}
                                            height={45}
                                            alt={lang.companyName}
                                        />
                                        <div>
                                            <p>{lang.position}</p>
                                            <p className="text-xs">{lang.companyName}</p>
                                            <p className="text-xs opacity-75">{lang.duration}</p>
                                        </div>
                                    </div>
                                    {/* <div className="mr-5">
                                        <Image
                                            src={wifi_icon[lang.level]}
                                            className=" invert"
                                            width={25}
                                            height={25}
                                            alt={lang.level}
                                        />
                                    </div> */}
                                </div>

                                {key+1!=PersonalInfo.experience.length&&(<hr className="mx-5 border-[#3c3c3c]"/>)}
                            </div>

                        ))}
                    </div>

                    <p className="pl-4 mt-10 font-bold">Education</p>
                    <div className="mt-5 rounded-lg w-full bg-[#303030] border-[#575555] border-[1px]">
                    {PersonalInfo.education.map((lang,key)=>(
                            <div key={key}>
                                <div className="flex items-center justify-between">
                                    <div className="px-5 py-3 flex gap-5 items-center">
                                        <Image
                                            src={lang.icon}
                                            width={45}
                                            height={45}
                                            alt={lang.institute}
                                        />
                                        <div>
                                            <p>{lang.institute}</p>
                                            <p className="text-xs">{lang.course}</p>
                                            <p className="text-xs opacity-75">{lang.duration}</p>
                                        </div>
                                    </div>
                                    {/* <div className="mr-5">
                                        <Image
                                            src={wifi_icon[lang.level]}
                                            className=" invert"
                                            width={25}
                                            height={25}
                                            alt={lang.level}
                                        />
                                    </div> */}
                                </div>

                                {key+1!=PersonalInfo.education.length&&(<hr className="mx-5 border-[#3c3c3c]"/>)}
                            </div>

                        ))}
                    </div>
                </>
            )}
    </section>
    );
}
 
export default ExperienceTab;