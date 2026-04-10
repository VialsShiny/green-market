import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/features/products/ProductCard';
import ProductDetailCard from '../components/features/products/ProductDetailCard';
import { fetchData } from '../components/services/Fetch';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [otherLoading, setOtherLoading] = useState(true);
    const [similarError, setSimilarError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const mainRef = useRef(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        fetchData(`${apiUrl}/products/${id}`)
            .then((data) => {
                if (!mounted) return;
                setProduct(data);
                setLoading(false);

                setTimeout(() => mainRef.current?.focus(), 120);
            })
            .catch((err) => {
                if (!mounted) return;
                console.error('Erreur API:', err);
                setError(
                    'Impossible de charger le produit. Veuillez réessayer.'
                );
                setLoading(false);
                setTimeout(() => mainRef.current?.focus(), 120);
            });

        return () => {
            mounted = false;
        };
    }, [id]);

    useEffect(() => {
        if (!product?.category || !product?.id) return;
        fetchData(`${apiUrl}/products`)
            .then((data) => {
                const similar = data.filter(
                    (simProduct) =>
                        simProduct.category === product.category &&
                        simProduct.id !== product.id
                );

                setSimilarProducts(similar);
                setOtherLoading(false);
            })
            .catch((err) => {
                console.error('Erreur API:', err);
                setSimilarError(true);
                setOtherLoading(false);
            });
    }, [product]);

    return (
        <div className="min-h-screen">
            <article
                id="product-main"
                ref={mainRef}
                className="product-detail px-6 pt-32 pb-12"
                aria-labelledby="product-title"
                aria-live="polite"
            >
                <div className="max-w-5xl mx-auto mb-6">
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className="inline-flex items-center gap-2 text-[#212529] underline focus:outline focus:outline-2 focus:outline-[#DB4D72]"
                        aria-label="Retour à la liste des produits"
                    >
                        ← Retour aux produits
                    </button>
                </div>

                {loading && (
                    <div className="max-w-5xl mx-auto bg-white rounded-[16px] shadow-lg p-8 flex items-center justify-center">
                        <div
                            role="status"
                            aria-live="polite"
                            className="text-center"
                        >
                            <svg
                                className="animate-spin h-8 w-8 mx-auto text-[#B3E479]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                                />
                            </svg>
                            <p className="mt-3 text-sm text-gray-600">
                                Chargement du produit…
                            </p>
                        </div>
                    </div>
                )}

                {error && !loading && (
                    <div
                        className="max-w-5xl mx-auto bg-white rounded-[16px] shadow-lg p-8"
                        role="alert"
                        aria-live="assertive"
                    >
                        <p className="text-red-600 font-semibold">{error}</p>
                        <div className="mt-4">
                            <button
                                onClick={() => {
                                    setLoading(true);
                                    setError(null);
                                    // relancer fetch
                                    fetchData(
                                        `${apiUrl}/products/${id}`
                                    )
                                        .then((data) => {
                                            setProduct(data);
                                            setLoading(false);
                                            setTimeout(
                                                () => mainRef.current?.focus(),
                                                120
                                            );
                                        })
                                        .catch((err) => {
                                            console.error('Erreur API:', err);
                                            setError(
                                                'Impossible de charger le produit. Veuillez réessayer.'
                                            );
                                            setLoading(false);
                                        });
                                }}
                                className="bg-[#B3E479] px-4 py-2 rounded"
                            >
                                Réessayer
                            </button>
                        </div>
                    </div>
                )}

                {!loading && !error && product && (
                    <article
                        className="max-w-5xl mx-auto bg-white rounded-[16px] shadow-lg p-8 flex flex-col lg:flex-row gap-6"
                        aria-labelledby="product-title"
                    >
                        <ProductDetailCard
                            id={product.id}
                            imageSrc={product.image}
                            imageAlt={product.title}
                            title={product.title}
                            price={product.price}
                            category={product.category}
                            description={product.description}
                        // promotion={product.price > 50} Example
                        />
                    </article>
                )}
            </article>

            <hr className="w-1/2 translate-x-1/2 border-gray-300" />

            {similarProducts.length > 0 ? (
                <div className="similar-products flex justify-start lg:justify-center gap-6 xl:gap-12 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory px-4 py-6 md:gap-6 md:px-6 lg:gap-8 lg:px-8 pb-16 lg:pb-20">
                    {similarProducts.map((product) => (
                        <div
                            key={product.id}
                            className="snap-center lg:snap-start"
                        >
                            <ProductCard
                                id={product.id}
                                imageSrc={product.image}
                                imageAlt={product.title}
                                price={product.price}
                                title={product.title}
                                description={product.description}
                                verticale={true}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-3 text-gray-600 max-w-md mx-auto px-12 pb-16 pt-6 text-center">
                    Nous n’avons pas trouvé d’articles correspondant à ce
                    produit pour le moment. N’hésitez pas à explorer notre
                    <span
                        className="bold cursor-pointer ml-1 underline"
                        onClick={() => navigate(-1)}
                    >
                        catalogue complet
                    </span>
                    .
                </p>
            )}
        </div>
    );
}
