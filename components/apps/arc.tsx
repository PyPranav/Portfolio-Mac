import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WindowCloseButtons from "../custom/windowCloseButtons";
import { Input } from "../ui/input";
import Image from "next/image";
import InstagramPage from "../custom/ArcPages/instagram";
import GithubPage from "../custom/ArcPages/github";
import LinkedInPage from "../custom/ArcPages/linkedin";
import { PersonalInfo } from "@/utils/personalInfo";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IframeComponent from "../custom/iframe";
import TwitterPage from "../custom/ArcPages/twitter";
import { useToast } from "@/hooks/use-toast";

const getLink = (val: string) => {
  if (["instagram", "x", "github", "linkedin", "pypranav"].includes(val))
    return val + ".com";

  return PersonalInfo.hostedProjects.filter((proj) => proj.name === val)[0].url;
};

const ArcPage = ({
  CloseApp,
  openedApp,
  appStates,
  setAppStates,
}: {
  CloseApp: (appNum: number) => void;
  openedApp: number;
  appStates: any;
  setAppStates: any;
}) => {
  const [isFirfox, setIsFirfox] = useState(false);
  const router = useRouter();
  const [count, setCount] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("firefox") > -1) {
      setIsFirfox(true);
    }
  }, []);
  return (
    <Tabs
      value={appStates[openedApp]["tabValue"]}
      onValueChange={(val) =>
        setAppStates({
          ...appStates,
          [openedApp]: { ...appStates[openedApp], tabValue: val },
        })
      }
      className="grid grid-cols-[170px_1fr] h-full w-full bg-black bg-opacity-85 backdrop-blur-2xl color-white"
    >
      <TabsList className="flex flex-col h-full p-2 pt-0 items-start justify-start bg-[#292929] bg-opacity-0 overflow-hidden">
        <div className="flex w-full">
          <WindowCloseButtons CloseApp={CloseApp} openedApp={openedApp} />
          <div className="flex w-full justify-center">
            <div className="grid place-items-center">
              <Image
                src={"/back.svg"}
                className="object-cover rounded-xl opacity-80 hover:opacity-100  invert cursor-pointer"
                height={25}
                width={25}
                alt={"back"}
                onClick={() => {
                  if (
                    !["instagram", "github", "linkedin", "x"].includes(
                      appStates[openedApp]["tabValue"]
                    )
                  )
                    router.back();
                }}
              />
            </div>
            <div className="grid place-items-center">
              <Image
                src={"/back.svg"}
                className="object-cover rotate-180 rounded-xl  invert opacity-80 hover:opacity-100  cursor-pointer"
                height={25}
                width={25}
                onClick={() => {
                  router.forward();
                }}
                alt={"back"}
              />
            </div>
          </div>
        </div>

        <p
          className=" cursor-pointer truncate text-xs my-2 w-full rounded-xl  bg-white bg-opacity-10 px-4 py-3 text-white text-opacity-60 select-none"
          title="Copy URL"
          onClick={() => {
            let link = getLink(appStates[openedApp]["tabValue"]);
            if (
              ["instagram", "x", "github"].includes(
                appStates[openedApp]["tabValue"]
              )
            )
              link = link + "/pypranav";
            else if (appStates[openedApp]["tabValue"] === "linkedin")
              link = link + "/in/pypranav";
            navigator.clipboard.writeText(link);
            toast({
              title: "Copied Current URL",
              duration: 1000,
              className:
                "rounded-xl w-fit fixed top-8 right-8 p-3 bg-gray-500 text-white border-0",
            });
          }}
        >
          {getLink(appStates[openedApp]["tabValue"])}
        </p>
        <div className="grid grid-cols-2 gap-2 w-full">
          <TabsTrigger
            value="github"
            title="Github"
            className="grid col-span-2 place-items-center w-full h-[3rem] bg-white bg-opacity-10 hover:bg-opacity-20 data-[state=active]:bg-white data-[state=active]:bg-opacity-30 text-white data-[state=active]:text-white rounded-xl duration-200 "
          >
            <Image
              src={"/arc/githubLogo.png"}
              className="object-cover"
              height={15}
              width={15}
              alt={"Github"}
            />
          </TabsTrigger>
          <TabsTrigger
            value="instagram"
            title={"Instagram"}
            className="grid place-items-center w-full h-[3rem]  bg-white bg-opacity-10 hover:bg-opacity-20 data-[state=active]:bg-white data-[state=active]:bg-opacity-30 text-white data-[state=active]:text-white rounded-xl duration-200 "
          >
            <Image
              src={"/arc/instagramLogo.png"}
              className="object-cover"
              height={15}
              width={15}
              alt={"Instagram"}
            />
          </TabsTrigger>

          <TabsTrigger
            value="linkedin"
            title={"Linkedin"}
            className="grid place-items-center w-full h-[3rem] bg-white bg-opacity-10 hover:bg-opacity-20 data-[state=active]:bg-white data-[state=active]:bg-opacity-30 text-white data-[state=active]:text-white rounded-xl duration-200 "
          >
            <Image
              src={"/arc/linkedinLogo.png"}
              className="object-cover"
              height={15}
              width={15}
              alt={"Linkedin"}
            />
          </TabsTrigger>
        </div>
        <div className="w-full px-2">
          <hr className="opacity-15 my-4" />
          <p className="text-xs mb-4 text-white opacity-50 font-light">
            🗂️ Hosted Projects
          </p>
        </div>
        {PersonalInfo.hostedProjects.map((project, key) => {
          if (["Envision", "Netflix Clone"].includes(project.name) && isFirfox)
            return <div className="hidden" key={key}></div>;
          return (
            <TabsTrigger
              key={key}
              className=" mb-2 flex w-full gap-2 justify-start py-2 data-[state=active]:bg-white data-[state=active]:bg-opacity-20 text-white data-[state=active]:text-white rounded-xl data-[state=inactive]:bg-white data-[state=inactive]:bg-opacity-0 data-[state=inactive]:hover:bg-opacity-10 "
              value={project.name}
              title={project.name}
            >
              <Image
                src={project.icon}
                className="object-cover"
                height={20}
                width={20}
                alt={project.name}
              />
              <p className="truncate font-light">{project.name}</p>
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent
        className="mb-2 mr-2 rounded-lg overflow-hidden"
        value="instagram"
      >
        <InstagramPage />
      </TabsContent>
      <TabsContent
        className="mb-2 mr-2 rounded-lg overflow-hidden"
        value="github"
      >
        <GithubPage />
      </TabsContent>
      <TabsContent
        className="mb-2 mr-2 rounded-lg overflow-hidden"
        value="linkedin"
      >
        <LinkedInPage />
      </TabsContent>

      {PersonalInfo.hostedProjects.map((project, key) => {
        if (project.name == "Envision" && isFirfox)
          return <div className="hidden" key={key}></div>;
        return (
          <TabsContent
            className=" mb-2 mr-2 rounded-lg overflow-hidden"
            key={key}
            value={project.name}
          >
            <IframeComponent src={project.url} title={project.name} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default ArcPage;
