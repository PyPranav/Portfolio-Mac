'use server'
const Loader = ({ speed = 4, isMobile = false }: { speed?: number, isMobile?: boolean }) => {
  const greetings = [
    { id: 'en', text: 'Hello' },
    { id: 'hi', text: 'नमस्ते' },
    { id: 'fr', text: 'Bonjour' },
    { id: 'jp', text: 'やあ' },
    { id: 'it', text: 'Ciao' },
    { id: 'gr', text: 'Hallo' },
    { id: 'kr', text: '여보' },
    { id: 'pr', text: 'Olá' },
  ];
  const totalDuration = 18 / speed; // Total duration for one complete cycle
  const individualDuration = totalDuration / greetings.length;

  return (
    <div id="loader" className="absolute top-0 left-0 right-0 bottom-0 z-[10001] bg-black">
      <div className="relative grid place-items-center h-full duration-500">
        <div className="greeting-container">
          {greetings.map((greeting, index) => (
            <p
              key={greeting.id}
              className="landingText text-5xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                animation: `fadeInOut ${totalDuration}s infinite ${index * individualDuration}s`,
              }}
            >
              {greeting.text}
            </p>
          ))}
        </div>

        <div className="absolute bottom-10 w-full h-10 grid place-items-center">
          {isMobile && <p className="text-sm text-gray-400 mb-2">View on desktop for optimal experience</p>}
          
          <div className="h-2 w-[200px] bg-gray-400 rounded-xl">
            <div className="h-full rounded-xl animate-pulse duration-700">
              <div
                id="whiteLoader"
                className="h-full bg-white rounded-xl duration-500"
                style={{
                  animation: `widthExpand ${1 / speed}s ease-in-out forwards`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;


{/* <svg className="invert" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="64" height="64" viewBox="0 0 814 1000">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
          </svg> */}