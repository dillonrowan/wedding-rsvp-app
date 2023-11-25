"use client";
import React, { useState, useEffect } from "react";
import SubmitButton from "../../components/SubmitButton";

export default function Page() {
    const [myNum, setMyNum] = useState(0);

    const handleBackButtonClicked = (e) => {
        console.log(myNum);
        setMyNum(myNum + 1);
        console.log("BACK BUTTON CLICKED");
    };
    return (
        <div>
            <div>{myNum}</div>
            <SubmitButton label="TEST" onButtonClick={(e) => { handleBackButtonClicked(e); }}/>
        </div>
    );
}
