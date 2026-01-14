export default function PageLoader({isVisible}) {
    return (
        <div
            className={`
                fixed inset-0 z-[9999]
                flex items-center justify-center
                bg-black
                transition-opacity duration-500 ease-in-out
                ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
        >
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
        </div>
    );
}
