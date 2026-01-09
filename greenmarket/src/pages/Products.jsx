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
            {/* Titre principal (hiérarchie) */}
            <h1 className="sr-only">Liste des produits</h1>

            {/* Barre de recherche */}
            <form
                className="flex justify-between w-full pb-6"
                onSubmit={(e) => e.preventDefault()}
                role="search"
            >
                <div className="bg-[#212529] flex items-center gap-x-3 rounded-[6px] px-4 py-2 text-[#F8F9FA]">
                    <label htmlFor="search-product" className="sr-only">
                        Rechercher un produit
                    </label>
                    <LuSearch aria-hidden="true" />
                    <input
                        type="search"
                        name="search-product"
                        id="search-product"
                        placeholder="Rechercher un produit..."
                        className="bg-transparent outline-none text-[#F8F9FA]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div
                    className="filter flex items-center bg-[#212529] rounded-[6px] px-4 py-2 text-[#F8F9FA]"
                    aria-hidden="true"
                >
                    <LuSettings2 />
                </div>
            </form>

            {/* Loader */}
            {loading && (
                <p
                    className="text-center text-gray-500 py-12"
                    aria-live="polite"
                >
                    Chargement des produits…
                </p>
            )}

            {/* Erreur API */}
            {error && (
                <p className="text-center text-red-500 py-12" role="alert">
                    Une erreur est survenue lors du chargement des produits.
                </p>
            )}

            {/* Grille produits */}
            {!loading && !error && (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pb-6"
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
        </section>
    );
}
