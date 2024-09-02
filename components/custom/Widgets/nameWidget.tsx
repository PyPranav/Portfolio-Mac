import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonalInfo } from "@/utils/personalInfo";
import Image from "next/image";
import { useEffect, useState } from "react";


const NameWidget = ({loaded}:{loaded:boolean}) => {
    const [ind, setInd] = useState(0);
    useEffect(()=>{
      if(!loaded)
        return
      new Promise(resolve => setTimeout(resolve, ind===0?100:10)).then(()=>{
        if (ind<=Math.max(PersonalInfo.name.length,PersonalInfo.tag.length, PersonalInfo.descriptiveTag.length/2))
          setInd(ind+1)
      })
    },[ind, loaded])
    return ( 
         <div className='group h-[130px] sm:h-[170px] flex bg-black bg-opacity-10 backdrop-blur-[100px] rounded-2xl p-4 text-white items-center ' >
            <Image
                src={PersonalInfo.profilePic}
                className="object-cover rounded-[130px] w-[117px] h-[117px] sm:w-[139px] sm:h-[139px] opacity-80 group-hover:opacity-100 duration-500"
                width={139}
                height={139}
                alt="Pranav"
            />
            <div className="px-5 w-full flex flex-col justify-center">
              <p className="text-3xl sm:text-5xl opacity-80 font-medium group-hover:opacity-100 duration-500 text-start">
                {PersonalInfo.name.slice(0,ind)}
              </p>
              <p className="font-light text-lg text-[1rem] sm:text-xl opacity-50  group-hover:opacity-70 duration-500 text-start">
                {PersonalInfo.tag.slice(0,ind)}
              </p>
              <p className="font-light hidden text-xs sm:block opacity-50 group-hover:opacity-70 duration-500 text-start">
                {PersonalInfo.descriptiveTag.slice(0,ind*2)}

              </p>
            </div>
          </div>
     );
}
 
export default NameWidget