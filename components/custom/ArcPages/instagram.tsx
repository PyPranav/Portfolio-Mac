import { getInstaDetails } from "@/utils/fetchData";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PersonalInfo } from "@/utils/personalInfo";

const InstagramPage = () => {
    const [instaData, setInstaData] = useState<any>(null)
    useEffect(()=>{
        (async ()=>setInstaData( await getInstaDetails()))()
    },[])

    useEffect(()=>{
        console.log(instaData)
    },[instaData])
    return ( 
        <section className=" bg-black h-full text-white overflow-scroll px-20">
            <div className="grid place-items-center p-5">
                <Image
                    src={'/arc/instagramFullLogo.png'}
                    className="object-cover"
                    height={150}
                    width={150}
                    alt={'instagram'}
                    />
            </div>
            <div className="grid place-items-center">
                <hr className="opacity-20 mb-10 w-full max-w-[900px]" />
            </div>
            {instaData&&(
                <>
                    <div className="flex justify-center mb-10">
                        <div className="flex gap-[100px]">
                            <div>
                                <Image
                                    src={instaData.profile_pic_url}
                                    className="object-cover rounded-[150px]"
                                    height={150}
                                    width={150}
                                    alt={'profile pic'}
                                />
                            </div>
                            <div className="w-[400px]">
                                <p className=" text-xl mb-5 flex">
                                    {instaData.username}
                                    <a href="https://www.instagram.com/pypranav" target="_blank" className="grid place-items-center ml-5 cursor-pointer" title="Open instagram.com">
                                        <Image
                                            src='/newTab.png'
                                            className="object-cover invert"
                                            height={15}
                                            width={15}
                                            alt={'profile pic'}
                                        />
                                    </a>
                                </p>
                                <div className="flex justify-between mb-5">
                                    <p><b>{instaData.media_count}</b> posts</p>
                                    <p><b>{instaData.followers}</b> followers</p>
                                    <p><b>{instaData.following}</b> following</p>
                                </div>
                                <p>{instaData.full_name}</p>
                                <p>{instaData.biography}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid place-items-center">
                        <hr className="opacity-20 mb-10 w-full max-w-[900px]" />
                        <div className="mb-10 w-full max-w-[900px] flex flex-wrap gap-[6px] justify-center xl:justify-start ">
                            {PersonalInfo.instaPosts.map((postUrl, key)=>(
                                <div className='relative before:hover:bg-opacity-40 before:bg-opacity-0 before:content-[""] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:z-30'>
                                    <Image
                                        key={key}
                                        src={postUrl}
                                        className='object-cover h-[296px] w-[296px] '
                                        height={296}
                                        width={296}
                                        alt={'profile pic'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </>
                
            )}
            
        </section>
     );
}
 
export default InstagramPage;