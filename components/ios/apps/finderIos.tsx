import { cn } from "@/lib/utils";
import { getGithubDetails } from "@/utils/fetchData";
import Image from "next/image";
import { useEffect, useState } from "react";
import FinderIosFav from "../finderIosFav";
import { languageColors } from "@/utils/settingsOptions";
import { usePathname, useRouter, useSearchParams} from "next/navigation";
import DocumentComponent from "@/components/custom/Finder/document";
import IOSListContainer from "../IOSList/listContainer";
import IOSListItem from "../IOSList/listItem";

const IOSFinder = ({appStates, setAppStates}: {appStates: any, setAppStates: any}) => {

    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()

    const [githubData, setGithubData] = useState<any[]>([])
    const [languages, setLaguages] = useState<any>({})

    useEffect(()=>{
        const params = new URLSearchParams(searchParams)
        const finderAppState = params.get('finderAppState')
        console.log(finderAppState,'testinggggggggg')
        if(finderAppState){
            setAppStates({...appStates, 'finder': {...appStates['finder'], 'tabValue': finderAppState}})
        }
        else{
            setAppStates({...appStates, 'finder': {...appStates['finder'], 'tabValue': 'home'}})
        }

    },[searchParams, pathname])

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


    let render = (
        <h1>Hello</h1>
    )

    const favList = (
        
        <div className="relative">
        <div className="text-white text-xl font-bold text-left pt-5 flex flex-row justify-between" onClick={() => {
            setAppStates({...appStates, 'finder': {...appStates['finder'], 'languages_toggle': !appStates['finder']['languages_toggle']}})
        }}>
            <p>Languages</p>
            <Image
                src={'/back.svg'}
                className={cn("mr-3 object-cover rounded-xl opacity-100 cursor-pointer py-1 [filter:invert(24%)_sepia(97%)_saturate(1789%)_hue-rotate(193deg)_brightness(101%)_contrast(101%)] transition-transform duration-300 ease-in-out", appStates['finder']['languages_toggle'] ? "-rotate-90" : "-rotate-180")}
                height={25}
                width={25}
                alt={'back'}
            />
        </div>
        <IOSListContainer toggle={appStates['finder']['languages_toggle']}>
                {Object.keys(languages).map((language, index) => (
                    <IOSListItem
                        key={index}
                        onClick={()=>{
                        
                            const params = new URLSearchParams(searchParams)
                            params.set('iosApp', '1')
                            params.set('finderAppState', 'home/projects/' + language)
                            router.push(`${pathname}?${params.toString()}`)
                        }}

                        start_icon={
                            <div className=" h-4 w-4 rounded-full" style={{backgroundColor: languageColors[language as keyof typeof languageColors]}}></div>
                        }
                        end_icon={
                            <Image
                            className="rotate-180 invert opacity-40 py-1 h-full "
                            src={'/back.svg'}
                            height={25}
                            width={25}
                            alt={'back'}
                        />
                        }
                        label={language}
                        last={index===Object.keys(languages).length-1}
                    ></IOSListItem>
                ))}
        </IOSListContainer>
    </div>
    )

    if(appStates['finder']['tabValue']==='home'){
        render = ( 
            <div className="bg-black h-full p-5 rounded-[12px] text-base">
                <p className="text-white text-3xl font-bold text-left pt-0">Browse</p>
                <FinderIosFav appStates={appStates} setAppStates={setAppStates} searchParams={searchParams}/>
                {favList}
            </div>
         );
    }

    else if(appStates['finder']['tabValue']==='home/projects'){
        render = (
            <div className="bg-black h-full p-5 rounded-[12px] text-base">
                <div className="flex flex-row" onClick={() => {
                    const params = new URLSearchParams(searchParams)
                    params.set('iosApp', '1')
                    let cur = params.get('finderAppState')
                    if(cur){
                        let curArr = cur.split('/')
                        curArr.pop()
                        params.set('finderAppState', curArr.join('/'))
                    }
                    else
                        params.set('finderAppState', 'home')
                    router.push(`${pathname}?${params.toString()}`)
                }}>
                    <Image
                            src={'/back.svg'}
                            className={cn("mr-1 object-cover rounded-xl opacity-100 cursor-pointer py-1 invert")}
                            height={25}
                            width={25}
                            alt={'back'}
                        />
                    <p className="text-white text-3xl font-bold text-left pt-0">Projects</p>
                </div>
                {favList}
            </div>
        )
    }
    else if(appStates['finder']['tabValue']==='home/resume'){
        render = (
            <div className="bg-black h-full p-5 rounded-[12px] text-base">
                <div className="flex flex-row" onClick={() => {
                    const params = new URLSearchParams(searchParams)
                    params.set('iosApp', '1')
                    let cur = params.get('finderAppState')
                    if(cur){
                        let curArr = cur.split('/')
                        curArr.pop()
                        params.set('finderAppState', curArr.join('/'))
                    }
                    else
                        params.set('finderAppState', 'home')
                    router.push(`${pathname}?${params.toString()}`)
                }}>
                    <Image
                            src={'/back.svg'}
                            className={cn("mr-1 object-cover rounded-xl opacity-100 cursor-pointer py-1 invert")}
                            height={25}
                            width={25}
                            alt={'back'}
                        />
                    <p className="text-white text-3xl font-bold text-left pt-0">Resume</p>
                </div>
                <div className="grid grid-cols-3 gap-5 mt-5">
                    <DocumentComponent fileName={'Resume'} tabIndex={1} appStates={appStates} openedApp={'finder'} setAppStates={setAppStates} mobile={true} />
                    <DocumentComponent fileName={'Daynt_Certificate'} tabIndex={2} appStates={appStates} openedApp={'finder'} setAppStates={setAppStates} mobile={true} />
                </div>
            </div>
        )
    }

    else if(appStates['finder']['tabValue'].startsWith('home/projects/')){
        const lang = appStates['finder']['tabValue'].split('/').pop(-1)
        console.log('LANG',lang)
        if (lang && languages.hasOwnProperty(lang)){
        render = (
            <div className="bg-black h-full p-5 rounded-[12px] text-base">
                <div className="flex flex-row" onClick={() => {
                    const params = new URLSearchParams(searchParams)
                    params.set('iosApp', '1')
                    let cur = params.get('finderAppState')
                    if(cur){
                        let curArr = cur.split('/')
                        curArr.pop()
                        params.set('finderAppState', curArr.join('/'))
                    }
                    else
                        params.set('finderAppState', 'home')
                    router.push(`${pathname}?${params.toString()}`)
                }}>
                    <Image
                            src={'/back.svg'}
                            className={cn("mr-1 object-cover rounded-xl opacity-100 cursor-pointer py-1 invert")}
                            height={25}
                            width={25}
                            alt={'back'}
                        />
                    <p className="text-white text-3xl font-bold text-left pt-0">{lang}</p>
                </div>
                <div className="grid grid-cols-3 gap-5 mt-5">
                    {languages[lang as keyof typeof languages].map((language:any, index:number) => (
                        <DocumentComponent mobile={true} key={index} fileName={language.title} content={language.readme} tabIndex={index+1} appStates={appStates} openedApp={'finder'} setAppStates={setAppStates}/>
                    ))}
                </div>
            </div>
        )
        }
        else{
            render = (
                <div className="bg-black h-full p-5 rounded-[12px] text-base">
                    <p className="text-white text-3xl font-bold text-left pt-0">Projects</p>
                </div>
            )
        }
    }

    return render
}
 
export default IOSFinder;