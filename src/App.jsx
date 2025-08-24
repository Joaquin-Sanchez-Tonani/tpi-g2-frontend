import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PageNotFound from './layout/PageNotFound';
import Layout from './layout/Layout';
import { Specialists } from './pages/Specialists';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route  path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="/specialists" element={<Specialists/>}/>
                <Route path="/*" element={<PageNotFound />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
