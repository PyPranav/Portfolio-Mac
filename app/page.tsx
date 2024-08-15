"use client"
import "./home.css";
import { useRef } from "react";
import { scaleValue } from "../utils/scale";

const maxAdditionalSize = 5;

function App() {
  const dockRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="page">
      <nav ref={dockRef} className="dock">
        <ul>
          <li className="app" onMouseMove={handleAppHover}>
            <div onClick={()=>{
              console.log("Finder")
            }}>
              <img src="/dock_icons/finder.webp" />
              <span className="tooltip">Finder</span>
            </div>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <div onClick={()=>{}}>
              <img src="/dock_icons/arc.webp" />
              <span className="tooltip">Arc Browser</span>
            </div>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <div onClick={()=>{}}>
              <img src="/dock_icons/spotify.webp" />
              <span className="tooltip">Spotify</span>
            </div>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <div onClick={()=>{}}>
              <img src="/dock_icons/chatgpt.webp" />
              <span className="tooltip">Personal GPT</span>
            </div>
          </li>
          
          <li className="app" onMouseMove={handleAppHover}>
            <div onClick={()=>{}}>
              <img src="/dock_icons/settings.webp" />
              <span className="tooltip">Settings</span>
            </div>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <div onClick={()=>{}}>
              <img src="/dock_icons/photos.webp" />
              <span className="tooltip">Photos</span>
            </div>
          </li>
          
          <li className="app" onMouseMove={handleAppHover}>
            <div onClick={()=>{}}>
              <img src="https://www.frontend.fyi/playground-assets/macos-dock/icons/vscode.png" />
              <span className="tooltip">Some Game</span>
            </div>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <div onClick={()=>{}}>
              <img src="/dock_icons/mail.webp" />
              <span className="tooltip">Contact Me</span>
            </div>
          </li>
        </ul>
      </nav>

      {/* <div className="source-links">
        <a
          href="https://unsplash.com/photos/4wzRuAb-KWs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wallpaper by Mohammad <br />
          Alizade on Unsplash
        </a>
        <a
          href="https://macosicons.com/#/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Icons by MacOS Icons
        </a>
      </div> */}
      <div className="mobile-message">
        <p>
          What?! MacOS works on mobile?..
          <br />— Unfortunately it doesn't 😢 Open this site on your desktop to
          enjoy the amazing animations! Or watch the video{" "}
          <a href="https://youtu.be/_ZcIFTvLm64" target="_blank">
            on YouTube
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
