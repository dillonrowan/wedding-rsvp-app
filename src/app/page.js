import NavigationButton from "../components/NavigationButton";
import Image from "next/image";

export default async function Home() {

    return (
        <div className="font-cormorant flex flex-col items-center gap-8">
            <div className="">
                <Image
                    loading="eager"
                    className="hidden lg:block oval"
                    src="/DSC_2079_crop_resized.JPG"
                    width={1000}
                    height={1010}
                    alt=""
                />
                <Image
                    loading="eager"
                    className="lg:hidden"
                    src="/DSC_2079_resized.JPG"
                    width={320}
                    height={214}
                    alt=""
                />
            </div>
            
            <Image
                loading="eager"
                className="lg:hidden"
                src="/AdobeStock_700933455_resized.png"
                width={200}
                height={200}
                alt=""
            />
            
            <div className="lg:hidden text-4xl text-center">JENNIFER & DILLON</div>
            <div className="text-center border-b-2 border-black pb-8">
                <div className="text-xl lg:text-3xl">WEDDING DAY</div>
                <div className="text-lg lg:text-xl">October 18, 2024</div>
            </div>

            <div className="text-center">
                <div className="text-xl lg:text-3xl">The Hummingbird House</div>
                <div className="text-sm text-stone-500">12805 Arroyo Doble Dr, Manchaca, TX 78652</div>
            </div>
            
            <div className="w-1/3 pb-8">
                <NavigationButton route="rsvp" />
            </div>
        </div>        
    );
}
