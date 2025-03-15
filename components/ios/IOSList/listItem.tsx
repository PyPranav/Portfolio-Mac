import Image from "next/image"

const IOSListItem = ({onClick, start_icon, end_icon, label, last = false }: {onClick: () => void, start_icon: React.ReactNode, end_icon: React.ReactNode, label: string, last?: boolean}) => {
    return ( 

        <button onClick={onClick} className="grid grid-cols-[50px_1fr_40px] py-2 w-full focus:bg-white focus:bg-opacity-10 ">
            <div className="flex items-center justify-center">
                {start_icon}
            </div>
            <div>
                <p className="text-left h-full flex items-center">{label}</p>
                {!last && <hr className="opacity-10 mt-1"/>}
            </div>
            <div>
                {end_icon}
                {!last && <hr className="opacity-10 mt-1"/>}
            </div>
        </button>
     );
}
 
export default IOSListItem;