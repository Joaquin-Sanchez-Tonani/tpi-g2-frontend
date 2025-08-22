import { Outlet, Link } from "react-router-dom"

import './styles/header.css'
import './styles/footer.css'

const Layout = () =>{
    return(
        <div className="content">
            <header>
                <nav>
                    <div className="nav-logo">
                        <i className="fi fi-ss-asterik"></i>
                        <h1>Clínica TPI</h1>
                    </div>
                    <ul>
                        <li>
                            <Link className="nav-link" to="">Inicio</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="about_us">Especialistas</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="contact_us">Contáctanos</Link>
                        </li>
                    </ul>
                    <div className="nav-login">
                        <i className="fi fi-rs-private-account"></i>
                    </div>
                </nav>
            </header>
            <Outlet />  {/* Render child pages */}
            <footer>
                <div className="lines"></div>
                <section>
                    <article>
                        <h4>Clinica TPI</h4>
                        <nav>
                            <ul className="nav-ul">
                                <li><Link className="nav-redirection" to="">Inicio</Link></li>
                                <li><Link className="nav-redirection" to="about_us">Especialistas</Link></li>
                                <li><Link className="nav-redirection" to="contact_us">Contáctanos</Link></li>
                            </ul>
                        </nav>
                    </article>
                    <article>
                        <h4>Seguinos</h4>
                        <nav>
                            <ul className="nav-ul">
                                <li><a className="nav-redirection" target="_blank" href="https://www.youtube.com"><i class="fi fi-brands-youtube"></i></a></li>
                                <li><a className="nav-redirection" target="_blank" href="https://www.instagram.com"><i class="fi fi-brands-instagram"></i></a></li>
                                <li><a className="nav-redirection" target="_blank" href="https://www.x.com"><i class="fi fi-brands-twitter-alt"></i></a></li>
                            </ul>
                        </nav>
                    </article>
                </section>
                <div>
                    <div className="lines"></div>
                    <div className="polities">
                        <p>© {new Date().getFullYear()} Clinica TPI. Todos los derechos reservados.</p>
                        <p>Política de Privacidad. || Términos y Condiciones</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout