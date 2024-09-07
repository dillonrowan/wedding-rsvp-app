import React from "react";

export default function DeleteButton(props) {
    return (
        <button className="border-none font-cormorant h-11 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 border disabled:bg-gray-400" type="button" disabled={props.isDisabled ? true : false} onClick={props.onButtonClick}>{props.label}</button>
    );
}