import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PersonalInfo } from "@/utils/personalInfo";
import Image from "next/image";


const AppleId = () => {
    return ( 
        <section className="w-full px-10 py-2 pb-[80px]">
                <p className="text-lg font-bold sticky top-0 bg-[#2d2d2d] z-[1000] pb-3">About</p>
            <div className="grid place-items-center mt-10">
                <Avatar className="w-[150px] h-[150px]">
                <AvatarImage className=" object-cover" src={PersonalInfo.profilePic} />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <p className="text-lg font-bold text-center mt-2">{PersonalInfo.name}</p>
            <p className="text-center">{PersonalInfo.tag}</p>

            <div className="mt-5 rounded-lg w-full bg-[#303030] border-[#575555] border-[1px]">
                <div className="p-5 flex gap-5 items-center">
                    <Image
                        src="/settings_icon/email.webp"
                        width={40}
                        height={40}
                        className="rounded-[100px]"
                        alt="Email"
                    />
                    {PersonalInfo.email1}
                </div>
                <hr className="mx-5 border-[#3c3c3c]"/>
                <div className="p-5 flex gap-5 items-center">
                    <Image
                        src="/settings_icon/phone.webp"
                        width={40}
                        height={40}
                        className="rounded-[100px]"
                        alt="phone"
                    />
                    {PersonalInfo.phoneNo}
                </div>
                <hr className="mx-5 border-[#3c3c3c]"/>
                <div className="p-5 flex gap-5 items-center">
                    <Image
                        src="/settings_icon/website.webp"
                        width={40}
                        height={40}
                        className="rounded-[100px]"
                        alt="website"
                    />
                    {PersonalInfo.website}
                </div>
            </div>

            <p className="pl-4 mt-10 font-bold">Devices</p>
            <div className="mt-5 rounded-lg w-full bg-[#303030] border-[#575555] border-[1px]">
                <div className="p-5 flex gap-5 items-center">
                    <Image
                        src="/settings_icon/macbook.webp"
                        width={40}
                        height={40}
                        alt="macbook"
                    />
                    <div>
                        <p>MacBook Web</p>
                        <p className="text-xs">This Awesome Portfolio</p>
                    </div>
                </div>
                <hr className="mx-5 border-[#3c3c3c]"/>

                <div className="p-5 flex gap-5 items-center">
                    <Image
                        src="/settings_icon/macbook.webp"
                        width={40}
                        height={40}
                        alt="macbook"
                    />
                    <div>
                        <p>MacBook Pro</p>
                        <p className="text-xs">MacBook Pro 14"</p>
                    </div>
                </div>
                <hr className="mx-5 border-[#3c3c3c]"/>
                <div className="p-5 flex gap-5 items-center">
                    <Image
                        src="/settings_icon/iphone.webp"
                        className="ml-[8px]"
                        width={40/2}
                        height={40}
                        alt="iphone"
                    />
                    
                    <div>
                        <p>iPhone</p>
                        <p className="text-xs">iPhone 15 Plus</p>
                    </div>
                </div>
            </div>

        </section> 
    );
}
 
export default AppleId;