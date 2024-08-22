import { getGithubDetails } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import MarkdownDisplay from "../markDownDisplay";




const GithubPage = () => {
    const [githubData, setGithubData] = useState<any>(null)
    useEffect(()=>{
        (async ()=>setGithubData( await getGithubDetails()))()
    },[])
    return ( 
        <section className=" bg-black h-full text-white overflow-scroll">
            <MarkdownDisplay markdownContent={githubData?.profile_readme??''}/>
        </section>
     );
}
 
export default GithubPage;