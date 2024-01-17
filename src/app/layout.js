import "./globals.css";
import { Cormorant } from "next/font/google";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import Image from "next/image";


const cormorant = Cormorant({ 
    subsets: ["latin"],
    display: "swap",
    variable: "--font-cormorant"
});

export const metadata = {
    title: "Jennifer & Dillon Wedding",
    description: "A web app to submit and edit rsvp data for our wedding.",
};

export default function RootLayout({ children }) {

    const navItems = [
        ["Home", "/"],
        ["Our Story", "/story"],
        ["Photos", "/photos"],
        ["Q + A", "/qa"],
        ["Travel", "/travel"],
        ["Things to Do", "/activities"],
        ["Registry", "/registry"],
        ["RSVP", "/rsvp"],
    ];
    
    return (
        <html lang="en" className={`${cormorant.variable} h-full`} >
            <body >

                {/* Header for non-mobile */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-[minmax(40px,_0.08fr)_minmax(0px,_1fr)_minmax(40px,_0.08fr)]">
                        <div></div>
                        <h1 className="mb-5 font-cormorant select-none justify-self-center self-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                            Jennifer & Dillon
                        </h1>
                        <div></div>
                    </div>    
                    <Navbar navItems={navItems}/>
                </div>  

                {/* Header for mobile */}
                <div className="lg:hidden">
                    <div className="grid grid-cols-[minmax(40px,_0.08fr)_minmax(0px,_1fr)_minmax(40px,_0.08fr)] fixed bg-white z-10 w-full h-14 items-center">
                        <Drawer navItems={navItems}/>
                        <h1 className="font-cormorant select-none justify-self-center self-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                            J & D
                        </h1>
                    </div>    
                </div>                        
                
                <div className="pt-20 pb-5 portrait:px-5 landscape:px-28">{children}</div>
                {/* <Image
                    className="rotate-180 podbar -z-10"
                    src="/leaves.webp"
                    width={2000}
                    height={1000}
                    alt=""
                /> */}
            </body>
        </html>
    );
}
