import HotelCard from "@/components/HotelCard";

export default function Travel() {
    return (
        <div className="font-cormorant flex flex-col gap-12 items-center">
            <HotelCard name="Hampton Inn & Suites Austin South/Buda" address="1201 Cabelas Dr, Buda, TX 78610" phoneNumber="(512) 295-4900" website="https://www.hilton.com/en/hotels/ausbuhx-hampton-suites-austin-south-buda/?SEO_id=GMB-AMER-HX-AUSBUHX&y_source=1_MjA4MjE0Mi03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D"/>
            <HotelCard name="Comfort Suites Buda - Austin South" address="15295 S I-35 Frontage Rd, Buda, TX 78610" phoneNumber="(512) 295-8600" website="https://www.choicehotels.com/texas/buda/comfort-suites-hotels/txc51?mc=llgoxxpx" />
            <HotelCard name="Fairfield Inn & Suites by Marriott Austin Buda" address="1240 Cabelas Dr, Buda, TX 78610" phoneNumber="(512) 295-1600" website="https://www.marriott.com/en-us/hotels/ausbu-fairfield-inn-and-suites-austin-buda/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0" />
            <HotelCard name="Best Western Plus Buda Austin Inn & Suites" address="15295 S I-35 Frontage Rd Bldg 900, Buda, TX 78610" phoneNumber="(512) 361-0455" website="https://www.bestwestern.com/en_US/book/hotel-rooms.44737.html?iata=00171880&ssob=BLBWI0004G&cid=BLBWI0004G:google:gmb:44737" />
        </div>
        
    );
}
