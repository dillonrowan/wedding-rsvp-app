"use client";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";

export default function NavigationButton(props) {

    const router = useRouter();

    const handleButtonClicked = (e) => {
        router.push("/" + props.route);
    };

    return (
        <SubmitButton label="RSVP" onButtonClick={(e) => {handleButtonClicked(e);}}/>
    );
}