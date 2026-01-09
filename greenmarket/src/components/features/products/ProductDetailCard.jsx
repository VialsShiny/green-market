import {LuArrowLeft} from 'react-icons/lu';

export default function ProductDetail({
    id = '0',
    imageSrc = '...',
    imageAlt = 'Produit',
    title = 'Produit 1',
    price = '0',
    category = 'catégorie',
    description = 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    promotion = false,
}) {
    return (
        <section className="product-detail px-6 pt-32 pb-12">
            <div className="max-w-5xl mx-auto rounded-[16px] p-8 flex flex-col lg:flex-row gap-6">
                <div className="relative w-full lg:w-1/2 bg-[#F8F9FA] rounded-[12px] p-6 flex items-center justify-center outline-1 outline-[#B3E479]">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="max-h-[400px] object-contain"
                    />

                    {promotion && (
                        <span className="absolute top-4 left-4 bg-[#B3E479] text-[#212529] px-3 py-1 rounded-full text-sm font-semibold">
                            Promotion
                        </span>
                    )}

                    <span className="absolute bottom-4 right-4 bg-[#212529] text-[#F8F9FA] px-4 py-2 rounded-full text-lg font-semibold">
                        {price} €
                    </span>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col gap-6 text-[#212529]">
                    <div className="flex flex-col gap-2">
                        <div className="uppercase bg-[#B3E479] w-fit px-2 py-1 rounded-sm text-sm tracking-widest text-[#212529] font-semibold">
                            <p>{category}</p>
                        </div>

                        <h1 className="text-[2.5rem]">{title}</h1>
                    </div>

                    <p className="text-[16px] leading-relaxed">{description}</p>

                    <div className="flex items-center gap-4 pt-4">
                        <a
                            href="/products"
                            className="flex items-center gap-2 text-[#212529] underline"
                        >
                            <LuArrowLeft />
                            Retour aux produits
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
