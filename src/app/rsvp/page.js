"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchRsvpByNameForm from "../../components/SearchRsvpByNameForm";

export default function Page() {
    const router = useRouter();
    // Invalidate client side to show most recent data. This is because the data from the server component rsvp/search/[name]
    // will probably have data that is different. Meaning what was hydrated from initial load is no longer valid.
    useEffect(()=>{
        // Refresh the current route. Making a new request to the server, re-fetching data requests, and re-rendering Server Components.
        // https://nextjs.org/docs/app/api-reference/functions/use-router
        router.refresh();
    },[router]);

    return (
        <div className="flex flex-col lg:items-center text-center">
            <div className="lg:w-1/3 ">
                <p className="font-cormorant text-2xl">
                    If you're responding for you and a guest (or your family), you'll be able to RSVP for your entire group.
                    Please enter full name to submit search.
                </p>
            </div>            
            <div className="lg:w-1/3 "><SearchRsvpByNameForm /></div>
        </div>
    );
}
