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
                            <Link className="nav-link" to="specialists">Especialistas</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="contact_us">Contáctanos</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="contact_us">Turnos</Link>
                        </li>
                    </ul>
                    <div className="nav-login">
                        <Link to="login" style={{ textDecoration: "none"}}> {/* linkea a login con la foto */}
                                <i className="fi fi-rs-private-account"></i>
                        </Link>
                    </div>
                </nav>
            </header>
            <Outlet />  {/* Render child pages */}
            <iframe className="iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.482706109906!2d-60.65278552347954!3d-32.964664372800435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab0ae687b2bb%3A0x9db3738b459aa769!2sHospital%20Privado%20de%20Rosario%20(HPR)%20%7C%20Grupo%20Gamma!5e0!3m2!1ses!2sar!4v1755894521104!5m2!1ses!2sar" frameBorder={0}></iframe>
            <footer>
                <div className="lines"></div>
                <section>
                    <article>
                        <h4>Secciones</h4>
                        <nav>
                            <ul className="nav-ul">
                                <li><Link className="nav-redirection" to="">Inicio</Link></li>
                                <li><Link className="nav-redirection" to="specialists">Especialistas</Link></li>
                                <li><Link className="nav-redirection" to="contact_us">Contáctanos</Link></li>
                            </ul>
                        </nav>
                    </article>
                    <article>
                        <h4>Seguinos</h4>
                        <nav>
                            <ul className="nav-ul">
                                <li><a className="nav-redirection" target="_blank" href="https://www.youtube.com"><i className="fi fi-brands-youtube"></i></a></li>
                                <li><a className="nav-redirection" target="_blank" href="https://www.instagram.com"><i className="fi fi-brands-instagram"></i></a></li>
                                <li><a className="nav-redirection" target="_blank" href="https://www.x.com"><i className="fi fi-brands-twitter-alt"></i></a></li>
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