import { getInstaDetails } from "@/utils/fetchData"
import { PersonalInfo } from "@/utils/personalInfo"
import Image from "next/image"
import { useEffect, useState } from "react"

const IOSInsta = () => {
    const [instaData, setInstaData] = useState<any>(null)
    useEffect(()=>{
        (async ()=>setInstaData( await getInstaDetails()))()
    },[])

    useEffect(()=>{
        console.log(instaData)
    },[instaData])

    return ( 
    <section style={{
        overflow:'overlay'
    }} className=" bg-black  text-white">
        {instaData&&(
            <>
                <p className="text-lg font-medium">{instaData.username}</p>
                <div className="p-4 text-base grid grid-cols-[80px_1fr]">
                    <Image
                        unoptimized
                        src={`data:image/png;base64,${instaData.profile_pic_base64}`}
                        className="object-cover rounded-[150px]"
                        height={80}
                        width={80}
                        alt={'profile pic'}
                    />
                    <div className=" w-full flex justify-evenly items-center">
                        <div className="w-[60px]">
                            <p className=" h-fit">{instaData.media_count}</p>
                            <p className="text-sm h-fit font-extralight mt-[-5px]">posts</p>
                        </div>
                        <div>
                            <p className=" h-fit">{instaData.followers}</p>
                            <p className="text-sm h-fit font-extralight mt-[-5px]">followers</p>
                        </div><div>
                            <p className=" h-fit">{instaData.following}</p>
                            <p className="text-sm h-fit font-extralight mt-[-5px]">following</p>
                        </div>
                    </div>

                </div> 
                <p className="text-sm text-start px-4">{instaData.full_name}</p>
                <p className="text-sm text-start px-4">{instaData.biography}</p>
                <a href="https://www.instagram.com/pypranav" target="_blank" className="grid place-items-center ml-4 mt-2 cursor-pointer" title="Open instagram.com">            
                    <button className="text-sm bg-[#1877f2] py-1 px-4 rounded-lg w-full">
                        Follow
                    </button>
                </a>

                <div className="grid grid-cols-3 mt-10">
                    {PersonalInfo.instaPosts.map((postUrl, key)=>(
                                <div key={key} className='realtive h-full w-full'>
                                    <Image
                                        src={postUrl}
                                        className='object-cover h-full aspect-square'
                                        // fill
                                        height={150}
                                        width={150}
                                        alt={'profile pic'}
                                    />
                                </div>
                            ))}
                </div>
            </>
        )}
        
    </section> 
);
}
 
export default IOSInsta;