import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Jennifer & Dillon Wedding",
    description: "A web app to submit and edit rsvp data for our wedding.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="title-content">
                    <h1 className="home-title mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
						Jennifer & Dillon
                    </h1>
                </div>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
