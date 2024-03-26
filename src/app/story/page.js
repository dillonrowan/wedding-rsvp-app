
import Image from "next/image";

export default function Story() {
    return (
        <>
        
            <div className="font-cormorant text-stone-500 pb-4 flex justify-center">
                <p className="text-2xl lg:w-2/5">
                    <span className="pr-12"></span>Jennifer and I met through a popular online dating app. Little did we both know that something as innocent as swiping right and meeting up to play video games can lead to a lifelong journey with your soul mate. When we initially met, we both quickly found out how compatible we were. From visiting new places to simply doing mundane tasks, our hearts are filled with excitement and joy because we get to spend time together. We learned to always be there for each other, and our love grew stronger and stronger. Despite every hardship we have faced, we managed to get through it together and learn from one another. We eagerly await to start a new chapter of our lives. One where we can build a loving family and spend the rest of our days together.
                </p>
            </div>
            <div className="flex justify-center">
                <Image
                    loading="eager"
                    className=""
                    src="/AdobeStock_565269862.png"
                    width={600}
                    height={100}
                    alt=""
                />
            </div>
            
        </>
    );    
}
