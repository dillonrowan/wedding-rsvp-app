import "./globals.css";
import { Cormorant } from "next/font/google";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import Image from 'next/image'


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
                <div className="grid grid-cols-[minmax(40px,_0.08fr)_minmax(0px,_1fr)_minmax(40px,_0.08fr)]">
                    <Drawer navItems={navItems}/>
                    <h1 className="font-cormorant select-none justify-self-center self-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                        Jennifer & Dillon
                    </h1>
                </div>                
                
                <Navbar navItems={navItems}/>
                <div className="py-5">{children}</div>
                <Image
                    className="rotate-180 podbar -z-10"
                    src="/leaves.webp"
                    width={2000}
                    height={1000}
                    alt="Picture of the author"
                />
            </body>
        </html>
    );
}
