import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WindowCloseButtons from "../custom/windowCloseButtons";
import { cn } from "@/lib/utils";
import { Dispatch, useEffect, useState } from "react";
import { getGithubDetails } from "@/utils/fetchData";
import { languageColors } from "@/utils/settingsOptions";
import FolderComponent from "../custom/Finder/folder";
import DocumentComponent from "../custom/Finder/document";

const Finder = ({ CloseApp, openedApp, appStates, setAppStates }: { CloseApp: (appNum: number) => void, openedApp: number, appStates: any, setAppStates: Dispatch<any> }) => {
    const [githubData, setGithubData] = useState<any[]>([])
    const [languages, setLaguages] = useState<any>({})
    useEffect(() => {
        (async () => setGithubData((await getGithubDetails())?.repos))()
    }, [])

    useEffect(() => {
        let lang = { 'Python': [] as any[], 'JavaScript': [] as any[], 'TypeScript': [] as any[] }
        githubData.forEach(element => {
            if (element.language in lang)
                lang[element.language as ('Python' | 'JavaScript' | 'TypeScript')].push({
                    'title': element.repo,
                    'readme': element.readme
                })
        });
        setLaguages(lang)

        console.log({ lang })
    }, [githubData])
    return (
        <Tabs value={appStates[openedApp]['tabValue']} onValueChange={(val) => setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'tabValue': val } })} className="grid grid-cols-[170px_2px_1fr] h-full w-full bg-black bg-opacity-85 backdrop-blur-2xl color-white">
            <TabsList className="flex flex-col h-full p-2 pt-0 items-start justify-start bg-[#2d2d2d] bg-opacity-50 overflow-hidden">
                <WindowCloseButtons CloseApp={CloseApp} openedApp={openedApp} />
                <p className="text-white opacity-40 text-xs font-medium ml-3 mt-5 mb-2">Favourites</p>
                <TabsTrigger onClick={() => {
                    setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'forwardStack': [] } })
                }} value="Home/Projects" title={'Projects'} className="w-full bg-white bg-opacity-0 data-[state=active]:bg-white data-[state=active]:bg-opacity-20 text-white data-[state=active]:text-white rounded-lg duration-200 ">
                    <div className="w-full flex gap-2">
                        <Image
                            src={'/finder/outline_folder.svg'}
                            width={20}
                            height={20}
                            alt=""
                        />
                        Projects
                    </div>
                </TabsTrigger>
                <TabsTrigger onClick={() => {
                    setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'forwardStack': [] } })
                }} value="Home/Resume" title={'Resume'} className="w-full bg-white bg-opacity-0 data-[state=active]:bg-white data-[state=active]:bg-opacity-20 text-white data-[state=active]:text-white rounded-lg duration-200 ">
                    <div className="w-full flex gap-2">
                        <Image
                            src={'/finder/doc.svg'}
                            width={20}
                            height={20}
                            alt=""
                        />
                        Resume
                    </div>
                </TabsTrigger>

                <p className="text-white opacity-40 text-xs font-medium ml-3 mt-5 mb-2">Languages</p>
                {Object.keys(languages).map((key, ind) => (
                    <TabsTrigger onClick={() => {
                        setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'forwardStack': [] } })
                    }} key={ind} value={"Home/Projects/" + key} title={key} className="w-full bg-white bg-opacity-0 data-[state=active]:bg-white data-[state=active]:bg-opacity-20 text-white data-[state=active]:text-white rounded-lg duration-200 ">
                        <div className="w-full flex gap-2 items-center">
                            <div className="h-[12px] w-[12px] rounded-xl bg-[red]" style={{
                                backgroundColor: languageColors[(key) as ('Python' | 'JavaScript' | 'TypeScript' | 'CSS')],
                            }}></div>

                            {key}
                        </div>
                    </TabsTrigger>
                ))}

            </TabsList>
            <div className="w-[2px] bg-black"></div>
            <div className="bg-[#1c1d1d] bg-opacity-100 overflow-hidden  overflow-y-scroll relative">
                <div className=" flex pl-3 items-center  w-full py-3 gap-2">
                    <div onClick={() => {
                        if (appStates[openedApp]['tabValue'] === 'Home')
                            return

                        const tabValSplit = appStates[openedApp]['tabValue'].split('/')
                        setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'tabValue': tabValSplit.slice(0, -1).join('/'), 'forwardStack': [...appStates[openedApp]['forwardStack'], tabValSplit.at(-1)] } })

                    }} className={cn("px-1 grid place-items-center rounded-sm", appStates[openedApp]['tabValue'] === 'Home' ? '' : 'bg-[white] bg-opacity-0 hover:bg-opacity-10')} >
                        <Image
                            src={'/back.svg'}
                            style={appStates[openedApp]['tabValue'] === 'Home' ? { opacity: 0.2 } : { opacity: 0.6 }}
                            className="object-cover invert "
                            height={25}
                            width={25}
                            alt={'back'}
                        />
                    </div>
                    <div onClick={() => {
                        if (appStates[openedApp]['forwardStack'].length === 0)
                            return

                        setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'tabValue': appStates[openedApp]['tabValue'] + '/' + appStates[openedApp]['forwardStack'].at(-1), 'forwardStack': appStates[openedApp]['forwardStack'].slice(0, -1) } })
                    }} className={cn("px-1 grid place-items-center rounded-sm", appStates[openedApp]['forwardStack'].length === 0 ? '' : 'bg-[white] bg-opacity-0 hover:bg-opacity-10')} >
                        <Image
                            src={'/back.svg'}
                            style={appStates[openedApp]['forwardStack'].length === 0 ? { opacity: 0.2 } : { opacity: 0.6 }}
                            className="object-cover rotate-180 rounded-xl invert"
                            height={25}
                            width={25}
                            onClick={() => {
                            }}
                            alt={'back'}
                        />
                    </div>
                    <p className="grid place-items-center">{appStates[openedApp]['tabValue'].split('/').at(-1)}</p>

                </div>

                <TabsContent className=" mb-0  overflow-hidden" value="Home">
                    <div className="w-full flex flex-wrap gap-5 mx-5">
                        <FolderComponent folderName={'Projects'} tabIndex={1} appStates={appStates} openedApp={openedApp} setAppStates={setAppStates} />
                        <FolderComponent folderName={'Resume'} tabIndex={2} appStates={appStates} openedApp={openedApp} setAppStates={setAppStates} />
                    </div>
                </TabsContent>
                <TabsContent className=" mb-0" value="Home/Projects">
                    <div className="w-full flex flex-wrap gap-5 mx-5">
                        {Object.keys(languages).map((key, ind) => (
                            <FolderComponent folderName={key} tabIndex={ind} key={ind} appStates={appStates} openedApp={openedApp} setAppStates={setAppStates} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent className=" mb-0  overflow-hidden" value="Home/Resume">
                    <div className="w-full flex flex-wrap gap-5 mx-5">
                        <DocumentComponent fileName={'Resume'} tabIndex={1} appStates={appStates} openedApp={openedApp} setAppStates={setAppStates} />
                        <DocumentComponent fileName={'Daynt_Certificate'} tabIndex={2} appStates={appStates} openedApp={openedApp} setAppStates={setAppStates} />
                    </div>
                </TabsContent>

                {Object.keys(languages).map((key, ind) => (
                    <TabsContent key={ind} className=" mb-0  overflow-hidden" value={"Home/Projects/" + key}>
                        <div className="w-full flex flex-wrap gap-5 mx-5">
                            {languages[key].map((val: {title:string, readme:string}, key: number) =>
                                <DocumentComponent key={key} fileName={val.title} content={val.readme} tabIndex={key} appStates={appStates} openedApp={openedApp} setAppStates={setAppStates} />
                            )}
                        </div>
                    </TabsContent>
                ))}

            </div>
        </Tabs>
    );
}

export default Finder;