import {useEffect, useState} from 'react';
import {IoArrowDown} from 'react-icons/io5';
import ProductCard from '../components/features/products/ProductCard';
import {fetchData} from '../components/services/Fetch';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData('https://fakestoreapi.com/products')
            .then((data) => {
                // On prend uniquement les 4 premiers produits
                setProducts(data.slice(0, 4));
            })
            .catch((err) => console.error('Erreur API:', err));
    }, []);

    return (
        <>
            <section className="landing h-screen w-full flex items-center justify-center">
                <div className="text-wrapper flex flex-col gap-6 px-6 text-center">
                    <div className="flex flex-col gap-0">
                        <h1 className="text-[82px] text-[#DB4D72]">
                            Green Market
                        </h1>
                        <p className="description text-[19px] text-[#E47995]">
                            Lorem ipsum dolor sit amet consectetur adipiscing
                            elit Ut et massa mi..
                        </p>
                    </div>
                    <div className="see-more__wrap flex self-center items-center gap-x-3 text-[#DB4D72]">
                        <IoArrowDown className="size-8 bg-[#F8F9FA] rounded-[4px] outline-1 outline-[#DB4D72] hover:translate-y-1 transition-all duration-200 ease-out" />
                        <p className="text-xl">VOIR LES PRODUITS</p>
                    </div>
                </div>
            </section>

            <section className="our-products bg-[#90E99C] p-[24px]">
                <div className="w-full p-[12px] rounded-[12px] outline-2 outline-[#F8F9FA] bg-[#4DDB60]">
                    <h2 className="title text-[4rem] mb-6">Produits Phares</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                imageSrc={product.image}
                                imageAlt={product.title}
                                title={product.title}
                                description={product.description}
                                maxDescriptionLength={60} // tronque à 60 caractères
                                promotion={product.price > 50} // exemple : promotion si prix > 50
                                buttonText="Voir plus"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
