import React from "react";
import SubmitButton from "@/components/SubmitButton";

export default function Page() {
    return (
        <div className="flex flex-col lg:items-center font-cormorant text-center">
            <p className="lg:w-1/3 text-2xl">Our wedding registry is being managed by The Knot. To add to our funds and purchase us a gift please navigate to our registry site by clicking the button below.</p>
            <div className="py-8 text-2xl ">Thank you so much for the support!</div>
            <div className="lg:w-1/3 "><a target="_blank" href="https://registry.theknot.com/dillon-rowan-october-2024-tx/63291690"><SubmitButton label={"REGISTRY"} /></a></div>
        </div>
    );
}
