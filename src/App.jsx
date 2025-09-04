import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routers from '@/Routers/router';
import { Suspense } from 'react';
import { SideBarProvider } from '@/contexts/SideBarProvider';
import Sidebar from '@components/Sidebar/Sidebar';
import { ToastProvider } from '@/contexts/ToastProvider';
function App() {
    return (
        <ToastProvider>
            <SideBarProvider>
                <Sidebar />
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            {routers.map((item, index) => (
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={<item.component />}
                                />
                            ))}
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </SideBarProvider>
        </ToastProvider>
    );
}

export default App;
