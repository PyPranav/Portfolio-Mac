import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonalInfo } from "@/utils/personalInfo";

const NameWidget = () => {
    return ( 
         <div className='group h-[170px] flex  bg-gray-500 bg-opacity-70 backdrop-blur rounded-2xl p-4 text-white' >
            <Avatar className="w-[139px] h-[139px] opacity-80 group-hover:opacity-100 duration-500">
              <AvatarImage src={PersonalInfo.profilePic} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="px-5 w-full flex flex-col justify-center">
              <p className="text-5xl opacity-80 font-medium group-hover:opacity-100 duration-500 text-center">
                {PersonalInfo.name}
              </p>
              <p className="font-light text-xl opacity-50  group-hover:opacity-70 duration-500 text-center">
                {PersonalInfo.tag}
              </p>
              <p className="font-light text-xs opacity-50 group-hover:opacity-70 duration-500 text-center">
                {PersonalInfo.descriptiveTag}

              </p>
            </div>
          </div>
     );
}
 
export default NameWidget