import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WindowCloseButtons from "../custom/windowCloseButtons";
import { Input } from "../ui/input";
import Image from "next/image";
import InstagramPage from "../custom/ArcPages/instagram";
import GithubPage from "../custom/ArcPages/github";
function SearchIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}

const getLink = (val:string)=>{
    if (['instagram', 'x', 'github', 'linkedin'].includes(val))
        return val+'.com'
    return ''
}

const ArcPage = ({ CloseApp, openedApp, appStates, setAppStates }: { CloseApp: any, openedApp: number, appStates: any, setAppStates: any }) => {
    return (
        <Tabs value={appStates[openedApp]['tabValue']} onValueChange={(val) => setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'tabValue': val } })} className="grid grid-cols-[170px_1fr] h-full w-full bg-black bg-opacity-85 backdrop-blur-2xl color-white">
            <TabsList className="flex flex-col h-full p-2 pt-0 items-start justify-start bg-[#292929] bg-opacity-0 overflow-scroll">
                    <div className="flex w-full">
                        <WindowCloseButtons CloseApp={CloseApp} openedApp={openedApp} />
                        <div className="flex w-full justify-center">
                            <div className="grid place-items-center" >
                                <Image
                                src={'/back.svg'}
                                className="object-cover rounded-xl  invert opacity-35 cursor-pointer"
                                height={25}
                                width={25}
                                alt={'back'}
                                />
                            </div>
                            <div className="grid place-items-center">
                                <Image
                                src={'/back.svg'}
                                className="object-cover rotate-180 rounded-xl  invert opacity-35 cursor-pointer"
                                height={25}
                                width={25}
                                alt={'back'}
                                />
                            </div>
                        </div>
                    </div>
                    <Input
                        type="search"
                        disabled
                        value={getLink(appStates[openedApp]['tabValue'])}
                        placeholder="Search"
                        className=" text-xs my-2 w-full rounded-xl border border-[#2f2f2f] bg-white bg-opacity-20 px-4 py-2 text-white focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
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

                <TabsTrigger className="flex w-full gap-2 justify-start py-2 data-[state=active]:bg-white data-[state=active]:bg-opacity-20 text-white data-[state=active]:text-white rounded-xl " value="account">
                    <Image
                    src={'/back.svg'}
                    className="object-cover rounded-lg  invert opacity-35 "
                    height={20}
                    width={20}
                    alt={'back'}
                    />
                    <p>Account</p>

                </TabsTrigger>
                
            </TabsList>
            {/* <div className="bg-black"></div> */}

            <TabsContent className="mb-2 mr-2 rounded-lg overflow-scroll" value="instagram">
                <InstagramPage/>
            </TabsContent>
            <TabsContent className="mb-2 mr-2 rounded-lg overflow-scroll" value="github">
                <GithubPage/>
            </TabsContent>
            <TabsContent className="bg-white mb-2 mr-2 rounded-lg" value="password">Change your password here.</TabsContent>
        </Tabs>
    );
}

export default ArcPage;