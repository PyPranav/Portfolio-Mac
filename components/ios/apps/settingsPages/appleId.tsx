import { PersonalInfo } from "@/utils/personalInfo";
import Image from "next/image";
import IOSListContainer from "../../IOSList/listContainer";
import IOSListItem from "../../IOSList/listItem";

const IOSAppleIdSettings = ({ changeAppState }: { changeAppState: (newState?: string) => void }) => {
    return (
        <>
            <div className="relative">
                <button className="flex gap-1 items-center cursor-pointer" onClick={() => {
                    changeAppState()
                }}>
                    <Image
                        className="h-full"
                        style={{ filter: "invert(42%) sepia(93%) saturate(1352%) hue-rotate(199deg) brightness(101%) contrast(101%)" }}
                        src={'/back.svg'}
                        height={20}
                        width={20}
                        alt={'back'}

                    />
                    <p className=" ml-[-5px] text-sm cursor-pointer text-[#438bfe] select-none  max-[300px]:hidden">
                        Settings
                    </p>
                    <div className=" font-semibold absolute top-0 bottom-0 left-0 right-0 grid place-items-center">
                        <p>About</p>
                    </div>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center mt-7">
                <Image
                    src={PersonalInfo.profilePic}
                    className="object-cover rounded-[130px] w-[110px] h-[110px] opacity-80 group-hover:opacity-100 duration-500"
                    width={139}
                    height={139}
                    alt="Pranav"
                />
                <p className="mt-3 font-bold text-2xl">{PersonalInfo.name}</p>
                <p className="opacity-60 text-base">{PersonalInfo.tag}</p>
                <IOSListContainer className="w-full mt-7">
                    <IOSListItem
                        onClick={() => { }}
                        className="grid-cols-[55px_1fr_40px] duration-150"
                        start_icon={(
                            <div className="px-0 bg-[#7e7e7e] rounded-lg overflow-hidden w-[30px] h-[30px]">
                                <Image
                                    src="/settings_icon/email.webp"
                                    width={40}
                                    height={40}
                                    className="rounded-[1000px] object-cover scale-[1.20]"
                                    alt="Email"
                                />
                            </div>
                        )}
                        end_icon={<div className="h-full"></div>}
                        label={PersonalInfo.email1}
                    />
                    <IOSListItem
                        onClick={() => { }}
                        className="grid-cols-[55px_1fr_40px] duration-150"
                        start_icon={(
                            <div className="px-0 bg-[#7e7e7e] rounded-lg overflow-hidden w-[30px] h-[30px]">
                                <Image
                                    src="/settings_icon/phone.webp"
                                    width={40}
                                    height={40}
                                    className="rounded-[1000px] object-cover scale-[1.20]"
                                    alt="Phone"
                                />
                            </div>
                        )}
                        end_icon={<div className="h-full"></div>}
                        label={PersonalInfo.phoneNo}
                    />
                    <IOSListItem
                        onClick={() => { }}
                        className="grid-cols-[55px_1fr_40px] duration-150"
                        start_icon={(
                            <div className="px-0 bg-[#7e7e7e] rounded-lg overflow-hidden w-[30px] h-[30px]">
                                <Image
                                    src="/settings_icon/website.webp"
                                    width={40}
                                    height={40}
                                    className="rounded-[1000px] object-cover scale-[1.20]"
                                    alt="website"
                                />
                            </div>
                        )}
                        end_icon={<div className="h-full"></div>}
                        label={PersonalInfo.website}
                        last
                    />
                </IOSListContainer>
                <IOSListContainer className="w-full mt-7">
                    <IOSListItem
                        onClick={() => { }}
                        className="grid-cols-[55px_1fr_40px] duration-150"
                        start_icon={(
                            <div className="px-0 rounded-lg ">
                                <Image
                                    src="/settings_icon/iphone.webp"
                                    className=""
                                    width={40 / 2}
                                    height={40}
                                    alt="iphone"
                                />
                            </div>
                        )}
                        end_icon={<div className="h-full"></div>}
                        label={"This iPhone"}
                        sublabel="This Awesome Portfolio"
                    />
                    <IOSListItem
                        onClick={() => { }}
                        className="grid-cols-[55px_1fr_40px] duration-150"
                        start_icon={(
                            <div className="px-0 rounded-lg ">
                                <Image
                                    src="/settings_icon/macbook.webp"
                                    width={40}
                                    height={40}
                                    alt="macbook"
                                />
                            </div>
                        )}
                        end_icon={<div className="h-full"></div>}
                        label={"Macbook Pro"}
                        sublabel="MacBook Pro 14"
                    />
                    <IOSListItem
                        onClick={() => { }}
                        className="grid-cols-[55px_1fr_40px] duration-150"
                        start_icon={(
                            <div className="px-0 rounded-lg ">
                                <Image
                                    src="/settings_icon/iphone.webp"
                                    className=""
                                    width={40 / 2}
                                    height={40}
                                    alt="iphone"
                                />
                            </div>
                        )}
                        end_icon={<div className="h-full"></div>}
                        label={"iPhone"}
                        sublabel="iPhone 15 Plus"
                        last
                    />
                </IOSListContainer>
            </div>
        </>
    );
}

export default IOSAppleIdSettings;