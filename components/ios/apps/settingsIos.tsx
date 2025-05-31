import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import IOSListContainer from "../IOSList/listContainer";
import Image from "next/image";
import IOSListItem from "../IOSList/listItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonalInfo } from "@/utils/personalInfo";
import IOSAppleIdSettings from "./settingsPages/appleId";
import IOSHomeSettings from "./settingsPages/home";
import IOSWifiSettings from "./settingsPages/wifi";
import IOSBluetoothSettings from "./settingsPages/bluetooth";
import IOSStatsSettings from "./settingsPages/stats";
import IOSWallpaperSettings from "./settingsPages/wallpaper";

const IOSSettings = ({ appStates, setAppStates }: { appStates: any, setAppStates: any }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()


    useEffect(() => {
        const params = new URLSearchParams(searchParams)

        const settingsAppState = params.get('settingsAppState')
        console.log(settingsAppState, 'testinggggggggg')
        if (settingsAppState) {
            setAppStates({ ...appStates, 'settings': { ...appStates['settings'], 'tabValue': settingsAppState } })
        }
        else {
            setAppStates({ ...appStates, 'settings': { ...appStates['settings'], 'tabValue': 'home' } })
        }

    }, [searchParams, pathname])

    const changeAppState = (newState?: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('iosApp', '2')
        if (newState)
            params.set('settingsAppState', newState)
        else
            params.delete('settingsAppState')
        router.push(`${pathname}?${params.toString()}`)
    }
    let render = <></>
    
    switch (appStates["settings"]["tabValue"]) {
        case 'home':
            render = <IOSHomeSettings changeAppState={changeAppState} />
            break
        case 'about':
            render = <IOSAppleIdSettings changeAppState={changeAppState} />
            break
        case 'skills':
            render = <IOSWifiSettings changeAppState={changeAppState} appStates={appStates} setAppStates={setAppStates} />
            break
        case 'experience':
            render=<IOSBluetoothSettings changeAppState={changeAppState} appStates={appStates} setAppStates={setAppStates} />
            break
        case 'website':
            render=<IOSStatsSettings changeAppState={changeAppState} appStates={appStates} setAppStates={setAppStates} />
            break
        case 'wallpaper':
            render=<IOSWallpaperSettings changeAppState={changeAppState} appStates={appStates} setAppStates={setAppStates} />
            break
        default:
            render = <></>
    }
    return (
        <div className="bg-black h-full p-5 rounded-[12px] text-base">
            {render}
        </div>
    );
}

export default IOSSettings;