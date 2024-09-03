import { PersonalInfo } from "@/utils/personalInfo";
import Image from "next/image";

const IOSNameWidget = () => {
    return ( 
        <div className="col-span-2 row-span-2 flex flex-col gap-1 items-center justify-center">
                <div style={{
                        textShadow: "0px 0px 15px black, 0px 0px 30px black, 0px 0px 45px black"
                        // textShadow:" 10px 10px 20px #000000, 10px 10px 20px #000000, 10px 10px 20px #000000"
                    }} className="w-[40vw] aspect-square relative rounded-2xl ">
                    <Image
                        src={PersonalInfo.profilePic}
                        alt="profile"
                        className="rounded-2xl object-cover"
                        
                        fill
                        sizes="20vw, 40vw"
                    />
                    <div  className="absolute inset-0 rounded-2xl flex justify-start items-end">
                        <div className="p-3 ">
                            <p className="text-sm text-start">{PersonalInfo.name}</p>
                            <p className="text-xs text-[0.6rem] text-start font-light">{PersonalInfo.tag}</p>
                        </div>

                    </div>
                </div>
                <p className="text-xs">Hey 👋</p>
            </div>
     );
}
 
export default IOSNameWidget;