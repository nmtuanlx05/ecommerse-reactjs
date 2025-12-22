import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routers from '@/Routers/router';
import { Suspense } from 'react';
import { SideBarProvider } from '@/contexts/SideBarProvider';
import Sidebar from '@components/Sidebar/Sidebar';
import { ToastProvider } from '@/contexts/ToastProvider';
import { StoreProvider } from '@/contexts/StoreProvider';

// Ham render router
const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        const Component = route.component;

        // Nếu có children dùng cú pháp lồng nhau
        if (route.children && route.children.length > 0) {
            return (
                <Route key={index} path={route.path} element={<Component />}>
                    {/* Gọi đệ quy để render các con bên trong */}
                    {renderRoutes(route.children)}
                </Route>
            );
        }

        // Nếu là route thường (không có con)
        return <Route key={index} path={route.path} element={<Component />} />;
    });
};

function App() {
    return (
        <StoreProvider>
            <ToastProvider>
                <SideBarProvider>
                    <BrowserRouter>
                        <Sidebar />
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>{renderRoutes(routers)}</Routes>
                        </Suspense>
                    </BrowserRouter>
                </SideBarProvider>
            </ToastProvider>
        </StoreProvider>
    );
}

export default App;
