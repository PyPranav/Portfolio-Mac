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
  

const DocumentComponent = ({ openedApp, appStates, setAppStates, tabIndex, fileName, content }: { openedApp: number, appStates: any, setAppStates: any, tabIndex:number, fileName:string, content?:string}) => {
    console.log({content})
    const [openDoc, setOpenDoc] = useState(false)
    return ( 
        <div tabIndex={tabIndex} className=" group rounded focus:bg-white focus:bg-opacity-10  flex flex-col items-center" onDoubleClick={()=>{
           setOpenDoc(true  )
        }}>
            <Image
                src='/finder/pdfIcon.png'
                alt=""
                height={90}
                width={90}
            />
            <p className="text-sm text-center group-focus:bg-blue-700 rounded text-wrap max-w-[90px]">{fileName.split(/[-,_]/).join(' ')}</p>
            <Dialog open={openDoc} onOpenChange={()=>setOpenDoc(!openDoc)}>
                <DialogContent className="bg-[#0d1117] w-[60%] max-w-[60%]">
                    <DialogTitle className="sticky">{fileName}</DialogTitle>
                    <DialogDescription className={" overflow-y-scroll max-h-[80vh]"}>
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