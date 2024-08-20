import WindowCloseButtons from "../custom/windowCloseButtons";

const SpotifyApp = ({ CloseApp, openedApp, appStates, setAppStates }: { CloseApp: any, openedApp: number, appStates: any, setAppStates: any }) => {
    return ( 
    <div className="h-full pb-[75px] bg-[#242424] overflow-hidden"> 
        <div className="bg-[#242424] p-5 flex items-center relative">
          <div className=" absolute">
            <WindowCloseButtons CloseApp={CloseApp} openedApp={openedApp} />
          </div>
          <p className='w-full text-center'>Spotify</p>

        </div>
        {/* <iframe className='w-[760px] h-[480px]' src="https://fritz.chessbase.com/" ></iframe> */}
        {/* scale-[1.0101] */}
        <iframe   className="h-full rounded-[12px] bg-red border-0  v" src="https://open.spotify.com/embed/playlist/27KfeZGhtgxYtv6eGWEZb8?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div> 
    );
}
 
export default SpotifyApp;