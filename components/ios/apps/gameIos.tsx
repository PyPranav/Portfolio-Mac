import IframeComponent from "@/components/custom/iframe";
import { useEffect, useRef } from "react";

const IOSGame = () => {
    return ( 
        <div className="bg-[#faf8ef] h-full pb-[120px] rounded-[12px] ">
            <IframeComponent className="h-full rounded-[12px] bg-red border-0" src="https://funhtml5games.com?embed=2048bit" title="2048"/>
        </div>
     );
}
 
export default IOSGame;