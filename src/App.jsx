import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PageNotFound from './layout/PageNotFound';
import Layout from './layout/Layout';
import Login from './pages/Login';
import ScrollToTop from './components/ScrollToTop';
import { Specialists } from './pages/Specialists';
import Register from "./pages/Register"

function App() {

  return (
    <BrowserRouter>
        <ScrollToTop />
        <Routes>
            <Route  path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="/specialists" element={<Specialists/>}/>
                <Route path="/*" element={<PageNotFound />}/>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
