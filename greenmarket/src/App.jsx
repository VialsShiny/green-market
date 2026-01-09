import React, {Suspense} from 'react';
import {Outlet, Route, Routes} from 'react-router-dom';
import NavBar from './components/layout/Navbar';    
import _404 from './pages/errors/_404';

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
                    </>
                }
            >
                <Route index element={<Home />} />
            </Route>

            <Route path="*" element={<_404 />} />
        </Routes>
    );
}
