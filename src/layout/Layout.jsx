import { Outlet, Link } from "react-router-dom";
import { isLogin } from "../services/isLogin";
import "./styles/header.css";
import "./styles/footer.css";
import { useEffect, useState } from "react";
import { useLanguage } from "../components/context/LanguageContext";

const Layout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const { language, onToggleLanguage, t } = useLanguage();

  async function isLoginFunction() {
    const loginRes = await isLogin();
    setIsLogged(loginRes.ok);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    isLoginFunction();
    fetch("http://localhost:3000/auth/isAdmin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setIsAdmin(true);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

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
                <Link className="nav-link" to="">
                  {t("home") || "Inicio"}
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="specialists">
                  {t("specialists") || "Especialistas"}
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="appointment">
                  {t("appointments") || "Turnos"}
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="contact_us">
                  {t("contact_us") || "Contáctanos"}
                </Link>
              </li>
              {isAdmin ? (
                <li>
                  <Link
                    className="nav-link"
                    style={{ background: "green" }}
                    to="administration"
                  >
                    {t("admin_panel") || "Panel de administración"}
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="nav-login">
            {/* Botón de idioma */}
            <button
              onClick={onToggleLanguage}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                marginRight: "10px",
                fontSize: "16px",
              }}
            >
              {language === "es" ? "es" : "en"}
            </button>

            {!isLogged ? (
              <Link
                to="login"
                style={{ textDecoration: "none" }}
                variant="primary"
              >
                <i className="fi fi-rs-private-account"></i>
              </Link>
            ) : (
              <Link
                to="profile"
                style={{ textDecoration: "none" }}
                variant="primary"
              >
                <i className="fi fi-rs-circle-user"></i>
              </Link>
            )}
          </div>
        </nav>
      </header>

      <Outlet /> {/* Render child pages */}

      <iframe
        className="iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.482706109906!2d-60.65278552347954!3d-32.964664372800435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab0ae687b2bb%3A0x9db3738b459aa769!2sHospital%20Privado%20de%20Rosario%20(HPR)%20%7C%20Grupo%20Gamma!5e0!3m2!1ses!2sar!4v1755894521104!5m2!1ses!2sar"
        frameBorder={0}
      ></iframe>

      <footer>
        <div className="lines"></div>
        <section>
          <article>
            <h4>{t("sections") || "Secciones"}</h4>
            <nav>
              <ul className="nav-ul">
                <li>
                  <Link className="nav-redirection" to="">
                    {t("home") || "Inicio"}
                  </Link>
                </li>
                <li>
                  <Link className="nav-redirection" to="specialists">
                    {t("specialists") || "Especialistas"}
                  </Link>
                </li>
                <li>
                  <Link className="nav-redirection" to="appointment">
                    {t("appointments") || "Turnos"}
                  </Link>
                </li>
                <li>
                  <Link className="nav-redirection" to="contact_us">
                    {t("contact_us") || "Contáctanos"}
                  </Link>
                </li>
              </ul>
            </nav>
          </article>
          <article>
            <h4>{t("follow_us") || "Seguinos en nuestras redes"}</h4>
            <nav>
              <ul className="nav-ul">
                <li>
                  <a
                    className="nav-redirection"
                    target="_blank"
                    href="https://www.youtube.com"
                  >
                    <i className="fi fi-brands-youtube"></i> Youtube
                  </a>
                </li>
                <li>
                  <a
                    className="nav-redirection"
                    target="_blank"
                    href="https://www.instagram.com"
                  >
                    <i className="fi fi-brands-instagram"></i> Instagram
                  </a>
                </li>
                <li>
                  <a
                    className="nav-redirection"
                    target="_blank"
                    href="https://www.x.com"
                  >
                    <i className="fi fi-brands-twitter-alt"></i> X (ex twitter)
                  </a>
                </li>
              </ul>
            </nav>
          </article>
        </section>
        <div>
          <div className="lines"></div>
          <div className="polities">
            <p>
              © {new Date().getFullYear()} {t("clinic_name") || "Clinica TPI"}.
              {t("all_rights_reserved") || " Todos los derechos reservados."}
            </p>
            <p>
              {t("privacy_policy") || "Política de Privacidad"} ||{" "}
              {t("terms_conditions") || "Términos y Condiciones"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
