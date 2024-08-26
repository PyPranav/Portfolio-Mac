import { cn } from "@/lib/utils"
import localFont from 'next/font/local'
const appleFont = localFont({ src: '../../../public/fonts/Apple/SF-Pro-Display-Semibold.otf' })
const CalenderWidget = () => {
    const currentDate = new Date(2024, 2, 14);
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][currentDate.getDay()];
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();
    
    return ( 
        <div className={cn('group', appleFont.className)}>
              <div className="h-[170px] w-[170px] flex flex-col items-center justify-center bg-black bg-opacity-10 backdrop-blur-[100px] rounded-2xl p-4 text-white ">
                  <div className="text-2xl text-[1.7rem] font-medium flex gap-2 opacity-80 group-hover:opacity-100 duration-500">{dayOfWeek} <p className="opacity-50">{month}</p></div>
                  <div className="text-6xl text-[6rem] font-bold opacity-80 group-hover:opacity-100 duration-500 ">{dayOfMonth}</div>
              </div>
            </div>
     );
}

// style={{
    //   // backgroundImage:'url("/wallpapers/macos-monterey-wallpaper.webp")',
    //   // backgroundSize: 'cover',
    //   // backgroundAttachment: 'fixed',
    //   // backgroundRepeat: 'no-repeat',
    //   // backgroundPosition:`center`,
    //   // backgroundClip:'text',
    //   // color:"transparent",
      
    //   // WebkitBackgroundClip: 'text',
    //   // WebkitTextFillColor: "transparent",
    // }} 
 
export default CalenderWidget;