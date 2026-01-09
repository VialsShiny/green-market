import {IoArrowDown} from 'react-icons/io5';
export default function Home() {
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
        </>
    );
}
