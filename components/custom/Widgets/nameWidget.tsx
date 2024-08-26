import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"
import { PersonalInfo } from "@/utils/personalInfo";
import localFont from "next/font/local";


const appleThindFont = localFont({ src: '../../../public/fonts/Apple/SF-Pro-Text-Thin.otf' })
const appleSemiboldFont = localFont({ src: '../../../public/fonts/Apple/SF-Pro-Text-Semibold.otf' })


const NameWidget = () => {
    return ( 
         <div className='group h-[170px] flex bg-black bg-opacity-10 backdrop-blur-[100px] rounded-2xl p-4 text-white  ' >
            <Avatar className="w-[139px] h-[139px] opacity-80 group-hover:opacity-100 duration-500">
              <AvatarImage src={PersonalInfo.profilePic} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="px-5 w-full flex flex-col justify-center">
              <p style={{}} className={cn("text-5xl opacity-80 font-medium group-hover:opacity-100 duration-500 ", appleSemiboldFont.className)}>
                {PersonalInfo.name}
              </p>
              <p className={cn("font-light text-xl opacity-50  group-hover:opacity-70 duration-500 ", appleThindFont.className)}>
                {PersonalInfo.tag}
              </p>
              <p className={cn("font-light text-xs opacity-50 group-hover:opacity-70 duration-500 ", appleThindFont.className)}>
                {PersonalInfo.descriptiveTag}

              </p>
            </div>
          </div>
     );
}
 
export default NameWidget