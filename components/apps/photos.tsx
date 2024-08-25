import Image from "next/image";
import WindowCloseButtons from "../custom/windowCloseButtons";
import { PhotoDetails } from "@/utils/photos";
import AlbumView from "../custom/PhotosComponents/albumView";
import { useEffect, useState } from "react";

const PhotosApp = ({ CloseApp, openedApp, appStates, setAppStates }: { CloseApp: any, openedApp: number, appStates: any, setAppStates: any }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [photoWidth, setPhotoWidth] = useState(0)

  useEffect(() => {
    const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void => {
      let timeoutId: ReturnType<typeof setTimeout> | undefined;

      return (...args: Parameters<T>) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    const handleResize = () => {
      let winWidth = window.innerWidth
      let numberOfPhotoPerRow = 0
      if (winWidth >= 1600)
        numberOfPhotoPerRow = 5
      else if (winWidth >= 1450)
        numberOfPhotoPerRow = 4
      else if (winWidth >= 1000)
        numberOfPhotoPerRow = 3
      else if (winWidth >= 750)
        numberOfPhotoPerRow = 2
      else
        numberOfPhotoPerRow = 1

      let availWidth = winWidth - 80 - 40 * (numberOfPhotoPerRow - 1)
      let perPhotoWidth = availWidth / numberOfPhotoPerRow

      setPhotoWidth(perPhotoWidth)
      console.log('hey')


    };
    handleResize()
    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener('resize', debouncedHandleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);



  return (
    <div className="bg-[#232323] h-full overflow-scroll flex flex-col">
      <div className=" sticky top-0 z-[1000] bg-[#232323] mb-5">
        <div className="bg-[#1f1f1f] p-5 flex items-center relative">
          <div className=" absolute">
            <WindowCloseButtons CloseApp={CloseApp} openedApp={openedApp} />
          </div>
          {appStates[5].albumOpened === null && <p className='w-full text-center'>Albums</p>}
          {appStates[5].albumOpened !== null && <p className='w-full text-center'>{appStates[5].albumOpened[0].toUpperCase() + appStates[5].albumOpened.slice(1)}</p>}

        </div>
        <hr className="border-black" />
        <div className="p-5">
          {appStates[5].albumOpened === null && (
            <>
              <div className="flex gap-5">
                <Image
                  src={'/back.svg'}
                  // src={'/photos/personal/6.jpg'}
                  className="object-cover rounded-lg  invert opacity-35 cursor-not-allowed"
                  height={30}
                  width={30}
                  alt={'back'}
                />
                <p className="text-2xl font-bold ">My Albums</p>
              </div>
              <p className="text-sm opacity-70 mt-2 ml-[50px]">3 Albums</p>
            </>

          )}
          {appStates[5].albumOpened !== null && appStates[5].photoOpened === null && (
            <>
              <div className="flex gap-5">
                <Image
                  src={'/back.svg'}
                  className="object-cover rounded-lg cursor-pointer invert"
                  onClick={() => {
                    console.log('back')
                    setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'albumOpened': null } })

                  }}
                  height={30}
                  width={30}
                  alt={'back'}
                />
                <p className="text-2xl font-bold ">{appStates[5].albumOpened[0].toUpperCase() + appStates[5].albumOpened.slice(1)}</p>
              </div>
              <p className="text-sm opacity-70 mt-2 ml-[50px]">{PhotoDetails[(appStates[5].albumOpened) as 'personal' | 'certificates' | 'projects'].length} Images</p>
            </>
          )}

          {appStates[5].albumOpened !== null && appStates[5].photoOpened !== null && (
            <>
              <div className="flex gap-5">
                <Image
                  src={'/back.svg'}
                  className="object-cover rounded-lg cursor-pointer invert"
                  onClick={() => {
                    console.log('back')
                    setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'photoOpened': null } })

                  }}
                  height={30}
                  width={30}
                  alt={'back'}
                />
                <p className="text-2xl font-bold ">{PhotoDetails[(appStates[5].albumOpened) as 'personal' | 'certificates' | 'projects'][appStates[5].photoOpened].split('/').at(-1)}</p>
              </div>
              <p className="text-sm opacity-70 mt-2 ml-[50px]">{appStates[5].photoOpened + 1} of {PhotoDetails[(appStates[5].albumOpened) as 'personal' | 'certificates' | 'projects'].length}</p>
            </>
          )}
          <hr className="mt-1  border-[#3c3c3c]" />
        </div>
      </div>

      {appStates[5].albumOpened === null && (
        <div className="px-10  flex flex-wrap gap-10">
          {/* <AlbumView type={'projects'} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates}/> */}
          <AlbumView type={'certificates'} openedApp={openedApp} appStates={appStates} setAppStates={setAppStates} />
          <AlbumView type="personal" openedApp={openedApp} appStates={appStates} setAppStates={setAppStates} />
          <AlbumView type="projects" openedApp={openedApp} appStates={appStates} setAppStates={setAppStates} />
        
        </div>
      )}
      {appStates[5].albumOpened !== null && appStates[5].photoOpened === null && (
        <div className="px-10  flex flex-wrap gap-[40px] items-center">
          {PhotoDetails[(appStates[5].albumOpened) as 'personal' | 'certificates' | 'projects'].map((url, ind) => (
            // <div className=" w-full h-[300px] relative rounded-lg flex" key={ind}>
            <Image
              src={url}
              key={ind}
              // src={'/photos/personal/6.jpg'}
              className="object-contain rounded-lg cursor-pointer h-fit"
              onClick={() => {
                console.log(url)

                setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'photoOpened': ind } })
                setIsLoading(true)
              }}

              height={photoWidth}
              width={photoWidth}
              // fill={true}
              alt={url}
            />
            // </div>
          ))}
        </div>
      )}

      {appStates[5].albumOpened !== null && appStates[5].photoOpened !== null && (
        <>
          <div className="w-full flex-1 relative grid place-items-center grid-cols-2">
            {isLoading && (
              <div className=" absolute top-[50%] left-[50%] w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            )}
            <div className="w-full  z-[999] px-10 flex">
              <div className="h-[300px] max-h-[50vh] w-full flex items-center group">
                {!isLoading && (
                  <div onClick={()=>{
                    console.log('prev')
                    setIsLoading(true)
                    if(appStates[openedApp]['photoOpened']!=0)
                      setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'photoOpened': appStates[openedApp]['photoOpened']-1 } })
                    else
                      setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'photoOpened': PhotoDetails[(appStates[5].albumOpened) as 'personal' | 'certificates' | 'projects'].length-1 } })


                  }} className="rounded-xl bg-white opacity-0 group-hover:opacity-100 duration-500">
                    <Image
                      src={'/back.svg'}
                      className="object-cover opacity-35 hover:opacity-100 rounded-lg  cursor-pointer"
                      height={50}
                      width={50}
                      alt={'<'}
                    />
                  </div>
                )}
              </div>
            </div>
              <Image
                src={PhotoDetails[(appStates[5].albumOpened) as 'personal' | 'certificates' | 'projects'][appStates[5].photoOpened]}

                className="object-contain rounded-lg"
                fill={true}
                onLoad={() => setIsLoading(false)}
                sizes="100vw, 50vw, 33vw"
                alt={PhotoDetails[(appStates[5].albumOpened) as 'personal' | 'certificates' | 'projects'][appStates[5].photoOpened]}
              />     
            <div className="w-full  z-[999] flex justify-end px-10">
              <div className="h-[300px] max-h-[50vh] w-full flex items-center group justify-end">
                {!isLoading && (

                  <div onClick={()=>{
                    setIsLoading(true)

                    setAppStates({ ...appStates, [openedApp]: { ...appStates[openedApp], 'photoOpened': (appStates[openedApp]['photoOpened']+1) % PhotoDetails[(appStates[5].albumOpened) as 'personal' | 'certificates' | 'projects'].length } })
                    
                  }} className=" rounded-xl bg-white opacity-0 group-hover:opacity-100 duration-500">
                    <Image
                      src={'/back.svg'}
                      className=" object-cover rounded-lg   opacity-35 hover:opacity-100 duration-500 cursor-pointer rotate-180"
                      height={50}
                      width={50}
                      alt={'>'}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default PhotosApp;