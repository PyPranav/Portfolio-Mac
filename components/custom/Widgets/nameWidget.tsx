import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonalInfo } from "@/utils/personalInfo";

const NameWidget = () => {
    return ( 
         <div className='group h-[170px] flex bg-black bg-opacity-10 backdrop-blur-[100px] rounded-2xl p-4 text-white  ' >
            <Avatar className="w-[139px] h-[139px] opacity-80 group-hover:opacity-100 duration-500">
              <AvatarImage src={PersonalInfo.profilePic} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="px-5 w-full flex flex-col justify-center">
              <p style={{
                fontFamily:'San Francisco Bold'
              }} className="text-5xl opacity-80 font-medium group-hover:opacity-100 duration-500 ">
                {PersonalInfo.name}
              </p>
              <p style={{
            fontFamily: 'San Francisco Regular'
        }} className="font-light text-xl opacity-50  group-hover:opacity-70 duration-500 ">
                {PersonalInfo.tag}
              </p>
              <p style={{
            fontFamily: 'San Francisco Regular'
        }} className="font-light text-xs opacity-50 group-hover:opacity-70 duration-500 ">
                {PersonalInfo.descriptiveTag}

              </p>
            </div>
          </div>
     );
}
 
export default NameWidget