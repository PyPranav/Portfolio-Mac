import Image from 'next/image'
const WindowCloseButtons = ({CloseApp,openedApp}:{CloseApp:any,openedApp:number}) => {
    return ( 
    <div className="flex gap-3 pl-[12px] py-[12px] group transition-colors">
        {/* <div className="w-4 h-4 rounded-[20px] bg-[#fa605a]" onClick={()=>CloseApp(openedApp)}></div>
        <div className="w-4 h-4 rounded-[20px] bg-[#ffb823]" onClick={()=>CloseApp(openedApp)}></div>
        <div className="w-4 h-4 rounded-[20px] bg-[#2ac53e] cursor-not-allowed"></div> */}
        <div className="w-4 h-4 rounded-[20px] bg-[#fa605a] group-hover:bg-[#873b37]" onClick={()=>CloseApp(openedApp)}>
            <Image
            src="/close.png"
            width={500}
            height={500}
            alt="Picture of the author"
            />
        </div>   
        <div className="w-4 h-4 rounded-[20px] bg-[#ffb823] group-hover:bg-[#7a5b1a]" onClick={()=>CloseApp(openedApp)}>
            <Image
            src="/minimize.png"
            width={500}
            height={500}
            alt="Picture of the author"
            />
        </div>
        <div className="w-4 h-4 rounded-[20px] bg-[#2ac53e] group-hover:bg-[#1d6326]" onClick={()=>CloseApp(openedApp)}>
            <Image
            src="/maximize.png"
            width={500}
            height={500}
            alt="Picture of the author"
            />
        </div>
    </div> 
    );
}
 
export default WindowCloseButtons;