export default function Footer() {
    return (
        <footer className="bg-[#DB6B4D] text-[#FBECE9] px-6">
            <div className="footer-content py-6">
                <strong className="footer-title text-[4.2rem]">
                    Green Market
                </strong>
                <p className="pb-3">Produits responsables & locaux</p>

                <div className="footer-columns flex justify-between">
                    <div className="footer-column w-1/2 flex flex-col gap-y-2">
                        <p>Title</p>
                        <ul className="flex flex-col gap-y-1">
                            <li>
                                <a href="/" className="underline">
                                    Accueil
                                </a>
                            </li>
                            <li>
                                <a href="/products" className="underline">
                                    Produits
                                </a>
                            </li>
                            <li>
                                <a href="/mentions" className="underline">
                                    Mentions légales
                                </a>
                            </li>
                        </ul>
                    </div>
                    <address className="not-italic footer-column w-1/2 flex flex-col gap-y-2">
                        <div>Green Market</div>
                        <p className="text-xs text-overflow">
                            contact@greenmarket.example
                        </p>
                        <p className="text-xs">+33 1 23 45 67 89</p>
                    </address>
                </div>
            </div>

            <hr />

            <div className="footer-bottom text-xs flex flex-wrap justify-center gap-x-6 py-6">
                <em>© 2023 GreenMarket</em>
                <a href="...">Politique de Confidentialité</a>
                <a href="...">Mentions Légale</a>
                <a href="...">Cookies</a>
            </div>
        </footer>
    );
}
