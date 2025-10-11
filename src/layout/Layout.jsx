import { Outlet, Link } from "react-router-dom"
import {isLogin} from "../services/isLogin"
import {isAdmin} from "../services/isAdmin"

import './styles/header.css'
import './styles/footer.css'
import {  useEffect, useState } from "react"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Login from "../pages/Login"
import {Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Layout = () => {
    const [Admin, setAdmin] = useState(false);
    const [log, setLog] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function apiCall(){
        try{
         
            Promise.all([ isAdmin(),isLogin()]).then((values) => {

                setAdmin(values[0].admin)
                setLog(values[1].ok)
                if(values[1].ok){
                localStorage.setItem("nombreUsuario", values[1].user.name);
                 localStorage.setItem('apellidoUsuario', values[1].user.lastName)
              }
            });

        }catch(e){ 
            console.log(e)
               
    }
    }
    
    useEffect(() => {
    apiCall();
    }, []);

    


        const navTurno = useNavigate();

        const cerrarSesion = () => {
            localStorage.removeItem('token')
            localStorage.removeItem('nombreUsuario')
            localStorage.removeItem('apellidoUsuario')
            setLog(false);
            navTurno("/login")
        }



    return (
        <div className="content">
            <header className="layout-header">
                <nav>
                    <div className="nav-logo">
                        <i className="fi fi-ss-asterik"></i>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <Link className="nav-link" to="">Inicio</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="specialists">Especialistas</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="appointment">Turnos</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="contact_us">Contáctanos</Link>
                            </li>
                            {Admin ? 
                            <li>
                                <Link className="nav-link" style={{background: "green"}} to="administration">Panel de administración</Link>
                            </li> : null
                            }
                        </ul>
                    </div>
                    <div className="nav-login">
                        
                        {!log ?
                            <Link to="Login" style={{ textDecoration: "none" }} variant="primary"> 
                                <i className="fi fi-rr-lock"></i>  
                            </Link> : 
                            <Link style={{ textDecoration: "none" }} variant="primary" onClick={handleShow}> 
                                <i className="fi fi-sr-user"></i>  
                            </Link>}

                            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                            <Offcanvas.Header closeButton>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <h3>sesion inicializada como:</h3>
                                <br />
                               
                                <Offcanvas.Title>{localStorage.getItem('nombreUsuario') + " " + localStorage.getItem('apellidoUsuario')}</Offcanvas.Title>
                                <hr />

                                <Button onClick={cerrarSesion}>cerrar sesion</Button>
                            </Offcanvas.Body>
                            
                         </Offcanvas>
                    

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
                                <li><Link className="nav-redirection" to="appointment">Turnos</Link></li>
                                <li><Link className="nav-redirection" to="contact_us">Contáctanos</Link></li>
                            </ul>
                        </nav>
                    </article>
                    <article>
                        <h4>Seguinos en nuestras redes</h4>
                        <nav>
                            <ul className="nav-ul">
                                <li><a className="nav-redirection" target="_blank" href="https://www.youtube.com"><i className="fi fi-brands-youtube"></i>Youtube</a></li>
                                <li><a className="nav-redirection" target="_blank" href="https://www.instagram.com"><i className="fi fi-brands-instagram"></i>Instagram</a></li>
                                <li><a className="nav-redirection" target="_blank" href="https://www.x.com"><i className="fi fi-brands-twitter-alt"></i>X (ex twitter)</a></li>
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