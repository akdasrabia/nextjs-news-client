import Navbar from "@/components/navbar/Navbar";
import "react-quill/dist/quill.snow.css";
import "./globals.css";
import { Inter } from "next/font/google";

import { StoreProvider } from "@/stores/store-provider";

import { store } from "@/stores";
import { fetchUser } from "@/stores/user-store/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News App",
};

export default async function RootLayout({ children }) {
  await store.dispatch(fetchUser());
  console.log(store.getState().user);

  return (
    <html lang="en">

      <body className={inter.className}>
        <StoreProvider preloadedState={{
          user: {
            user: 'deneme'
          }
        }}>
          <div className="">
            <div className="wrapper">
              <Navbar></Navbar>
              {children}
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
