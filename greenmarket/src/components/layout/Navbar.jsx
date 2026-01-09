import {useState} from 'react';
import {LuMenu} from 'react-icons/lu';
import {Link} from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const menuItems = {Home: '/', Products: '/products', Contact: '/contact'};

    return (
        <nav className="w-auto mx-3 px-6 py-3 border-2 border-white border-t-0 rounded-b-[16px] bg-gradient-to-r from-[#DB4D72] to-[#E47995] text-[#FBE9ED]">
            <div className="flex items-center justify-between">
                <h1 className="text-[50px] font-bold">G.M.</h1>
                <LuMenu
                    className="text-[32px] cursor-pointer"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-label="Toggle menu"
                />
            </div>

            {/* Menu déroulant */}
            <ul
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    open ? 'max-h-96 mt-4 flex flex-col gap-3' : 'max-h-0'
                }`}
            >
                {Object.entries(menuItems).map(([label, path]) => (
                    <li
                        key={label}
                        className="cursor-pointer hover:text-[#FFD6E0] transition-colors"
                    >
                        <Link to={path}>{label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
