import {LuArrowLeft} from 'react-icons/lu';
import {useNavigate} from 'react-router-dom';

export default function ProductDetailCard({
    id = '0',
    imageSrc = '...',
    imageAlt = 'Produit',
    title = 'Produit 1',
    price = '0',
    category = 'catégorie',
    description = 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    promotion = false,
}) {
    const navigate = useNavigate();

    return (
        <>
            <figure className="relative w-full lg:w-1/2 bg-[#F8F9FA] rounded-[12px] p-6 flex items-center justify-center outline-1 outline-[#B3E479]">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    loading="lazy"
                    decoding="async"
                    fetchpriority="high"
                    width="400"
                    height="400"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="max-h-[400px] w-full object-contain"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder-product.png';
                    }}
                />

                {promotion && (
                    <span className="absolute top-4 left-4 bg-[#B3E479] text-[#212529] px-3 py-1 rounded-full text-sm font-semibold">
                        Promotion
                    </span>
                )}

                <figcaption className="absolute bottom-4 right-4 bg-[#212529] text-[#F8F9FA] px-4 py-2 rounded-full text-lg font-semibold">
                    {price} €
                </figcaption>
            </figure>

            <div className="w-full lg:w-1/2 flex flex-col gap-6 text-[#212529]">
                <header>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="uppercase bg-[#B3E479] w-fit px-2 py-1 rounded-sm text-sm tracking-widest text-[#212529] font-semibold">
                            {category}
                        </span>
                    </div>

                    <h1
                        id="product-title"
                        className="text-[2.5rem] font-bold leading-tight"
                    >
                        {title}
                    </h1>
                </header>

                <section aria-labelledby={`desc-${id}`}>
                    <h2 id={`desc-${id}`} className="sr-only">
                        Description du produit
                    </h2>
                    <p className="text-[16px] leading-relaxed">{description}</p>
                </section>

                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className="flex items-center gap-2 text-[#212529] underline focus:outline focus:outline-2 focus:outline-[#DB4D72]"
                    >
                        <LuArrowLeft />
                        Retour aux produits
                    </button>
                </div>
            </div>
        </>
    );
}
