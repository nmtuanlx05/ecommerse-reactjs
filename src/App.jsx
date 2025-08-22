import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routers from '@/Routers/router';
import { Suspense } from 'react';
function App() {
    return (
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
    );
}

export default App;
