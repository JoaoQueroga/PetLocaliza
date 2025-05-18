import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Timeline from './views/Timeline';
import ViewPost from './views/ViewPost';

import Navbar from './components/Navbar';

export default function Rotas() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route
                    path="/"
                    element={<Timeline/>}
                />,
                <Route
                    path="/post"
                    element={<ViewPost/>}
                />,
                <Route path='*' element={<div><h1>404</h1></div>} />
            </Routes>
        </BrowserRouter>
    )
}