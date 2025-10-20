import { useRef, useState } from "react";
import { FormGroup, Form, Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../components/contactForm";
import "../pages/styles/login.css";
import imagenLogin from "../assets/imagenLogin.jpg";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import { useLanguage } from "../components/context/LanguageContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useLanguage();

  const navTurno = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      alertify.error(emailError);
      emailRef.current.focus();
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      alertify.error(passwordError);
      passwordRef.current.focus();
      return;
    }

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        !data.ok
          ? alertify.error(data.message)
          : alertify.success(data.message);
        return data;
      })
      .then((result) => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user_name", result.user.name);
        localStorage.setItem("user_lastName", result.user.lastName);
        localStorage.setItem("user_email", result.user.email);
        result.ok && navTurno("/");
      })
      .catch((error) => console.error("Error:", error));

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-card-layout">
      <div className="login-image-container">
        <img src={imagenLogin} alt="Login" />
      </div>
      <div className="login-card-container">
        <Card className="login-card">
          <Card.Body>
            <Row className="header-input-card">
              <Button className="toRegister" onClick={() => navTurno("/")}>
                <i className="fi fi-tr-insert-alt"></i>
              </Button>
              <h2>{t("login_title") || "Inicie Sesion"}</h2>
            </Row>
            <Form onSubmit={handleLogin}>
              <FormGroup className="box-input-container" noValidate>
                <Form.Label>{t("login_email_label") || "Email"}</Form.Label>
                <Form.Control
                  className="box-input"
                  type="text"
                  ref={emailRef}
                  placeholder={t("login_email_placeholder") || "Ingrese su email"}
                  onChange={handleEmail}
                  value={email}
                />
              </FormGroup>
              <FormGroup className="box-input-container">
                <Form.Label>{t("login_password_label") || "Contraseña"}</Form.Label>
                <Form.Control
                  className="box-input"
                  type="password"
                  ref={passwordRef}
                  placeholder={t("login_password_placeholder") || "Contraseña"}
                  onChange={handlePassword}
                  value={password}
                />
              </FormGroup>
              <Button className="boton-submit" type="submit">
                {t("login_button") || "Iniciar sesión"}
              </Button>
            </Form>

            <Button
              className="toRegister"
              onClick={() => navTurno("/register")}
            >
              <i className="fi fi-rr-arrow-small-right"></i>
              {t("login_no_account") || "No tienes cuenta?"}{" "}
              {t("login_register_here") || "Regístrate aquí"}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
