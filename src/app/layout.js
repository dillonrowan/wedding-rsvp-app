import "./globals.css";
import { Cormorant } from "next/font/google";
import Navbar from "../components/Navbar";

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
    return (
        <html lang="en" className={`${cormorant.variable}`}>
            <body className="lg:p-5">
                <div className="flex items-end lg:block title-content">
                    <button className="lg:hidden text-6xl pl-2 rounded shadow bg-gray-300">≡</button>
                    <h1 className="portrait:pl-6 landscape:pl-40 lg:p-5 home-title text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
						Jennifer & Dillon
                    </h1>
                </div>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
