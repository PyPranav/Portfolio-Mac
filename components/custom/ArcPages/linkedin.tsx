import { PersonalInfo } from "@/utils/personalInfo";
import Image from "next/image";

const LinkedInPage = () => {
    return (
        <section className=" bg-[#fff] h-full text-black overflow-scroll flex flex-col items-center p-10">
            <div className=" border-[#ebebeb] border-[1px]  w-full max-w-[1000px] rounded-lg h-fit">
                <div className="h-[200px] relative rounded-lg">
                    <Image
                        src={PersonalInfo.cover}
                        className="object-cover rounded-t-lg"
                        sizes="(max-width: 1000px) 100vw, 1000px"
                        fill
                        alt={'Cover'}
                    />
                </div>
                <div className="px-5 lg:grid grid-cols-[2fr_1fr] pb-5">
                    <div>
                        <Image
                            src={PersonalInfo.profilePic}
                            className="object-cover rounded-[130px] border-[white] border-[4px] mt-[-82px] relative z-10 shadow-2xl"
                            width={160}
                            height={160}
                            alt="Pranav"
                        />
                        <p className="mt-7 text-2xl font-semibold">{PersonalInfo.name}</p>
                        <p className="mt-1 font-light">{PersonalInfo.descriptiveTag}</p>
                        <p className=" font-light text-[#666666]">{PersonalInfo.location}</p>
                        <p className="font-light text-[#666666]">519 followers · 500+ connections </p>
                        <a href="https://www.linkedin.com/in/pypranav" target="_blank">
                            <button className="flex gap-1 bg-[#0a66c2] text-white p-1 px-4 rounded-3xl mt-3 items-center" title="Open linkedin.com">
                                <div className="grid place-items-center">
                                    <Image
                                        src={'/arc/linkedin/connectLinkedin.png'}
                                        className="object-cover"
                                        width={13}
                                        height={13}
                                        alt={'connect'}
                                    />
                                </div>
                                <p className="font-medium">
                                    Connect
                                </p>
                            </button>
                        </a>
                    </div>
                    <div className=" hidden lg:block">
                        <div className="flex gap-5 mt-[107px]">
                            <Image
                                src={PersonalInfo.experience[0].icon}
                                className="object-cover"
                                width={32}
                                height={32}
                                alt={PersonalInfo.experience[0].companyName}
                            />
                            <p>{PersonalInfo.experience[0].companyName} </p>
                        </div>
                        <div className="flex gap-5 mt-5">
                            <Image
                                src={PersonalInfo.education[0].icon}
                                className="object-cover"
                                width={32}
                                height={32}
                                alt={PersonalInfo.education[0].institute}
                            />
                            <p>{PersonalInfo.education[0].institute} </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[1000px] py-10 px-5">
                <p className="text-2xl font-light">About</p>
                <p className=" mt-2 font-light">{PersonalInfo.description}</p>
                <hr className="border-[#ebebeb] mt-10" />

                <p className="mt-10 text-2xl font-light mb-4">Experience </p>
                {PersonalInfo.experience.map((exp, key) => (
                    <div key={key} className="flex gap-3 mb-7 ml-2">
                        <div>
                            <Image
                                src={exp.icon}
                                className="object-cover mt-2"
                                width={50}
                                height={50}
                                alt={exp.companyName}
                            />
                        </div>
                        <div>
                            <p className="text-lg font-medium">{exp.position}</p>

                            <p className="text-sm font-light">{exp.companyName}</p>
                            <p className="text-sm font-light text-[#666666]">{exp.duration}</p>
                            <p className="text-sm font-light text-[#666666]">{exp.loc}</p>

                        </div>
                    </div>
                ))}
                <hr className="border-[#ebebeb] mt-10" />

                <p className="mt-10 text-2xl font-light mb-4">Education </p>
                {PersonalInfo.education.map((exp, key) => (
                    <div key={key} className="flex gap-3 mb-7 ml-2">
                        <div>
                            <Image
                                src={exp.icon}
                                className="object-cover mt-2"
                                width={50}
                                height={50}
                                alt={exp.institute}
                            />
                        </div>
                        <div>
                            <p className="text-lg font-medium">{exp.institute}</p>

                            <p className="text-sm font-light">{exp.course}</p>
                            <p className="text-sm font-light text-[#666666]">{exp.duration}</p>
                            {/* <p className="text-sm font-light text-[#666666]">{exp.loc}</p> */}

                        </div>
                    </div>
                ))}

                <hr className="border-[#ebebeb] mt-10" />

            </div>

        </section>
    );
}

export default LinkedInPage;