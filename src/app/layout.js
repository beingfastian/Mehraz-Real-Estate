import { Roboto } from "next/font/google";
import "@/app/globals.css";
import { AlertProvider } from "@/context/AlertContext";
import StoreProvider from "@/store/StoreProvider";
import { ToastContainer } from "./nexttoast";
import "react-toastify/dist/ReactToastify.css";
import FlowbiteClientComponent from "./flowbite"; // Import the client component
import Auth from "../context/UserContext";
import Script from "next/script";
// import "flowbite";
// import "flowbite/dist/flowbite.min.js";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Mehraz",
  description: "TOWARDS A NEW ERA OF ARCHITECTURE...",
  metadataBase: new URL("https://mehraz-gamma.vercel.app/"),
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          {/* <link
            href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
            rel="stylesheet"
          /> */}
        </head>
        <body 
        className={`${roboto.className} `}
        >
          <Auth>
            <StoreProvider>
              <AlertProvider>{children}</AlertProvider>
            </StoreProvider>
            <ToastContainer />
          </Auth>
          <Script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js"></Script>
        </body>
      </html>
    </>
  );
}
