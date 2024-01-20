"use client";
import { useRouter } from "next/navigation";
import SubmitButton from "../components/SubmitButton";
import Image from "next/image";


export default async function Home() {
    const router = useRouter();

    const handleRsvpButtonClicked = (e) => {
        router.push("/rsvp");
    };

    return (
        <div className="font-cormorant">
            <div className="lg:mx-20">
                <Image
                    className=""
                    src="/DSC_2079.JPG"
                    width={1000}
                    height={1000}
                    alt=""
                />
            </div>
            
            {/* <Image
                className="block lg:hidden landscape:hidden -z-10 left-0"
                src="/image-from-rawpixel-id-13069117-original.png"
                width={1000}
                height={200}
                alt=""
            />        */}
                         
            
            <div className="lg:hidden pb-12 text-4xl text-center portrait:absolute portrait:top-96 portrait:mx-5 landscape:pt-12">JENNIFER & DILLON</div>
            <div className="text-xl">
                <div className="text-center border-b-2 border-black pb-8 mx-20 lg:mx-96 lg:pt-8 ">
                    <div className="text-xl lg:text-3xl">WEDDING DAY</div>
                    <div className="text-lg lg:text-xl">October 18, 2024</div>
                </div>

                <div className="text-center pt-8">
                    <div className="text-xl lg:text-3xl">The Hummingbird House</div>
                    <div className="text-sm text-stone-500">12805 Arroyo Doble Dr, Manchaca, TX 78652</div>
                </div>
                
            </div>
            
            <div className="py-10 mx-20 lg:mx-96">
                <SubmitButton label="RSVP" onButtonClick={(e) => {handleRsvpButtonClicked(e);}}/>
            </div>
            <div className="border-b-2 border-t-2 border-gray mt-5 w-full py-8">
                <div>Reception: TBD</div>
            </div>
        </div>        
    )
}
