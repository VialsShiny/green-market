import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/Navbar';
import SuspenseLoader from '@/components/ui/SuspenseLoader';
import Auth from '@/pages/Auth';
import _404 from '@/pages/errors/_404';
import ProductDetails from '@/pages/ProductDetails';
import Products from '@/pages/Products';
import React, { Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import '../public/css/style.css';

const Home = React.lazy(() => import('./pages/Home'));

export default function App() {
    return (
        <Routes>
            <Route
                element={
                    <>
                        <NavBar />
                        <Suspense fallback={<SuspenseLoader />}>
                            <Outlet />
                        </Suspense>
                        <Footer />
                    </>
                }
            >
                <Route index element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
            </Route>

            <Route
                element={
                    <>
                        <NavBar />
                        <Suspense fallback={<SuspenseLoader />}>
                            <Outlet />
                        </Suspense>
                    </>
                }
            >
                <Route path="/login" element={<Auth action="login" />} />
                <Route path="/register" element={<Auth action="register" />} />
            </Route>

            <Route path="*" element={<_404 />} />
        </Routes>
    );
}
