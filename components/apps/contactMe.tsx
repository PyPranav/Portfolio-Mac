import { useEffect } from "react";
import TextComponent from "../custom/textComponent";
import WindowCloseButtons from "../custom/windowCloseButtons";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const ContactMePage = ({
  CloseApp,
  openedApp,
  appStates,
  setAppStates,
}: {
  CloseApp: (appNum: number) => void;
  openedApp: number;
  appStates: any;
  setAppStates: any;
}) => {
  return (
    <div className="bg-[#232323] h-full overflow-y-scroll flex flex-col">
      <div className=" sticky top-0 z-[1000] bg-[#232323] mb-5">
        <div className="bg-[#1f1f1f] p-5 flex items-center relative">
          <div className=" absolute">
            <WindowCloseButtons CloseApp={CloseApp} openedApp={openedApp} />
          </div>
          <p className="w-full text-center">Contact Me</p>
        </div>
        <hr className="border-black" />
        <div className="p-5">
          <p className="text-center font-bold text-2xl mt-5">Drop Me a Line</p>
          <p className="text-center mt-4">
            {
              "Ready, set, message! I'm eagerly awaiting your thoughts and will reply ASAP."
            }
          </p>
          <form
            className="flex flex-col gap-4 mt-10"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(appStates[openedApp]);

              // Add your logic here
              //

              toast({
                title: "Message Sent!",
                className:
                  "w-fit fixed top-8 right-8 border-0 bg-green-800/60 backdrop-blur-md rounded-xl p-4 text-green-100 shadow-md border border-green-700/30 flex items-center gap-2",
                duration: 1000,
                description: "Your message has been sent successfully.",
              });

              setAppStates((prev: any) => ({
                ...prev,
                [openedApp]: {
                  ...prev[openedApp],
                  name: "",
                  email: "",
                  message: "",
                },
              }));
            }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <TextComponent
                value={appStates[openedApp]["name"]}
                placeholder="Your Name"
                onChange={(e) => {
                  setAppStates((prev: any) => ({
                    ...prev,
                    [openedApp]: {
                      ...prev[openedApp],
                      name: e.target.value,
                    },
                  }));
                }}
                name="name"
                label="Name"
                required
              />
              <TextComponent
                value={appStates[openedApp]["email"]}
                placeholder="your.email@example.com"
                type="email"
                onChange={(e) => {
                  setAppStates((prev: any) => ({
                    ...prev,
                    [openedApp]: {
                      ...prev[openedApp],
                      email: e.target.value,
                    },
                  }));
                }}
                name="email"
                label="Email"
                required
              />
            </div>
            <TextComponent
              value={appStates[openedApp]["message"]}
              placeholder="Write your message here....."
              onChange={(e) => {
                setAppStates((prev: any) => ({
                  ...prev,
                  [openedApp]: {
                    ...prev[openedApp],
                    message: e.target.value,
                  },
                }));
              }}
              name="message"
              label="Message"
              isTextArea
              required
            />

            <div className="flex flex-row justify-between mt-3">
              <div className="opacity-0"> Buy me a coffee</div>

              <button
                type="submit"
                className={`flex flex-row items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md  font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 `}
              >
                {"Send Message"}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="rotate-45"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMePage;
