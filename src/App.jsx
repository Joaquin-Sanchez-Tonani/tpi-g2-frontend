import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PageNotFound from './layout/PageNotFound';
import Layout from './layout/Layout';
import Login from './pages/Login';
import ScrollToTop from './components/ScrollToTop';
import { Specialists } from './pages/Specialists';
import Contacto from './pages/Contacto';
import Register from "./pages/Register"
import Appointment from "./pages/Appointment"
import Guard from './components/auth/Guard';
import Administration from './components/admin_panel/Administration';
import Users from './components/admin_panel/Users';
import { Welcome } from './components/admin_panel/welcome';
import { Specialties } from './components/admin_panel/Specialties';
import Profile from './pages/Profile';


function App() {

  return (
    <BrowserRouter>
  <ScrollToTop />
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/specialists" element={<Specialists />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/contact_us" element={<Contacto />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/*" element={<PageNotFound />} />
    </Route>

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/administration"
      element={
        <Guard>
          <Administration />
        </Guard>
      }
    >
      <Route index element={<Welcome />} />
      <Route path="users" element={<Users />} />
      <Route path="specialties" element={<Specialties />} />
    </Route>
  </Routes>
</BrowserRouter>
  )
}

export default App
