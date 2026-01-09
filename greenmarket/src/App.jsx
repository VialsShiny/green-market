import React, {Suspense} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';
import '../public/css/style.css';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/Navbar';
import _404 from './pages/errors/_404';
import Products from './pages/Products';

const Home = React.lazy(() => import('./pages/Home'));

export default function App() {
    return (
        <Routes>
            <Route
                element={
                    <>
                        <NavBar />
                        <Suspense fallback={<div>Chargement...</div>}>
                            <Outlet />
                        </Suspense>
                        <Footer />
                    </>
                }
            >
                <Route index element={<Home />} />
                <Route path="/products" element={<Products />} />
            </Route>

            <Route path="*" element={<_404 />} />
        </Routes>
    );
}
