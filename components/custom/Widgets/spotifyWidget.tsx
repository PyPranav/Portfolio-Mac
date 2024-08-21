import { getPlayigSong } from "@/utils/fetchData";
import Image from "next/image";
import { useEffect, useState } from "react";

const SpotifyWidget = () => {
  const [playingSong, setPlayingSong] = useState<any>(null)
  
  useEffect(()=>{
    const setSong = async()=> {setPlayingSong(await getPlayigSong())}
    setSong()
    const intervalId = setInterval(setSong,20000)
    return ()=> clearInterval(intervalId)
  },[])

  useEffect(()=>{
    console.log(playingSong)
  },[playingSong])

    return ( 
        <div className='w-full group relative'  title={(playingSong?.track_name??'')+' - '+(playingSong?.artist_name??'')}>
                  <Image
                      src={"/spotify.png"}
                      className="object-cover rounded-2xl absolute top-5 right-5 z-[5] opacity-80 group-hover:opacity-100 duration-500"
                      height={30}
                      width={30}
                      alt={'thumbnail'}
                    />
              <div className="flex gap-5 h-full bg-gray-500 bg-opacity-70 backdrop-blur rounded-2xl p-4 text-white">
                  <div className="opacity-80 group-hover:opacity-100 relative aspect-square h-full duration-500">
                    <Image
                      src={playingSong?.image??"/musicNone.jpg"}
                      className="object-cover rounded-2xl "
                      // height={300}
                      // width={300}
                      fill={true}
                      alt={'thumbnail'}
                    />
                  </div>
                  {/* <div className="text-6xl text-[6rem] font-bold opacity-80">{dayOfMonth}</div> */}
                  <div className="flex flex-col w-full justify-between my-2">
                    <div>
                      <p className="text-sm opacity-50 font-light">{playingSong?.playing?"Currently listening to":"Last listened to"}</p>
                      <p className="text-lg opacity-80 font-medium group-hover:opacity-100 duration-500 truncate w-[17ch]">
                        {playingSong?.track_name ?? ''}
                      </p>

                      <p className="text-lg opacity-50 font-light truncate w-[19ch]">{playingSong?.artist_name??""}</p>
                    </div>

                    <div className="audiogram opacity-80 group-hover:opacity-100 duration-500">
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
              </div>    
            </div>
     );
}
 
export default SpotifyWidget;