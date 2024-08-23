import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WindowCloseButtons from "../custom/windowCloseButtons";
import { Input } from "../ui/input";
import Image from "next/image";
import InstagramPage from "../custom/ArcPages/instagram";
import GithubPage from "../custom/ArcPages/github";
import LinkedInPage from "../custom/ArcPages/linkedin";
import { PersonalInfo } from "@/utils/personalInfo";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const getLink = (val:string)=>{
    if (['instagram', 'x', 'github', 'linkedin'].includes(val))
        return val+'.com'
    
    return PersonalInfo.hostedProjects.filter((proj)=>proj.name===val)[0].url
}

const ArcPage = ({ CloseApp, openedApp, appStates, setAppStates }: { CloseApp: any, openedApp: number, appStates: any, setAppStates: any }) => {
    const [isFirfox, setIsFirfox] = useState(false)
    const router = useRouter();
    const [count, setCount] = useState(0)
    useEffect(()=>{
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('firefox') > -1) {
            setIsFirfox(true);
        }
    })
    return (
        <Tabs value={appStates[openedApp]['tabValue']} onValueChange={(val) => setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'tabValue': val } })} className="grid grid-cols-[170px_1fr] h-full w-full bg-black bg-opacity-85 backdrop-blur-2xl color-white">
            <TabsList className="flex flex-col h-full p-2 pt-0 items-start justify-start bg-[#292929] bg-opacity-0 overflow-scroll">
                    <div className="flex w-full">
                        <WindowCloseButtons CloseApp={CloseApp} openedApp={openedApp} />
                        <div className="flex w-full justify-center">
                            <div className="grid place-items-center" >
                                <Image
                                src={'/back.svg'}
                                className="object-cover rounded-xl opacity-80 hover:opacity-100  invert cursor-pointer"
                                height={25}
                                width={25}
                                alt={'back'}
                                onClick={() => {
                                    router.back()
                                }}
                                />
                            </div>
                            <div className="grid place-items-center">
                                <Image
                                src={'/back.svg'}
                                className="object-cover rotate-180 rounded-xl  invert opacity-80 hover:opacity-100  cursor-pointer"
                                height={25}
                                width={25}
                                onClick={() => {
                                    router.forward()
                                }}
                                alt={'back'}
                                />
                            </div>
                        </div>
                    </div>
                    <Input
                        type="search"
                        disabled
                        value={getLink(appStates[openedApp]['tabValue'])}
                        title={getLink(appStates[openedApp]['tabValue'])}
                        placeholder="Search"
                        className="truncate text-xs my-2 w-full rounded-xl border border-[#2f2f2f] bg-white bg-opacity-20 px-4 py-2 text-white focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                    />
                <div className="grid grid-cols-2 gap-2 w-full">
                    <TabsTrigger value="instagram" className="grid place-items-center w-full h-[3rem]  bg-white bg-opacity-10 hover:bg-opacity-20 data-[state=active]:bg-white data-[state=active]:bg-opacity-30 text-white data-[state=active]:text-white rounded-xl duration-200 " >
                        <Image
                        src={'/arc/instagramLogo.png'}
                        className="object-cover"
                        height={15}
                        width={15}
                        alt={'Instagram'}
                        />
                    </TabsTrigger>
                    <TabsTrigger value="github" className="grid place-items-center w-full h-[3rem] bg-white bg-opacity-10 hover:bg-opacity-20 data-[state=active]:bg-white data-[state=active]:bg-opacity-30 text-white data-[state=active]:text-white rounded-xl duration-200 ">
                    <Image
                        src={'/arc/githubLogo.png'}
                        className="object-cover"
                        height={15}
                        width={15}
                        alt={'Github'}
                        />
                    </TabsTrigger>
                    <TabsTrigger value="linkedin" className="grid place-items-center w-full h-[3rem] bg-white bg-opacity-10 hover:bg-opacity-20 data-[state=active]:bg-white data-[state=active]:bg-opacity-30 text-white data-[state=active]:text-white rounded-xl duration-200 ">
                    <Image
                        src={'/arc/linkedinLogo.png'}
                        className="object-cover"
                        height={15}
                        width={15}
                        alt={'Linkedin'}
                        />
                    </TabsTrigger>
                    <TabsTrigger value="x" className="grid place-items-center w-full h-[3rem] bg-white bg-opacity-10 hover:bg-opacity-20 data-[state=active]:bg-white data-[state=active]:bg-opacity-30 text-white data-[state=active]:text-white rounded-xl duration-200 ">
                    <Image
                        src={'/arc/xLogo.png'}
                        className="object-cover"
                        height={15}
                        width={15}
                        alt={'X'}
                        />
                    </TabsTrigger>
                </div>
                <div className="w-full px-2">
                    <hr className="opacity-15 my-4"/>
                </div>
                {PersonalInfo.hostedProjects.map((project,key)=>{
                    if(project.name=='Envision' && isFirfox)
                        return(<></>)
                    return (
                    <TabsTrigger key={key} className=" mb-2 flex w-full gap-2 justify-start py-2 data-[state=active]:bg-white data-[state=active]:bg-opacity-20 text-white data-[state=active]:text-white rounded-xl data-[state=inactive]:bg-white data-[state=inactive]:bg-opacity-0 data-[state=inactive]:hover:bg-opacity-10 " value={project.name}>
                        <Image
                        src={project.icon}
                        className="object-cover"
                        height={20}
                        width={20}
                        alt={project.name}
                        />
                        <p className="truncate font-light">{project.name}</p>

                    </TabsTrigger>
                )})}
                
                
            </TabsList>
            {/* <div className="bg-black"></div> */}

            <TabsContent className="mb-2 mr-2 rounded-lg overflow-scroll" value="instagram">
                <InstagramPage/>
            </TabsContent>
            <TabsContent className="mb-2 mr-2 rounded-lg overflow-scroll" value="github">
                <GithubPage/>
            </TabsContent>
            <TabsContent className="mb-2 mr-2 rounded-lg overflow-scroll" value="linkedin">
                <LinkedInPage/>
            </TabsContent>
            {PersonalInfo.hostedProjects.map((project,key)=>{
                if(project.name=='Envision' && isFirfox)
                    return(<></>)
                return (
                <TabsContent className=" mb-2 mr-2 rounded-lg overflow-scroll" key={key} value={project.name}>
                        <iframe
                            src={project.url}
                            className="w-full h-full rounded-lg backdrop-blur-none" 
                            title={project.name}
                            allowFullScreen>
                        </iframe>                    
                </TabsContent>
            )})}
        </Tabs>
    );
}

export default ArcPage;