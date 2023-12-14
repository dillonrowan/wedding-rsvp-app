import React from "react";
import Link from "../../node_modules/next/link";
const Navbar = (props) => {
    return (
        <nav className="hidden lg:flex sm:justify-center space-x-4">
            {props.navItems.map(([title, url]) => (
                <Link
                    key={title}
                    href={url}
                    className="font-cormorant select-none rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">
                    {title}
                </Link>
            ))}
        </nav>
    );
};
export default Navbar;
