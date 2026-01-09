import {useEffect, useState} from 'react';
import {LuSearch, LuSettings2} from 'react-icons/lu';
import ProductCard from '../components/features/products/ProductCard';
import {fetchData} from '../components/services/Fetch';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchData('https://fakestoreapi.com/products')
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Erreur API:', err);
                setError(true);
                setLoading(false);
            });
    }, []);

    // 🔍 Recherche par titre
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="products-list min-h-screen px-6 pt-36 pb-12">
            <h1 className="sr-only">Liste des produits</h1>

            {/* Layout principal */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">
                {/* ===== Colonne gauche : Search & filtres ===== */}
                <aside className="w-full">
                    <form
                        className="flex flex-col gap-4 sticky top-32"
                        onSubmit={(e) => e.preventDefault()}
                        role="search"
                    >
                        {/* Search */}
                        <div className="bg-[#212529] flex items-center gap-x-3 rounded-[8px] px-4 py-3 text-[#F8F9FA]">
                            <label htmlFor="search-product" className="sr-only">
                                Rechercher un produit
                            </label>
                            <LuSearch aria-hidden="true" />
                            <input
                                type="search"
                                id="search-product"
                                placeholder="Rechercher un produit..."
                                className="bg-transparent outline-none w-full text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filtres (placeholder) */}
                        <button
                            type="button"
                            className="flex items-center gap-2 bg-[#212529] text-[#F8F9FA] rounded-[8px] px-4 py-3 hover:bg-[#343a40] transition"
                        >
                            <LuSettings2 />
                            <span className="text-sm">Filtres</span>
                        </button>
                    </form>
                </aside>

                {/* ===== Colonne droite : Produits ===== */}
                <main>
                    {/* Loader */}
                    {loading && (
                        <p
                            className="text-center text-gray-500 py-12"
                            aria-live="polite"
                        >
                            Chargement des produits…
                        </p>
                    )}

                    {/* Erreur */}
                    {error && (
                        <p
                            className="text-center text-red-500 py-12"
                            role="alert"
                        >
                            Une erreur est survenue lors du chargement des
                            produits.
                        </p>
                    )}

                    {/* Grille produits */}
                    {!loading && !error && (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10"
                            role="list"
                            aria-label="Catalogue produits"
                        >
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <article
                                        key={product.id}
                                        role="listitem"
                                        tabIndex={0}
                                        className="focus:outline focus:outline-2 focus:outline-[#DB4D72] rounded"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                window.location.href = `/products/${product.id}`;
                                            }
                                        }}
                                    >
                                        <ProductCard
                                            id={product.id}
                                            imageSrc={product.image}
                                            imageAlt={product.title}
                                            price={product.price}
                                            title={product.title}
                                            description={product.description}
                                        />
                                    </article>
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">
                                    Aucun produit trouvé
                                </p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </section>
    );
}
