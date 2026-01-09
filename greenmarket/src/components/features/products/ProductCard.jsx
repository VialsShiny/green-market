import {LuArrowRight} from 'react-icons/lu';

export default function ProductCard({
    imageSrc = '...',
    imageAlt = 'Produit',
    title = 'Produit 1',
    description = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et',
    promotion = true,
    maxDescriptionLength = 50,
    buttonText = 'Voir plus',
}) {
    const truncatedDescription =
        description.length > maxDescriptionLength
            ? description.slice(0, maxDescriptionLength) + '...'
            : description;

    return (
        <div className="product-card flex gap-6 w-full max-w-[350px]">
            <div className="image__holder relative size-40 w-1/2 bg-white rounded-r-[12px] outline-2 outline-[#B3E479] ">
                <img src={imageSrc} alt={imageAlt} className="w-full h-full" />
                <div className="promotion-rectangle flex items-center absolute top-0 left-0 h-full w-6 bg-[#B3E479] px-1">
                    {promotion && (
                        <p className="-rotate-90 text-[12px] tracking-[8px] absolute left-0 top-4/5 w-6">
                            PROMOTION
                        </p>
                    )}
                </div>
            </div>
            <div className="info flex flex-col justify-evenly h-auto text-[#212529] w-1/2">
                <div className="text__wrap">
                    <strong className="font-normale text-[20px]">
                        {title}
                    </strong>
                    <p className="product-description text-[14px]">
                        {truncatedDescription}
                    </p>
                </div>
                <button className="bg-[#B3E479] flex items-center rounded-[16px] p-2 text-[20px] gap-x-2">
                    {buttonText}
                    <LuArrowRight className="size-6" />
                </button>
            </div>
        </div>
    );
}
