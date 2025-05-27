"use client"

const Loading = () => {
  return (
    <>
      {/* <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 h-20 border-8 border-accent-2-base border-b-transparent rounded-full animate-spin"></div>
      </div> */}
      <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen" 
           style={{backgroundImage: 'url(/images/LoadingBG.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="flex flex-col items-center justify-center gap-y-8">
          {/* Animated Text */}
          <div className="relative h-[200px] mfxs:h-[150px] flex items-center">
            <img 
              src="/images/mehraz_logo.png"
              alt="Mehraz Logo"
              className="w-full max-w-[300px] mfxs:max-w-[200px] h-auto object-contain absolute left-1/2 -translate-x-1/2 animate-[showAndHide_2s_ease-in-out_forwards] opacity-1"
            />
            <div className="text-white text-5xl mfxs:text-4xl text-center animate-[slideUpAndOut_2s_ease-in-out_1s_forwards] opacity-0">
              <span className="font-normal">Build Your</span> <strong className="font-bold">Dream</strong>
            </div>
          </div>

          {/* MyVerse Logo */}
          <div className="w-60 mfxs:w-72 h-auto absolute bottom-10">
            <img
              src="/images/verseLogo.png" 
              alt="MyVerse Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUpAndOut {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          50% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0;
          }
        }
        @keyframes showAndHide {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Loading;
