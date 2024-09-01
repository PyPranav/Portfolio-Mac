import WindowCloseButtons from "../custom/windowCloseButtons";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown'
import { getGroqResponse } from "@/utils/fetchData";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import style from './markdown-styles.module.css';

const GPTPage = ({ CloseApp, openedApp, appStates, setAppStates }: { CloseApp: any, openedApp: number, appStates: any, setAppStates: any }) => {
    const [inputVal, setInputVal] = useState('')
    const [delayLoad, setDelayLoad] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const submitQuerry = async () => {
        if (inputVal === '' || disabled)
            return

        setDisabled(true)

        const chats = (appStates[openedApp] as personalGptType)['chats'] || []
        chats.push({ role: 'user', content: inputVal })
        chats.push({ role: 'assistant', content: '...' })
        setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], chats: chats } })
        setInputVal('')
        const response = await getGroqResponse(chats)

        if (chats.length > 0){
            let c = 0;
            for(let i=1;i<=response.length/5 + 1;i++){
                chats[chats.length - 1].content = response.slice(0,i*5)
                setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], chats: chats } })
                await new Promise(resolve => setTimeout(resolve, 10))
                c++
            }
            console.log({c, 'len': response.length})
        }
        setDisabled(false)
        
    }

    useEffect(() => {
        setTimeout(() => setDelayLoad(true), 250)
    }, [])

    return (
        <div className="h-full bg-[#242424] overflow-hidden">
            <div className="bg-[#242424] p-5 flex items-center relative">
                <div className=" absolute">
                    <WindowCloseButtons CloseApp={CloseApp} openedApp={openedApp} />
                </div>

                <p className='w-full text-center'>Personal GPT</p>
                <button title="Clear Chat" onClick={() => {
                    setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], chats: [] } })
                    toast({
                        title: "Chat Cleared!",
                        duration: 1000,
                        className: 'rounded-xl w-fit fixed top-20 right-2 p-3 bg-gray-500 text-white border-0'
                    })
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="icon-xl-heavy"><path fill="currentColor" d="M3.07 10.876C3.623 6.436 7.41 3 12 3a9.15 9.15 0 0 1 6.012 2.254V4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1H15a1 1 0 1 1 0-2h1.957A7.15 7.15 0 0 0 12 5a7 7 0 0 0-6.946 6.124 1 1 0 1 1-1.984-.248m16.992 1.132a1 1 0 0 1 .868 1.116C20.377 17.564 16.59 21 12 21a9.15 9.15 0 0 1-6-2.244V20a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H7.043A7.15 7.15 0 0 0 12 19a7 7 0 0 0 6.946-6.124 1 1 0 0 1 1.116-.868"></path></svg>
                </button>

            </div>
            {delayLoad && (
                <div className="bg-[#212121] text-white  h-full pb-[150px] rounded-[12px] flex justify-center">
                    <div className="h-full w-[780px] max-w-full">

                        <div style={{
                            height: 'calc( 100% - 52px )',
                            maxHeight: 'calc( 100% - 52px )',
                            overflowY: 'scroll'
                        }} className="pt-5 px-5">
                            {(appStates[openedApp] as personalGptType).chats.map((chat, key) => (
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
                        <div className="h-[52px] relative">
                            <input autoFocus onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    submitQuerry()
                                }
                            }} value={inputVal} onChange={(e) => setInputVal(e.target.value)} className="px-5 pr-12 border-none focus:outline-none h-full w-full bg-[#2f2f2f] rounded-full" />
                            <button onClick={submitQuerry} disabled={inputVal === ''|| disabled} aria-label="Send prompt" data-testid="send-button" className=" invert absolute right-2 top-[50%] translate-y-[-50%] mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary disabled:bg-[#D7D7D7]"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" className="icon-2xl"><path fill="currentColor" fillRule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clipRule="evenodd"></path></svg></button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default GPTPage;