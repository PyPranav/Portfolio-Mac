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
         <div className='group h-[170px] flex bg-black bg-opacity-10 backdrop-blur-[100px] rounded-2xl p-4 text-white  ' >
            <Image
                src={PersonalInfo.profilePic}
                className="object-cover rounded-[130px] opacity-80 group-hover:opacity-100 duration-500"
                width={139}
                height={139}
                alt="Pranav"
            />
            <div className="px-5 w-full flex flex-col justify-center">
              <p className="text-5xl opacity-80 font-medium group-hover:opacity-100 duration-500 ">
                {PersonalInfo.name.slice(0,ind)}
              </p>
              <p className="font-light text-xl opacity-50  group-hover:opacity-70 duration-500 ">
                {PersonalInfo.tag.slice(0,ind)}
              </p>
              <p className="font-light text-xs opacity-50 group-hover:opacity-70 duration-500 ">
                {PersonalInfo.descriptiveTag.slice(0,ind*2)}

              </p>
            </div>
          </div>
     );
}
 
export default NameWidget