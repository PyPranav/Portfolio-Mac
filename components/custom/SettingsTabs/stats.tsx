// import { getStats } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PersonalInfo } from "@/utils/personalInfo";
import { Switch } from "@/components/ui/switch";
import { getStats } from "@/utils/supabaseServer";
interface StatsData {
    total_chats: number;
    total_chats_in_last_24_hours: number;
    total_unique_visitors: number;
    total_visits: number;
    total_visits_in_last_24_hours: number;
}

const StatsTab = ({openedApp, appStates, setAppStates }: {openedApp:number, appStates: any, setAppStates: any }) => {
    const [stats, setStats] = useState<StatsData | null>(null);
    
    useEffect(() => {
        getStats().then((data) => {
            setStats(data);
        });
    }, []);

    if (!stats) return <div className="flex justify-center items-center h-64">Loading...</div>;

    return (
        <section className="w-full px-10 py-2 ">
        <p className="text-lg font-bold sticky top-0 bg-[#2d2d2d] z-[1000] pb-3">Website Stats</p>
            <div>
                <div className="mt-5 rounded-lg w-full bg-[#303030] border-[#575555] border-[1px]">

                    <div className="flex items-center justify-between">
                        <div className="p-5 flex gap-3 items-center">
                            <Image
                            src='/settings_icon/screentime.png'
                            width={30}
                            height={30}
                            alt="skills"
                            className="mr-2"
                            />
                            Website Stats
                            
                        </div>
                        <div className="mr-5">
                            <Switch checked={appStates[openedApp]['stats']} onClick={(e)=>{
                                setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'stats': !appStates[openedApp]['stats'] } })
                            }} className="data-[state=unchecked]:bg-[#454746] data-[state=checked]:bg-[#1463d9]"/>
                        </div>
                    </div>
                </div>


                {appStates[openedApp]['stats']&&(
                    <>
                                <p className="pl-4 mt-10 font-bold">Stats</p>

                    <div className="mt-5 rounded-lg w-full bg-[#303030] border-[#575555] border-[1px]">
                                <div >
                                    <div className="flex items-center justify-between">
                                        <div className="px-5 py-3 flex gap-5 items-center">
                                            <div className="bg-green-600 rounded-xl w-12 h-12 flex items-center justify-center">
                                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p>Total Visits</p>
                                                <p className="text-xs"><span className="font-bold text-sm text-green-400">{stats.total_visits}</span> visitors have explored this portfolio!</p>
                                                <p className="text-xs opacity-75">Including <span className="font-semibold ">{stats.total_visits_in_last_24_hours}</span> curious minds in the last 24 hours</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="mx-5 border-[#3c3c3c]"/>
                                </div>
                                <div >
                                    <div className="flex items-center justify-between">
                                        <div className="px-5 py-3 flex gap-5 items-center">
                                            <div className="bg-purple-600 rounded-xl w-12 h-12 flex items-center justify-center">
                                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p>Unique Visitors</p>
                                                <p className="text-xs"><span className="font-bold text-sm text-purple-400">{stats.total_unique_visitors}</span> different people discovered this site</p>
                                                <p className="text-xs opacity-75">Each bringing their unique perspective to my digital showcase</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="mx-5 border-[#3c3c3c]"/>
                                </div>

                                <div >
                                    <div className="flex items-center justify-between">
                                        <div className="px-5 py-3 flex gap-5 items-center">
                                            <div className="bg-blue-600 rounded-xl w-12 h-12 flex items-center justify-center">
                                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p>Total Chats</p>
                                                <p className="text-xs"><span className="font-bold text-sm text-blue-400">{stats.total_chats}</span> conversations have happened here</p>
                                                <p className="text-xs opacity-75">With <span className="font-semibold">{stats.total_chats_in_last_24_hours}</span> fresh discussions in the last day alone</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <hr className="mx-5 border-[#3c3c3c]"/> */}
                                </div>
                        </div>
                    </>
                )}
                    
            </div>
        </section>
    );
};

export default StatsTab;