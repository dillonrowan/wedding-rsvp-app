import LocationCard from "@/components/LocationCard";

export default function Travel() {
    return (
        <div className="font-cormorant flex flex-col gap-12 items-center">
            <LocationCard name="Hampton Inn & Suites Austin South/Buda" address="1201 Cabelas Dr, Buda, TX 78610" phoneNumber="(512) 295-4900" website="https://www.hilton.com/en/hotels/ausbuhx-hampton-suites-austin-south-buda/?SEO_id=GMB-AMER-HX-AUSBUHX&y_source=1_MjA4MjE0Mi03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D"/>
            <LocationCard name="Comfort Suites Buda - Austin South" address="15295 S I-35 Frontage Rd, Buda, TX 78610" phoneNumber="(512) 295-8600" website="https://www.choicehotels.com/texas/buda/comfort-suites-hotels/txc51?mc=llgoxxpx" />
            <LocationCard name="Fairfield Inn & Suites by Marriott Austin Buda" address="1240 Cabelas Dr, Buda, TX 78610" phoneNumber="(512) 295-1600" website="https://www.marriott.com/en-us/hotels/ausbu-fairfield-inn-and-suites-austin-buda/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0" />
            <LocationCard name="Best Western Plus Buda Austin Inn & Suites" address="15295 S I-35 Frontage Rd Bldg 900, Buda, TX 78610" phoneNumber="(512) 361-0455" website="https://www.bestwestern.com/en_US/book/hotel-rooms.44737.html?iata=00171880&ssob=BLBWI0004G&cid=BLBWI0004G:google:gmb:44737" />
            <p className="text-stone-500 lg:w-1/2">These are a few hotels closest to the venue. If you need help reaching the location, please do not hesitate to reach out to us or The Hummingbird House at (512) 934-0201. Their staff will be more than happy to assist. We look forward to seeing you at our wedding!</p>
        </div>
    );
}
