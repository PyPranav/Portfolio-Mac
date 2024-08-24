import { PhotoDetails } from "@/utils/photos";
import Image from "next/image";

const AlbumView = ({ type ,openedApp, appStates, setAppStates }: { type:('personal'|'certificates'|'projects'), openedApp: number, appStates: any, setAppStates: any }) => {

    return ( 
        <div className="w-[300px]">
            <div className=" w-full h-[300px] relative rounded-lg flex justify-center">
                <Image
                  unoptimized
                  src={(()=>{
                    if (type==='personal')
                        return PhotoDetails[type][appStates[5].currentPersonalPhotoIndex]?.replace('.jpg','.webp')?.replace('.png','.webp')?.replace('.jpeg','.webp')
                    else if (type==='certificates')
                        return PhotoDetails[type][appStates[5].currentCertificatesPhotoIndex]?.replace('.jpg','.webp')?.replace('.png','.webp')?.replace('.jpeg','.webp')
                    else
                        return PhotoDetails[type][appStates[5].currentProjectPhotoIndex]?.replace('.jpg','.webp')?.replace('.png','.webp')?.replace('.jpeg','.webp')

                })()}   
                  // src={'/photos/personal/6.jpg'}
                  className="ml-[8px] object-cover rounded-lg cursor-pointer"
                  onClick={()=>{
                    console.log(type)
                    setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'albumOpened': type } })

                  }}
                  onMouseMove={(e)=>{
                    const numberOfPhotos = PhotoDetails[type].length
                    const divident = 300/numberOfPhotos
                    const imgRect = (e.target as HTMLImageElement).getBoundingClientRect();
                    const x = e.clientX - imgRect.left;
                    const y = e.clientY - imgRect.top;
                    let ind = Math.floor(x/divident)
                    if (ind>=numberOfPhotos) ind=numberOfPhotos-1
                    if (ind===-1) ind = 0
                    if(type=='personal')
                        setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'currentPersonalPhotoIndex': ind } })
                    else if(type=='certificates')
                        setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'currentCertificatesPhotoIndex': ind } })
                    else
                        setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'currentProjectPhotoIndex': ind } })
                  }}
                  fill={true}
                  alt={type}
                />
            </div>
            <p className=" text-center text-lg mt-1">{type[0].toUpperCase()+type.slice(1)}</p>
            <p className="text-center opacity-70 mt-[-5px]">{PhotoDetails[type].length}</p>
          </div>
     );
}
 
export default AlbumView;