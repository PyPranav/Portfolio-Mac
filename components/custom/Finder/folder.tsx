import Image from "next/image";

const FolderComponent = ({ openedApp, appStates, setAppStates, tabIndex, folderName }: { openedApp: number, appStates: any, setAppStates: any, tabIndex:number, folderName:string}) => {
    return ( 
    
        <div tabIndex={tabIndex} className=" group rounded focus:bg-white focus:bg-opacity-10  flex flex-col items-center" onDoubleClick={()=>{
            setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'tabValue': appStates[openedApp]['tabValue']+'/'+folderName, 'forwardStack':[] } })
        }}>
            <Image
                src='/finder/folder.png'
                alt=""
                height={90}
                width={90}
            />
            <p className="text-sm text-center group-focus:bg-blue-700 rounded">{folderName}</p>
            
        </div>
     );
}
 
export default FolderComponent;