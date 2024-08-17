import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import WindowCloseButtons from "../custom/windowCloseButtons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

const SettingsPage = ({CloseApp,openedApp,appStates,setAppStates}:{CloseApp:any,openedApp:number,appStates:any, setAppStates:any}) => {

    return ( 
    
    <Tabs value={appStates[openedApp]['tabValue']} onValueChange={(val)=>setAppStates({...appStates,[openedApp]:{...appStates[openedApp],'tabValue':val}})} defaultValue="account" className="grid grid-cols-[300px_2px_1fr] h-full w-full bg-[#2d2d2d] color-white">
        <TabsList className="flex flex-col h-full p-3 items-start justify-start bg-[#292929]">
          <WindowCloseButtons CloseApp={CloseApp} openedApp={openedApp} />

          <div className="relative  w-full max-w-md py-3">
            <Input
              type="search"
              disabled
              placeholder="Search"
              className="w-full rounded-lg border border-[#383637] bg-[#383637] px-4 pl-10 py-2 text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
            <div className="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <TabsTrigger className="w-full justify-start data-[state=active]:bg-[#195cc5] text-white data-[state=active]:text-white" value="id">
            <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className=" text-left">Pranav Sunil</p>
              <p className=" text-left text-xs text-[#cfcece] ">Developer</p>
            </div>

            </div>
          </TabsTrigger>
          <TabsTrigger className="pointer-events-none !cursor-not-allowed  mt-5 w-full justify-start data-[state=active]:bg-[#195cc5] text-white data-[state=active]:text-white" value="update">
              Software Update Available
              <div className="w-6 h-6 rounded-[20px] ml-2 bg-[#fa605a] flex items-center justify-center">1</div>
          </TabsTrigger>

          <TabsTrigger className="mt-5 w-full justify-start data-[state=active]:bg-[#195cc5] text-white data-[state=active]:text-white" value="account">Account</TabsTrigger>
          <TabsTrigger className="w-full justify-start data-[state=active]:bg-[#195cc5] text-white data-[state=active]:text-white " value="password">Password</TabsTrigger>
        </TabsList>
        <div className="bg-black"></div>
        <TabsContent value="account"><div className="cursor-not-allowed">Make changes to your account here. </div></TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs> 
      );
}
 
export default SettingsPage;