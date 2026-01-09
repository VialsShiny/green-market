import {useEffect, useState} from 'react';
import {LuSearch, LuSettings2} from 'react-icons/lu';
import ProductCard from '../components/features/products/ProductCard';
import {fetchData} from '../components/services/Fetch';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData('https://fakestoreapi.com/products')
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => console.error('Erreur API:', err));
    }, []);

    // Système de recherche
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="products-list min-h-screen px-6 h-fit pt-36 pb-12">
            <form
                className="flex justify-between w-full pb-6"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="bg-[#212529] flex items-center gap-x-3 rounded-[6px] px-4 py-2 text-[#F8F9FA]">
                    <label htmlFor="search-product">
                        <LuSearch />
                    </label>
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

                <div className="filter flex items-center relative bg-[#212529] rounded-[6px] px-4 py-2 text-[#F8F9FA]">
                    <LuSettings2 />
                </div>
            </form>

            <div className="flex flex-col gap-y-12 pb-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            imageSrc={product.image}
                            imageAlt={product.title}
                            price={product.price}
                            title={product.title}
                            description={product.description}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        Aucun produit trouvé
                    </p>
                )}
            </div>
        </section>
    );
}
