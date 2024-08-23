import { getGithubDetails } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import MarkdownDisplay from "../markDownDisplay";
import Image from "next/image";
import { PersonalInfo } from "@/utils/personalInfo";




const GithubPage = () => {
    const [githubData, setGithubData] = useState<any>(null)
    useEffect(()=>{
        (async ()=>setGithubData( await getGithubDetails()))()
    },[])
    const langColor = {
        'Python':'#f1e05a',
        'JavaScript':'#3572a5',
        'CSS':'#563d7c',
        'TypeScript':'#3178c6'
    }
    return ( 
        <section className=" bg-[#0d1117] h-full text-white overflow-scroll">
            <div className="bg-[#010409] p-5 flex items-center gap-5">
                <Image
                    src={'/arc/githubLogo.png'}
                    className="object-cover rounded-xl cursor-pointer"
                    height={32}
                    width={32}
                    alt={'back'}
                />
                <p className=" font-medium text-base">PyPranav</p>
            </div>
            <hr className="border-[#30363d]"/>
            <div className="grid place-items-center mb-20">
                {(githubData&&(
                    <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr]">
                        <div className="my-7 mx-7">
                            <div className="flex justify-center">
                                <div>
                                    <Image
                                        src={githubData?.avatar_url}
                                        className="object-cover rounded-[300px] cursor-pointer"
                                        height={296}
                                        width={296}
                                        alt={'Profile'}
                                    />
                                    <p className="mt-5 text-2xl font-semibold">{githubData?.name??''}</p>
                                    <p className="font-thin text-lg">{githubData?.login??''}</p>
                                    <a href="https://www.github.com/pypranav" title='Open github.com' target="_blank">
                                        <button className="mt-5 w-full font-light text-sm bg-[#21262d] p-2 rounded-lg border-[#30363d] border-[1px]">Follow</button>
                                    </a>
                                    <p className="text-sm mt-5 mb-7 flex items-center gap-2">
                                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                                            <path fill="#8d96a0" d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
                                        </svg>
                                        <p>{githubData.followers} <span className="font-thin">followers</span> · {githubData.following} <span className="font-thin">following</span></p>
                                    </p>
                                </div>
                            </div>
                            
                                

                        


                            
                            <hr className="border-[#30363d]"/>
                            <p className="mt-5 font-semibold mb-2">Achivements</p>
                            <div className="flex flex-wrap gap-1">
                                {PersonalInfo.gihubAchivements.map((url, key)=>(
                                    <Image
                                        key={key}
                                        src={url}
                                        className="object-cover"
                                        height={64}
                                        width={64}
                                        alt={'Achivement'}
                                    />
                                ))}
                            </div>

                            

                            

                        </div>
                        <div>
                            <div className="p-5 bg-[#0d1117] rounded-lg my-7 mr-7 ml-7 lg:ml-0 border-[#30363d] border-[1px] max-w-[896px]">
                                <p className="text-xs mb-5 font-extralight ">PyPranav / README<span className=" opacity-70 ">.md</span></p>
                                <MarkdownDisplay markdownContent={githubData?.profile_readme??''}/>
                                
                            </div>
                            <p className="text-white mb-2 ml-7 lg:ml-0">Pinned</p>
                            <div className="grid grid-cols-2 gap-2 mr-7 ml-7 lg:ml-0 max-w-[896px]">
                                {githubData?.repos?.map((repo:any, key:number)=>(
                                    <div key={key} className="border-[#30363d] border-[1px]  rounded-lg p-5 ">
                                        <div className="flex gap-3 items-center ">
                                            <svg className="" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                                                <path fill="#8d96a0" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                                            </svg>
                                            <a className="text-[#3c83db] hover:underline" href={repo?.url} title={repo?.url} target='_blank'>{repo?.repo}</a>
                                            <p className="text-[rgb(141,150,160)] border-[#30363d] border-[1px] rounded-xl p-1  text-xs">Public</p>
                                            
                                        </div>
                                        <p className="text-[#8d96a0] text-xs font-light mt-2 truncate min-h-4">{repo?.description}</p>
                                        <div className="flex mt-3 items-center gap-1">
                                            <div className="h-[12px] w-[12px] rounded-xl bg-[red]" style={{
                                                backgroundColor:langColor[(repo?.language) as ('Python'|'JavaScript'|'TypeScript'|'CSS')],
                                            }}></div>
                                            <p className="text-[#8d96a0] text-xs font-light">{repo?.language}</p>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                        </div>

                        

                    </div>
                ))}
                
            </div>
        </section>
     );
}
 
export default GithubPage;