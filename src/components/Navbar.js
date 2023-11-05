import React from "react";
import Link from "../../node_modules/next/link";
const Navbar = () => {
    return (
        <nav className="flex sm:justify-center space-x-4">
            {[
                ["Home", "/"],
                ["Our Story", "/story"],
                ["Photos", "/photos"],
                ["Q + A", "/qa"],
                ["Travel", "/travel"],
                ["Things to Do", "/activities"],
                ["Registry", "/registry"],
                ["RSVP", "/rsvp"],
            ].map(([title, url]) => (
                <Link
                    key={title}
                    href={url}
                    className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">
                    {title}
                </Link>
            ))}
        </nav>
    );
};
export default Navbar;
