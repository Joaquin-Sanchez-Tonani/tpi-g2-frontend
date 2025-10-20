import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import '../styles/administration.css'
import { useEffect, useState } from "react";
import Forbidden from "../../layout/Forbidden";

export default function Administration() {
    const { t } = useLanguage();
    const [isAdmin, setIsAdmin] = useState(null);
    const [active,setActive] = useState(null)
    const token = localStorage.getItem("token");
    const navAdmin = useNavigate()    

    const OPTIONS = (method, body) => {
        return {
            method: `${method}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        }
    }
    useEffect(() =>{
        fetch("http://localhost:3000/auth/isAdmin", OPTIONS("GET"))
        .then(res => res.json())
        .then(data => setIsAdmin(data.ok))
        .catch(() => setIsAdmin(false));
    },[]
    )
    
    if (isAdmin === null) {
        return <h2>Loading...</h2>;
    }

    if (!isAdmin) {
        return <Forbidden />;
    }

    const handleActive = (event) =>{
        const id = event.target.id
        setActive(id)
    }

    return (
        <main className="administration-main">
            <header className="administration-header">
                <nav>
                    <ul>
                        <Link to="users"><li id="1" onClick={handleActive} className={active == "1" ? "administration-li active" : "administration-li"}>{t("user_panel")||"Usuarios"}</li></Link>
                        <Link to="specialties"><li id="2" onClick={handleActive} className={active == "2" ? "administration-li active" : "administration-li"}>{t("specialities_panel")||"Especialidades"}</li></Link>
                    </ul>
                </nav>
            </header>
            <section className="administration-section">
                <aside><h2>{t("admin_panel") || "Panel de Administracion"}</h2> <button className="toHome" onClick={() => navAdmin("/")}><i className="fi fi-tr-insert-alt"></i></button></aside>
                <Outlet />
            </section>
        </main>
    )
}
