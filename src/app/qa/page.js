export default function Qa() {
    /**
     * what time
     * what rules, no pets (value doesn't allow), what to wear
     * Where is it at: hummingbird hos
     * Reception starts at: (to follow, TBD)
     * Ceremony starts at this time, arrive 30 mins early to ceremony
     * what attire should I wear
     * Should I bring a gift. A gift is not required, but we would greatly appreciate something off the registry.
     */
    return (
        <div className="font-cormorant flex flex-col items-center">
            <div className="pb-12 text-center">
                <div className="text-3xl">Are pets allowed?</div>
                <p className="text-xl text-stone-500">No, please do not bring any pets.</p>
            </div>     
            <div className="pb-12 text-center">
                <div className="text-3xl">What should I wear?</div>
                <p className="text-xl text-stone-500">Our dress code is cocktail attire. For the ladies, please avoid wearing white or any color resembling plum.</p>
            </div>
            <div className="pb-12 text-center">
                <div className="text-3xl">When is the ceremony?</div>
                <p className="text-xl text-stone-500">The ceremony is 4:30 p.m with reception to follow.</p>
            </div>        
            <div className="pb-12 text-center">
                <div className="text-3xl">Should I bring a gift?</div>
                <p className="text-xl text-stone-500">A gift is not required, but we would greatly appreciate something off the registry.</p>
            </div>      
        </div>
    );
}
