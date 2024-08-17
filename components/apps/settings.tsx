import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import WindowCloseButtons from "../custom/windowCloseButtons";

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


          <TabsTrigger className="w-full justify-start data-[state=active]:bg-[#195cc5] " value="account"><p className=" ">Account</p></TabsTrigger>
          <TabsTrigger className="w-full justify-start data-[state=active]:bg-[#195cc5] color-white" value="password">Password</TabsTrigger>
        </TabsList>
        <div className="bg-black"></div>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs> 
      );
}
 
export default SettingsPage;