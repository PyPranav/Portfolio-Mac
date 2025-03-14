import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react";
import MarkdownDisplay from "../markDownDisplay";
import { cn } from "@/lib/utils";
  

const DocumentComponent = ({ openedApp, appStates, setAppStates, tabIndex, fileName, content, mobile=false }: { openedApp: any, appStates: any, setAppStates: any, tabIndex:number, fileName:string, content?:string, mobile?:boolean}) => {
    console.log({content})
    return ( 
        <div tabIndex={tabIndex} className=" group rounded focus:bg-white focus:bg-opacity-10  flex flex-col items-center" onClick={()=>{
            if(mobile && appStates[openedApp].openedDoc === null){
                setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'openedDoc':fileName} })
            }
        }} onDoubleClick={()=>{
            if(!mobile){
                setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'openedDoc':fileName} })
            }
        }}>
            <Image
                src='/finder/pdfIcon.png'
                alt=""
                height={90}
                width={90}
            />
            <p className="text-sm text-center group-focus:bg-blue-700 rounded text-wrap max-w-[90px]">{fileName.split(/[-,_]/).join(' ')}</p>
            <Dialog open={appStates[openedApp].openedDoc === fileName} onOpenChange={()=>setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'openedDoc':null} })}>
                <DialogContent className={cn("bg-[#0d1117] w-[60%] max-w-[60%]", mobile&&"w-full max-w-full ")}>
                    <DialogTitle className="sticky [&>svg]:size-10">{fileName}</DialogTitle>
                    <DialogDescription className={cn(" overflow-y-scroll max-h-[80vh]", mobile&&"max-h-[65vh]")}>
                        {content&&(
                            <MarkdownDisplay markdownContent={content}/>
                        )}
                        {!content&&(
                             <iframe
                             src={'/finder/'+fileName+'.pdf'}
                             width="100%"
                             className="max-h-[80vh] h-[80vh] rounded"
                           />
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>
            
        </div>
     );
}
 
export default DocumentComponent;