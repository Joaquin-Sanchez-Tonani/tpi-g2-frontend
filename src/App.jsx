import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PageNotFound from './layout/PageNotFound';
import Layout from './layout/Layout';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route  path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="/*" element={<PageNotFound />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
