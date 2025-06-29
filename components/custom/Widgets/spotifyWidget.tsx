import { getPlayigSong } from "@/utils/fetchData";
import Image from "next/image";
import { useEffect, useState } from "react";

const SpotifyWidget = ({ loaded }: { loaded: boolean }) => {
  const [playingSong, setPlayingSong] = useState<any>(null)

  useEffect(() => {
    const setSong = async () => { setPlayingSong(await getPlayigSong()) }
    setSong()
    // const intervalId = setInterval(setSong,20000)
    // return ()=> clearInterval(intervalId)
  }, [])

  const [ind, setInd] = useState(0);
  useEffect(() => {
    if (!playingSong || !loaded)
      return
    new Promise(resolve => setTimeout(resolve, 10)).then(() => {
      if (ind <= Math.max(playingSong?.track_name?.length ?? 0, playingSong?.artist_name?.length ?? 0, 'Currently listening to'.length))
        setInd(ind + 1)

    })
  }, [ind, playingSong, loaded])

  useEffect(() => {
    console.log(playingSong)
  }, [playingSong])

  return (
    <div style={{fontFamily: "San Francisco"}} className='w-full group relative' title={(playingSong?.track_name ?? '') + ' - ' + (playingSong?.artist_name ?? '')}>
      <Image
        src={"/spotify.png"}
        className="object-cover rounded-2xl absolute top-5 right-5 z-[5] opacity-80 group-hover:opacity-100 duration-500"
        height={30}
        width={30}
        alt={'thumbnail'}
      />
      <div className="flex gap-5 h-full bg-black bg-opacity-10 backdrop-blur-[100px] rounded-2xl p-4 text-white">
        <div className="opacity-80 group-hover:opacity-100 relative aspect-square h-full duration-500">
          <Image
            unoptimized
            src={playingSong?.image ?? "/musicNone.jpg"}
            className="object-cover rounded-2xl "
            // height={300}
            // width={300}
            fill={true}
            alt={'thumbnail'}
          />
        </div>
        {playingSong && (
          <>

            {/* <div className="text-6xl text-[6rem] font-bold opacity-80">{dayOfMonth}</div> */}
            <div className="flex flex-col w-full justify-between my-2">
              <div>
                <p className="text-sm opacity-50 font-light text-start">{playingSong?.playing ? "Currently listening to".slice(0, ind) : "Last listened to".slice(0, ind)}</p>
                <p className=" text-start text-lg opacity-80 font- font-medium group-hover:opacity-100 duration-500 truncate w-[15ch]  sm:w-[17ch]">
                  {playingSong?.track_name.slice(0, ind) ?? ''}
                </p>

                <p className=" text-start text-lg opacity-50 font-light truncate w-[19ch]">{playingSong?.artist_name.slice(0, ind) ?? ""}</p>
              </div>

              <div style={{
                opacity: Math.min(ind / Math.max(playingSong?.track_name?.length ?? 0, playingSong?.artist_name?.length ?? 0, 'Currently listening to'.length), 0.8)
              }} className="audiogram opacity-80 group-hover:opacity-100 duration-500">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SpotifyWidget;