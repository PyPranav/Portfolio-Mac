'use client'
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const TwitterPage = () => {
    const [tweets, setTweets] = useState<any>([])
    useEffect(()=>{
        (async ()=>{
            const { data } = await supabase.from("tweets").select('*').eq('blocked', 'false');
            console.log({data})
            setTweets(data);
        })()
    },[])
    return ( 
        <section className=" bg-black h-full text-white overflow-y-scroll px-20">
            {tweets?.map((row:any)=>(
                <pre key={row.id}>{row.tweet}</pre>
            ))}
        </section>
     );
}
 
export default TwitterPage;