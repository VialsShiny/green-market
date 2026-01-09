import {LuArrowRight} from 'react-icons/lu';

export default function ProductCard({
    id = '0',
    imageSrc = '...',
    imageAlt = 'Produit',
    title = 'Produit 1',
    price = 'E',
    description = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et',
    promotion = false,
    maxTitleLength = 25,
    maxDescriptionLength = 34,
    buttonText = 'Voir plus',
}) {
    const truncatedTitle =
        title.length > maxTitleLength
            ? title.slice(0, maxTitleLength) + '..'
            : title;

    const truncatedDescription =
        description.length > maxDescriptionLength
            ? description.slice(0, maxDescriptionLength) + '...'
            : description;

    return (
        <div className="product-card flex gap-6 w-full max-w-[350px]">
            <div className="image__holder relative size-40 w-1/2 bg-white rounded-r-[12px] outline-2 outline-[#B3E479]">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-full object-contain"
                />

                <div className="promotion-rectangle flex items-center absolute top-0 left-0 h-full w-6 bg-[#B3E479] px-1">
                    {promotion && (
                        <p className="-rotate-90 text-[12px] tracking-[8px] absolute left-0 top-4/5 w-6">
                            PROMOTION
                        </p>
                    )}
                </div>

                <div className="price__holder absolute right-2 bottom-2 px-3 py-1 bg-[#212529] rounded-full text-[#F8F9FA]">
                    <em>{price}€</em>
                </div>
            </div>

            <div className="info flex flex-col justify-evenly text-[#212529] w-1/2">
                <div className="text__wrap">
                    <strong
                        className="font-normale text-[20px] block overflow-hidden"
                        title={title}
                    >
                        {truncatedTitle}
                    </strong>

                    <p className="product-description text-[14px]">
                        {truncatedDescription}
                    </p>
                </div>

                <a
                    href={`/products/${id}`}
                    className="bg-[#B3E479] w-fit flex items-center rounded-[16px] p-2 text-[16px] gap-x-2 drop-shadow-md"
                >
                    {buttonText}
                    <LuArrowRight className="size-6" />
                </a>
            </div>
        </div>
    );
}
