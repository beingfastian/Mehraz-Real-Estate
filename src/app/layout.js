import { Roboto } from "next/font/google";
import "@/app/globals.css";
import { AlertProvider } from "@/context/AlertContext";
import StoreProvider from "@/store/StoreProvider";
import { ToastContainer } from "./nexttoast";
import "react-toastify/dist/ReactToastify.css";
import FlowbiteClientComponent from "./flowbite";
import Auth from "../context/UserContext";
import Script from "next/script";
import { RedirectProvider } from "@/context/redirectContext"; // ✅ Import it here

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
    <html lang="en">
      <head />
      <body>
        <div className={roboto.className}>
          <Auth>
            <RedirectProvider>
              <StoreProvider>
                <AlertProvider>{children}</AlertProvider>
              </StoreProvider>
              <ToastContainer />
            </RedirectProvider>
          </Auth>
        </div>
        <Script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js" />
      </body>
    </html>
  );
}
