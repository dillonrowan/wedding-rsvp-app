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
        <div>
            <input
                className="border-red"
                type="text"
                name="searchName"
                value={searchInput}
                onChange={(e) => {
                    handleInput(e.target.value);
                }}></input>
        </div>
    );
}
