import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown'
import { getGroqResponse } from "@/utils/fetchData";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import style from '../../apps/markdown-styles.module.css';
import { recordChat } from "@/utils/supabaseServer";

const IOSGPT = ({appStates, setAppStates }: { appStates: any, setAppStates: any }) => {
    const [inputVal, setInputVal] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [location, setLocation] = useState<any>(null)

    const getClientLocation = async () => {
        const res = await fetch('https://ipinfo.io/json');
        const locationData = await res.json();
        return locationData
      };

    useEffect(() => {
        const getLocation = async () => {
            const loc = await getClientLocation()
            setLocation(loc)
        }
        getLocation()
    }, [])

    const submitQuerry = async () => {
        if (inputVal === '' || disabled)
            return

        setDisabled(true)

        const chats = appStates['gpt']['chats'] || []
        chats.push({ role: 'user', content: inputVal })
        chats.push({ role: 'assistant', content: '...' })
        recordChat(inputVal, 'user', location?.ip)
        setAppStates({ ...appStates, ['gpt']: { ...appStates['gpt'], chats: chats } })
        setInputVal('')
        const response = await getGroqResponse(chats)
        const scroller = document.getElementById('scroller')
        if (chats.length > 0){
            let c = 0;
            for(let i=1;i<=response.length/5 + 1;i++){
                chats[chats.length - 1].content = response.slice(0,i*5)
                setAppStates({ ...appStates, ['gpt']: { ...appStates['gpt'], chats: chats } })
                if (scroller)
                    scroller.scrollTop = scroller.scrollHeight
                await new Promise(resolve => setTimeout(resolve, 10))
                c++
            }
            recordChat(response, 'assistant', location?.ip)
            console.log({c, 'len': response.length})
        }
        setDisabled(false)
        
    }

    return ( 
    <div style={{
        height: '100%'
    }} className="grid bg-[#242424]  grid-rows-[1fr_54px] pb-2 text-base text-start">
        <div id={'scroller'} style={{
                            height:'100%',
                            maxHeight:'calc( 100dvh - 95px )',
                            overflowY: 'scroll'
                        }} className="pt-5 px-5">
                            {appStates['gpt'].chats.map((chat:any, key:number) => (
                                <div key={key}>
                                    {chat.role === 'user' ? (
                                        <div className="flex justify-end mb-5">
                                            <p className="w-fit p-2 px-4 bg-[#2f2f2f] rounded-full">{chat.content}</p>
                                        </div>
                                    ) : (
                                        <ReactMarkdown className={style.reactMarkDown} remarkPlugins={[remarkParse, remarkRehype]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>{chat.content}</ReactMarkdown>
                                    )}
                                </div>
                            ))}

        </div>
        <div className="h-full relative">
            <input autoFocus onKeyDown={(e:any) => {
                    if (e.key === 'Enter') {
                        submitQuerry()
                        e.target.blur();
                    }
                }} value={inputVal} onChange={(e) => setInputVal(e.target.value)} className="px-5 pr-12 border-none focus:outline-none h-full w-full bg-[#2f2f2f] rounded-full text-base" />
            <button onClick={submitQuerry} disabled={inputVal === ''|| disabled} aria-label="Send prompt" data-testid="send-button" className=" invert absolute right-2 top-[50%] translate-y-[-50%] mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary disabled:bg-[#D7D7D7]"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" className="icon-2xl"><path fill="currentColor" fillRule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clipRule="evenodd"></path></svg></button>

        </div>
    </div>
    );
}
 
export default IOSGPT;