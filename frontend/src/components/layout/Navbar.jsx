import { useMemo, useState } from 'react';
import { LuMenu } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import useToken from '../features/auth/hooks/useToken';

function displayLink(items, isLogged) {
    return Object.entries(items).flatMap(([label, path]) => {
        if (label === "notAuth") {
            if (isLogged) return [];

            return Object.entries(path).map(([subLabel, subPath]) => (
                <li
                    key={subLabel}
                    className="hover:text-[#FFD6E0] transition-colors"
                >
                    <Link to={subPath}>{subLabel}</Link>
                </li>
            ));
        } else if (label === "auth") {
            if (!isLogged) return [];

            return Object.entries(path).map(([subLabel, subPath]) => {
                if (typeof subPath === "function") {
                    return (
                        <li key={subLabel}>
                            <button onClick={subPath} className='cursor-pointer'>
                                {subLabel}
                            </button>
                        </li>
                    );
                }

                return (
                    <li
                        key={subLabel}
                        className="hover:text-[#FFD6E0] transition-colors"
                    >
                        <Link to={subPath}>{subLabel}</Link>
                    </li>
                )
            });
        }

        return (
            <li
                key={label}
                className="hover:text-[#FFD6E0] transition-colors"
            >
                <Link to={path}>{label}</Link>
            </li>
        );
    });
}

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const { isLogged, deleteToken } = useToken();

    const menuItems = useMemo(() => ({
        Home: '/',
        Products: '/products',
        notAuth: { Login: '/login', Register: '/register' },
        auth: { Profile: '/profile', Logout: deleteToken }
    }), [deleteToken]);

    const navLinks = useMemo(() => displayLink(menuItems, isLogged), [menuItems, isLogged]);

    return (
        <nav className="fixed left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] md:max-w-6xl px-6 py-3 border-2 border-white border-t-0 rounded-b-[16px] bg-gradient-to-r from-[#DB4D72] to-[#E47995] text-[#FBE9ED] z-50 shadow-lg">
            <div className="flex items-center justify-between">
                <strong className="text-[42px] md:text-[50px] font-bold">
                    G.M.
                </strong>

                <ul className="hidden md:flex gap-8 text-lg">
                    {navLinks}
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
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-60 mt-4 flex flex-col gap-3' : 'max-h-0'}`}
            >
                {navLinks}
            </ul>
        </nav>
    );
}