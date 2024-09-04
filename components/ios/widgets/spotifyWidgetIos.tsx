import { getPlayigSong } from "@/utils/fetchData";
import { PersonalInfo } from "@/utils/personalInfo";
import Image from "next/image";
import { useEffect, useState } from "react";

const IOSSpotifyWidget = ({ loaded }: { loaded: boolean }) => {
    const [playingSong, setPlayingSong] = useState<any>(null)
    const [ind, setInd] = useState(0);


    useEffect(() => {
        const setSong = async () => { setPlayingSong(await getPlayigSong()) }
        setSong()
        // const intervalId = setInterval(setSong,20000)
        // return ()=> clearInterval(intervalId)
    }, [])

    useEffect(() => {
        if (!playingSong || !loaded)
          return
        new Promise(resolve => setTimeout(resolve, 20)).then(() => {
          if (ind <= Math.max(playingSong?.track_name?.length ?? 0, playingSong?.artist_name?.length ?? 0, 'Currently listening to'.length))
            setInd(ind + 1)
    
        })
      }, [ind, playingSong, loaded])
    return (
        <div className="col-span-2 row-span-2 flex flex-col gap-1 items-center justify-center">
            <div style={{
                textShadow: "0px 0px 15px black, 0px 0px 30px black, 0px 0px 45px black"
                // textShadow:" 10px 10px 20px #000000, 10px 10px 20px #000000, 10px 10px 20px #000000"
            }} className="w-[40vw] aspect-square relative rounded-3xl ">
                <Image
                    unoptimized
                    src={playingSong?.image ?? "/musicNone.jpg"}
                    alt="profile"
                    className="rounded-3xl object-cover"
                    fill
                />
                <div className="absolute inset-0 rounded-3xl flex justify-start items-end">
                    <div className="p-3 ">
                        <p className="text-xs text-[0.6rem] text-start font-light">{playingSong?.playing ? "Currently listening to".slice(0, ind) : "Last listened to".slice(0, ind)}</p>
                        <p className="text-sm text-start text-nowrap font-semibold">{(playingSong?.track_name.slice(0, ind) ?? '').length>16?(playingSong?.track_name.slice(0, ind) ?? '').slice(0,16)+'...':(playingSong?.track_name.slice(0, ind) ?? '')}</p>
                    </div>

                </div>
            </div>
            <p className="text-xs">Spotify</p>
        </div>
    );
}

export default IOSSpotifyWidget;