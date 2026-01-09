import {useEffect, useState} from 'react';
import {IoArrowDown} from 'react-icons/io5';
import {LuArrowRight, LuQuote} from 'react-icons/lu';
import ProductCard from '../components/features/products/ProductCard';
import {fetchData} from '../components/services/Fetch';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData('https://fakestoreapi.com/products')
            .then((data) => {
                setProducts(data.slice(0, 4));
            })
            .catch((err) => console.error('Erreur API:', err));
    }, []);

    const values = [
        'Produits durables',
        'Respect Environnement',
        'Traçabilité',
        'Matières recyclable',
    ];

    const scrollToProducts = () => {
        const el = document.getElementById('products');
        if (el) {
            el.scrollIntoView({behavior: 'smooth', block: 'start'});
            // Move focus so keyboard users are placed into the product list
            el.focus({preventScroll: true});
        }
    };

    return (
        <>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:px-3 focus:py-2 rounded"
                onClick={(e) => {
                    // allow normal anchor behavior but also focus target
                    const target = document.getElementById('main');
                    if (target) {
                        e.preventDefault();
                        target.focus();
                    }
                }}
            >
                Aller au contenu
            </a>

            <section
                className="landing h-screen w-full flex items-center justify-center"
                aria-labelledby="home-title"
            >
                <div
                    className="text-wrapper flex flex-col gap-6 px-6 text-center"
                    id="main"
                    tabIndex={-1}
                >
                    <div className="flex flex-col gap-0">
                        <h1
                            id="home-title"
                            className="text-[82px] text-[#DB4D72]"
                        >
                            Green Market
                        </h1>

                        <p className="description text-[19px] text-[#E47995] mt-4">
                            Consommez responsable : produits durables, locaux et
                            tracés pour un quotidien plus vert.
                        </p>
                    </div>

                    <div className="see-more__wrap flex self-center items-center gap-x-3 text-[#DB4D72]">
                        <button
                            type="button"
                            onClick={scrollToProducts}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    scrollToProducts();
                                }
                            }}
                            aria-controls="products"
                            aria-label="Voir les produits phares"
                            className="flex items-center gap-3 focus:outline focus:outline-2 focus:outline-[#DB4D72] bg-transparent"
                        >
                            <IoArrowDown className="size-8 bg-[#F8F9FA] rounded-[4px] outline-1 outline-[#DB4D72] hover:translate-y-1 transition-all duration-200 ease-out" />
                            <span className="text-xl">VOIR LES PRODUITS</span>
                        </button>
                    </div>
                </div>
            </section>

            <section
                id="products"
                className="our-products bg-[#90E99C] p-[24px]"
                aria-labelledby="products-heading"
            >
                <div className="w-full p-[12px] pb-6 flex flex-col rounded-[12px] outline-2 outline-[#F8F9FA] bg-[#4DDB60]">
                    <h2
                        id="products-heading"
                        className="title text-[4rem] mb-6"
                    >
                        Produits Phares
                    </h2>

                    <div
                        role="list"
                        aria-label="Liste des produits phares"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {products.map((product) => (
                            <article
                                key={product.id}
                                role="listitem"
                                tabIndex={0}
                                aria-labelledby={`product-title-${product.id}`}
                                className="focus:outline focus:outline-2 focus:outline-[#DB4D72] rounded"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        window.location.href = `/products/${product.id}`;
                                    }
                                }}
                            >
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    imageSrc={product.image}
                                    imageAlt={product.title}
                                    price={product.price}
                                    title={product.title}
                                    description={product.description}
                                    // promotion={product.price > 50} Exemple
                                />
                            </article>
                        ))}
                    </div>

                    <a
                        href="/products"
                        className="bg-[#D3F6D7] w-fit flex self-center items-center rounded-[16px] p-2 mt-8 text-[20px] gap-x-2 drop-shadow-md focus:outline focus:outline-2 focus:outline-[#DB4D72]"
                    >
                        Tous nos produits juste là
                        <LuArrowRight className="size-6" />
                    </a>
                </div>
            </section>

            <section className="valeurs-avis px-6 py-12">
                <div className="relative w-full flex items-center bg-[#212529] justify-center px-3 py-4 overflow-hidden outline-2 outline-[#FBE9ED] rounded-[8px]">
                    <div
                        className="absolute inset-0 pointer-events-none flex flex-wrap justify-center items-center"
                        style={{
                            maskImage:
                                'linear-gradient(to bottom, transparent 0%, black 50%, black 100%)',
                            WebkitMaskImage:
                                'linear-gradient(to bottom, transparent 0%, black 30%, black 100%)',
                        }}
                        aria-hidden="true"
                    >
                        {Array(50)
                            .fill('VALEURS')
                            .map((text, idx) => (
                                <span
                                    key={idx}
                                    className="text-[4rem] font-extrabold text-[#FBE9ED] opacity-70 select-none blur-xs m-2"
                                >
                                    {text}
                                </span>
                            ))}
                    </div>

                    <div className="relative z-10 w-full flex flex-wrap gap-6 max-w-4xl px-4">
                        {values.map((item, idx) => (
                            <div
                                key={item}
                                className={`bg-[#FBE9ED] text-[#DB4D72] flex text-[1.4rem] md:text-xl px-2 py-3 rounded-xl shadow-md min-w-[220px] text-center ${
                                    idx % 2 === 0
                                        ? 'justify-self-center'
                                        : 'justify-self-end'
                                }`}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12">
                    <strong className="title text-[2.5rem] text-[#F8F9FA]">
                        Les avis de nos clients
                    </strong>
                    <div
                        className="quote__container flex gap-x-6 overflow-scroll"
                        aria-label="Témoignages clients"
                    >
                        <div
                            className="bg-white min-w-[200px] rounded-xl shadow-lg px-4 py-2 max-w-md w-full relative text-[#DB4D72]"
                            role="group"
                            aria-labelledby="quote-1-author"
                        >
                            <div className="absolute top-4 left-4 text-4xl font-bold select-none">
                                <LuQuote />
                            </div>

                            <p className="text-[#E47995] text-base mt-12 mb-3 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur
                                adipiscing elit Ut et massa mi...
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#DB4D72]" />
                                <span id="quote-1-author">N. User</span>
                            </div>
                        </div>

                        <div
                            className="bg-white min-w-[200px] rounded-xl shadow-lg px-4 py-2 max-w-md w-full relative text-[#DB4D72]"
                            role="group"
                            aria-labelledby="quote-2-author"
                        >
                            <div className="absolute top-4 left-4 text-4xl font-bold select-none">
                                <LuQuote />
                            </div>

                            <p className="text-[#E47995] text-base mt-12 mb-3 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur
                                adipiscing elit Ut et massa mi...
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#DB4D72]" />
                                <span id="quote-2-author">N. User</span>
                            </div>
                        </div>

                        <div
                            className="bg-white min-w-[200px] rounded-xl shadow-lg px-4 py-2 max-w-md w-full relative text-[#DB4D72]"
                            role="group"
                            aria-labelledby="quote-3-author"
                        >
                            <div className="absolute top-4 left-4 text-4xl font-bold select-none">
                                <LuQuote />
                            </div>

                            <p className="text-[#E47995] text-base mt-12 mb-3 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur
                                adipiscing elit Ut et massa mi...
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#DB4D72]" />
                                <span id="quote-3-author">N. User</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
