import { useEffect, useState } from "react";
import IframeComponent from "../custom/iframe";
import WindowCloseButtons from "../custom/windowCloseButtons";

const GamePage = ({ CloseApp, openedApp, appStates, setAppStates }: { CloseApp: any, openedApp: number, appStates: any, setAppStates: any }) => {
    return ( 
        <div className="h-full bg-[#242424] overflow-hidden"> 
        <div className="bg-[#242424] p-5 flex items-center relative">
          <div className=" absolute">
            <WindowCloseButtons CloseApp={CloseApp} openedApp={openedApp} />
          </div>
          <p className='w-full text-center'>2048</p>

        </div>
        <div className="bg-[#faf8ef] h-full pb-[120px] pt-10 rounded-[12px] ">
            <IframeComponent className="h-full rounded-[12px] bg-red border-0" src="https://funhtml5games.com?embed=2048bit" title="2048"/>
        </div>
        {/* <IframeComponent className="h-full rounded-[12px] bg-red border-0" src="https://preview.codepad.co/playground/preview/2048-game/1" title="2048"/> */}
    </div> 
     );
}
 
export default GamePage;