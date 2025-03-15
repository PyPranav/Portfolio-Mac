import Image from "next/image"

const IOSListItem = ({onClick, start_icon, end_icon, label, last = false }: {onClick: () => void, start_icon: React.ReactNode, end_icon: React.ReactNode, label: string, last?: boolean}) => {
    return ( 

        <button onClick={onClick} className="grid grid-cols-[50px_1fr_40px] py-2 w-full focus:bg-white focus:bg-opacity-10  active:bg-white active:bg-opacity-10">
            <div className="flex items-center justify-center h-full">
                {start_icon}
            </div>
            <div className="h-full">
                <p className="text-left h-full flex items-center">{label}</p>
                {!last && <hr className="opacity-10 mt-1"/>}
            </div>
            <div className="h-full">
                {end_icon}
                {!last && <hr className="opacity-10 mt-1"/>}
            </div>
        </button>
     );
}
 
export default IOSListItem;