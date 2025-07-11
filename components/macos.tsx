import "./macos.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { scaleValue } from "../utils/scale";
import { dockAppList } from "@/utils/dockApps";
import SettingsPage from "@/components/apps/settings";
import PhotosApp from "@/components/apps/photos";

import CalenderWidget from "@/components/custom/Widgets/calendarWidget";
import NameWidget from "@/components/custom/Widgets/nameWidget";
import SpotifyWidget from "@/components/custom/Widgets/spotifyWidget";
import SpotifyApp from "@/components/apps/spotify";
import ArcPage from "@/components/apps/arc";
import Image from "next/image";
import { wallpapers } from "@/utils/settingsOptions";
import { PhotoDetails } from "@/utils/photos";
import Finder from "./apps/finder";
import GamePage from "./apps/game";
import GPTPage from "./apps/gpt";
import ContactMePage from "./apps/contactMe";
import { useSearchParams } from "next/navigation";
import { getStats } from "@/utils/supabaseServer";

const maxAdditionalSize = 5;
const MacOS = ({
  loaded,
  setIsLoaded,
}: {
  loaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}) => {
  const dockRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const q = searchParams.get("q"); // Get the 'id' query parameter

  console.log(q);

  const [openedApp, setOpenedApp] = useState<number>(0);
  const [appStates, setAppStates] = useState<any>({
    1: {
      tabValue: "Home",
      forwardStack: [],
      openedDoc: null,
    },
    2: {
      tabValue: "id",
      wifi: true,
      bluetooth: true,
      stats: true,
      bg: wallpapers[0],
      bgChanged: true,
      statsData: {
        total_chats: 0,
        total_chats_in_last_24_hours: 0,
        total_unique_visitors: 0,
        total_visits: 0,
        total_visits_in_last_24_hours: 0,
        total_mobile_visitors: 0,
        total_desktop_visitors: 0,
      },
    },
    3: {
      tabValue: "github",
    },
    4: {
      chats: [
        // {
        //     "role": "user",
        //     "content": "what can you do?"
        // },
        // {
        //     "role": "assistant",
        //     "content": "As Pranav's personal chatbot, I can:\n\n1. Provide information about Pranav's skills, experience, and education.\n2. Assist with getting in touch with Pranav through his email or other contact details.\n3. Offer general information about his interests, projects, and areas of expertise.\n4. Help explore his hosted projects or collaborations he's been a part of.\n5. Discuss or provide insights on AI, ML, web development, and other tech-related topics.\n\nFeel free to ask me anything, and I'll do my best to assist!"
        // }
      ],
    },
    5: {
      photosLoaded: false,
      albumOpened: null,
      photoOpened: null,
      currentPersonalPhotoIndex: 0,
      currentCertificatesPhotoIndex: 0,
      currentProjectPhotoIndex: 0,
    },
    6: {},
    7: {},
    8: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  useEffect(() => {
    console.log({ appStates });
  }, [appStates]);

  const [statsData, setStatsData] = useState<any>(null);

  useEffect(() => {
    getStats().then((data) => {
      setStatsData(data);
    });
  }, []);

  useEffect(() => {
    if (statsData === null) return;
    setAppStates({
      ...appStates,
      [2]: { ...appStates[2], statsData: statsData },
    });
  }, [statsData]);

  useEffect(() => {
    if (q == "resume") {
      setAppStates({
        ...appStates,
        [1]: { tabValue: "Home/Resume", openedDoc: "Resume", forwardStack: [] },
      });
      OpenApp(1);
    }
  }, [q]);

  const handleAppHover = (ev: React.MouseEvent<HTMLLIElement>) => {
    if (!dockRef.current) return;

    const mousePosition = ev.clientX;
    const iconPositionLeft = ev.currentTarget.getBoundingClientRect().left;
    const iconWidth = ev.currentTarget.getBoundingClientRect().width;

    const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    );

    dockRef.current.style.setProperty(
      "--dock-offset-left",
      `${offsetPixels * -1}px`
    );

    dockRef.current.style.setProperty(
      "--dock-offset-right",
      `${offsetPixels}px`
    );
  };
  const getCoords = (appNum: number): [number, number, number, number] => {
    let appCoord = document.querySelectorAll(".app");
    let rect = appCoord[appNum - 1].getBoundingClientRect();
    return [
      rect.top + 30,
      rect.left + 30,
      window.innerHeight - rect.bottom + 30,
      window.innerWidth - rect.right + 30,
    ];
  };

  const CloseApp = (appNum: number) => {
    if (appNum === 0) return;
    let appCoord = getCoords(appNum);
    setTimeout(() => setOpenedApp(0), 250);

    console.log({ appCoord });
    if (modelRef.current) {
      modelRef.current.style.top = `${appCoord[0]}px`;
      modelRef.current.style.left = `${appCoord[1]}px`;
      modelRef.current.style.bottom = `${appCoord[2]}px`;
      modelRef.current.style.right = `${appCoord[3]}px`;
      modelRef.current.style.opacity = "0.5";
      // modelRef.current.style.clipPath = 'polygon(0 0, 100% 0, 50% 100%, 50% 100%)';
      modelRef.current.style.transition = "all 0.3s ease-in-out";
    }
  };

  const OpenApp = (appNum: number) => {
    setOpenedApp(appNum);
    console.log({ opened: appNum });
    let appCoord = getCoords(appNum);
    console.log({ appCoord });
    if (modelRef.current) {
      modelRef.current.style.transition = "all 0s ease-in-out";
      setTimeout(() => {
        if (modelRef.current) {
          modelRef.current.style.top = `${appCoord[0]}px`;
          modelRef.current.style.left = `${appCoord[1]}px`;
          modelRef.current.style.bottom = `${appCoord[2]}px`;
          modelRef.current.style.right = `${appCoord[3]}px`;
          modelRef.current.style.opacity = "0.5";
          // modelRef.current.style.clipPath = 'polygon(0 0, 100% 0, 50% 100%, 50% 100%)';
        }
      }, 10);
      setTimeout(() => {
        if (modelRef.current)
          modelRef.current.style.transition = "all 0.3s ease-in-out";
      }, 20);

      setTimeout(() => {
        if (modelRef.current) {
          modelRef.current.style.top = `${0}px`; // Adjust these values to control the final size
          modelRef.current.style.left = `${0}px`;
          modelRef.current.style.bottom = `${0}px`;
          modelRef.current.style.right = `${0}px`;
          modelRef.current.style.opacity = "1";
          // modelRef.current.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        }
      }, 30);
    }
  };

  const appSelector = [
    <Finder
      key={1}
      CloseApp={CloseApp}
      openedApp={openedApp}
      appStates={appStates}
      setAppStates={setAppStates}
    />,
    <SettingsPage
      key={2}
      CloseApp={CloseApp}
      openedApp={openedApp}
      appStates={appStates}
      setAppStates={setAppStates}
    />,
    <ArcPage
      key={3}
      CloseApp={CloseApp}
      openedApp={openedApp}
      appStates={appStates}
      setAppStates={setAppStates}
    />,
    <GPTPage
      key={4}
      CloseApp={CloseApp}
      openedApp={openedApp}
      appStates={appStates}
      setAppStates={setAppStates}
    />,
    <PhotosApp
      key={5}
      CloseApp={CloseApp}
      openedApp={openedApp}
      appStates={appStates}
      setAppStates={setAppStates}
    />,
    <SpotifyApp
      key={6}
      CloseApp={CloseApp}
      openedApp={openedApp}
      appStates={appStates}
      setAppStates={setAppStates}
    />,
    <GamePage
      key={7}
      CloseApp={CloseApp}
      openedApp={openedApp}
      appStates={appStates}
      setAppStates={setAppStates}
    />,
    <ContactMePage
      key={8}
      CloseApp={CloseApp}
      openedApp={openedApp}
      appStates={appStates}
      setAppStates={setAppStates}
    />,
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = localStorage.getItem("background");
      if (url && wallpapers.includes(url)) {
        setAppStates({
          ...appStates,
          [2]: { ...appStates[2], bg: url, bgChanged: false },
        });
      }
    }
  }, []);

  return (
    <div className="page">
      <div className="h-full w-full select-none absolute z-0">
        <Image
          src={appStates[2].bg}
          id={"bgImage"}
          onLoad={() => {
            setIsLoaded(true);
          }}
          className="object-cover object-center"
          sizes="100vw ,75vw , 50vw"
          fill
          alt="bg"
          quality={90}
        />
      </div>
      {/* bg-[url(/wallpapers/macos-monterey-wallpaper.webp)] bg-no-repeat bg-cover bg-center */}
      <div className="h-full w-full select-none absolute z-1 p-5">
        <div className="w-[600px]">
          <NameWidget loaded={loaded} />

          <div className="mt-5 flex gap-5">
            <CalenderWidget />
            <SpotifyWidget loaded={loaded} />
          </div>
        </div>
      </div>
      <div
        ref={modelRef}
        style={{
          position: "absolute",
          // background:'black',
          backdropFilter: "blur(20px)",
          opacity: 0,
          // display:openedApp==0?"none":'block'
          zIndex: 5,
        }}
      >
        {openedApp != 0 && appSelector[openedApp - 1]}
      </div>

      <nav ref={dockRef} className="dock backdrop-blur-md">
        <ul>
          {dockAppList.map((dockApp, key) => (
            <li key={key} className="app" onMouseMove={handleAppHover}>
              <div
                onClick={() => {
                  if (openedApp === key + 1) return CloseApp(openedApp);
                  CloseApp(openedApp);
                  if (openedApp != 0)
                    setTimeout(() => {
                      OpenApp(key + 1);
                    }, 400);
                  else OpenApp(key + 1);
                }}
              >
                <Image
                  width={100}
                  height={100}
                  src={dockApp.imageSrc}
                  alt={"app"}
                />
                <span className="tooltip">{dockApp.tooltip}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MacOS;
