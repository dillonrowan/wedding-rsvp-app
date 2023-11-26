"use client";
import React from "react";
import { useState } from "react";

export default function SearchText(props) {
    const [searchInput, setSearchInput] = useState("");
    const handleInput = (value) => {
        setSearchInput(value);
        props.handleInput(value);
    };

    return (
        // <div>
        //     <input
        //         className="border-red"
        //         type="text"
        //         name="searchName"
        //         value={searchInput}
        //         onChange={(e) => {
        //             handleInput(e.target.value);
        //         }}></input>
        // </div>
        <div>
            {/* font-cormorant bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 placeholder-gray-400 */}
            <input type="text"className="font-cormorant bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:outline-purple-500 block w-full p-2.5 placeholder-gray-400"
                placeholder={props.placeholder}
                value={searchInput}
                onChange={(e) => {
                    handleInput(e.target.value);
                }}></input>
        </div>
    );
}
