"use client";
import Image from "next/image";

import { usePathname } from "next/navigation";

export default function FloorFoliage(props) {
    const pathname = usePathname();
    const pathsWithoutImage = ["/", "/photos", "/travel", "/story"];

    function isShowingFloorImage() {
        return !pathsWithoutImage.includes(pathname);
    }

    return (
        <>    
            {
                isShowingFloorImage() ? 
                    <Image
                        loading="eager"
                        className="rotate-180 podbar -z-10 lg:hidden"
                        src="/leaves.webp"
                        width={2000}
                        height={500}
                        alt=""
                    /> : null
            }
        </>
    );
}