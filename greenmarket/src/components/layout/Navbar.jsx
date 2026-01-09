import {useState} from 'react';
import {LuMenu} from 'react-icons/lu';
import {Link} from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const menuItems = {Home: '/', Products: '/products'};

    return (
        <nav className="fixed left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] md:max-w-6xl px-6 py-3 border-2 border-white border-t-0 rounded-b-[16px] bg-gradient-to-r from-[#DB4D72] to-[#E47995] text-[#FBE9ED] z-50 shadow-lg">
            <div className="flex items-center justify-between">
                <strong className="text-[42px] md:text-[50px] font-bold">
                    G.M.
                </strong>

                <ul className="hidden md:flex gap-8 text-lg">
                    {Object.entries(menuItems).map(([label, path]) => (
                        <li
                            key={label}
                            className="hover:text-[#FFD6E0] transition-colors"
                        >
                            <Link to={path}>{label}</Link>
                        </li>
                    ))}
                </ul>

                <button
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-label="Toggle menu"
                >
                    <LuMenu className="text-[32px]" />
                </button>
            </div>

            <ul
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    open ? 'max-h-60 mt-4 flex flex-col gap-3' : 'max-h-0'
                }`}
            >
                {Object.entries(menuItems).map(([label, path]) => (
                    <li
                        key={label}
                        className="hover:text-[#FFD6E0] transition-colors"
                    >
                        <Link to={path} onClick={() => setOpen(false)}>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
