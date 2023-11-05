"use client";
import React from "react";
import SearchRsvpByNameForm from "../../components/SearchRsvpByNameForm";

export default function Page() {
    return (
        <div>
            <p>
				If you're responding for you and a guest (or your family),
				you'll be able to RSVP for your entire group.
            </p>
            <SearchRsvpByNameForm />
        </div>
    );
}
