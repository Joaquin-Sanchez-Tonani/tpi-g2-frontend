import { useRef, useState } from "react";
import { FormGroup, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/styles/login.css";
import imagenLogin from "../assets/imagenLogin.jpg";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css"; // Or another theme like bootstrap.min.css

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const EMAILREGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  const navTurno = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = () => {
    setPassword(event.target.value);
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email) {
      emailRef.current.focus();
      alertify.error("Debes ingresar un email");
      return;
    }

    if (!EMAILREGEX.test(email)) {
      emailRef.current.focus();
      alertify.error("El email ingresado es invalido");

      return;
    }
    if (!password.length || password.length < 7) {
      alertify.error("Contraseña incorrecta");
      passwordRef.current.focus(); // ubica el cursor en la linea de password para que el usuario vuelva a escribir
      return;
    }

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {!data.ok ? alertify.error(data.message) : alertify.success(data.message); return data;})
      .then((result) => {
        localStorage.setItem("token",result.token);
        localStorage.setItem("user_id", result.user.id);
        localStorage.setItem("user_name", result.user.name);
        localStorage.setItem("user_lastName", result.user.lastName);
        localStorage.setItem("user_email", result.user.email);
        result.ok && navTurno("/");})
      .catch((error) => console.error("Error:", error))
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
              <Button className="toRegister" onClick={() => navTurno("/")}><i className="fi fi-tr-insert-alt"></i></Button>
              <h2>Inicie Sesión</h2> 
            </Row>
            <Form onSubmit={handleLogin}>
              <FormGroup className="box-input-container" noValidate>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="box-input"
                  type="text"
                  ref={emailRef}
                  placeholder="Ingrese su email"
                  onChange={handleEmail}
                  value={email}
                />
                {/* {errors.emailEmpty && } */}
                {/* {errors.email && <p class="alert alert-warning" role="alert">El email ingresado es invalido</p>} */}
              </FormGroup>
              <FormGroup className="box-input-container">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="box-input"
                  type="password"
                  ref={passwordRef}
                  placeholder="Contraseña"
                  onChange={handlePassword}
                  value={password}
                />
                {/* {errors.password && (
                  // <p class="alert alert-warning" role="alert">
                  //   La contraseña es obligatoria y debe contener al menos 8
                  //   caracteres
                  // </p>
                )} */}
              </FormGroup>
              <Button className="boton-submit" type="submit">
                Iniciar sesión
              </Button>
            </Form>

            <Button className="toRegister" onClick={() => navTurno("/register")}>
              <i className="fi fi-rr-arrow-small-right"></i>No tienes cuenta? registrete aqui
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
