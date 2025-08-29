import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PageNotFound from './layout/PageNotFound';
import Layout from './layout/Layout';
import Login from './components/auth/login/Login';
import ScrollToTop from './components/ScrollToTop';
import { Specialists } from './pages/Specialists';

function App() {

  return (
    <BrowserRouter>
        <ScrollToTop />
        <Routes>
            <Route  path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="/specialists" element={<Specialists/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<PageNotFound />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
