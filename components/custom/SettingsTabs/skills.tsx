import Image from "next/image";
import { Switch } from "@/components/ui/switch"
import { PersonalInfo } from "@/utils/personalInfo";


const SkillTab = ({openedApp, appStates, setAppStates }: {openedApp:number, appStates: any, setAppStates: any }) => {
    const wifi_icon = {
        'Expert':'/settings_icon/skills/wifi_4.webp',
        'Intermediate': '/settings_icon/skills/wifi_3.webp',
        'Beginner': '/settings_icon/skills/wifi_2.webp'
    }
    return (
        <section className="w-full px-10 py-2 pb-[80px]">
            <p className="text-lg font-bold sticky top-0 bg-[#2d2d2d] z-[1000] pb-3">Skills</p>
            <div className="mt-5 rounded-lg w-full bg-[#303030] border-[#575555] border-[1px]">
                <div className="flex items-center justify-between">
                <div className="p-5 flex gap-3 items-center">
                    <Image
                    src='/settings_icon/wifi.png'
                    width={30}
                    height={30}
                    alt="skills"
                    className="mr-2"
                    />
                    Skills
                    
                </div>
                <div className="mr-5">
                    <Switch checked={appStates[openedApp]['wifi']} onClick={(e)=>{
                        setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'wifi': !appStates[openedApp]['wifi'] } })
                    }} className="data-[state=unchecked]:bg-[#454746] data-[state=checked]:bg-[#1463d9]"/>
                </div>
                </div>
            </div>
            {appStates[openedApp]['wifi']&&(
                <>
                    <p className="pl-4 mt-10 font-bold">Languages</p>
                    <div className="mt-5 rounded-lg w-full bg-[#303030] border-[#575555] border-[1px]">
                        {PersonalInfo.skills.lanuages.map((lang)=>(
                            <div key={lang.id}>
                                <div className="flex items-center justify-between">
                                    <div className="px-5 py-3 flex gap-5 items-center">
                                        <Image
                                            src={lang.icon}
                                            width={40}
                                            height={40}
                                            alt={lang.name}
                                        />
                                        <div>
                                            <p>{lang.name}</p>
                                            <p className="text-xs">{lang.level}</p>
                                        </div>
                                    </div>
                                    <div className="mr-5">
                                        <Image
                                            src={wifi_icon[lang.level]}
                                            className=" invert"
                                            width={25}
                                            height={25}
                                            alt={lang.level}
                                        />
                                    </div>
                                </div>

                                {lang.id!=PersonalInfo.skills.lanuages.length&&(<hr className="mx-5 border-[#3c3c3c]"/>)}
                            </div>

                        ))}
                        
                    </div>

                    <p className="pl-4 mt-10 font-bold">Frameworks</p>
                    <div className="mt-5 rounded-lg w-full bg-[#303030] border-[#575555] border-[1px]">
                        {PersonalInfo.skills.frameworks.map((lang)=>(
                            <div key={lang.id}>
                                <div className="flex items-center justify-between">

                                    <div className="px-5 py-3 flex gap-5 items-center">
                                        <Image
                                            src={lang.icon}
                                            width={40}
                                            height={40}
                                            alt={lang.name}
                                        />
                                        <div>
                                            <p>{lang.name}</p>
                                            <p className="text-xs">{lang.level}</p>
                                        </div>
                                    </div>
                                    <div className="mr-5">
                                        <Image
                                            src={wifi_icon[lang.level]}
                                            className=" invert"
                                            width={25}
                                            height={25}
                                            alt={lang.level}
                                        />
                                    </div>
                                </div>

                                {lang.id!=PersonalInfo.skills.frameworks.length&&(<hr className="mx-5 border-[#3c3c3c]"/>)}
                            </div>

                        ))}
                        
                    </div>
                </>
            )}
            
        </section>
    );
}

export default SkillTab;