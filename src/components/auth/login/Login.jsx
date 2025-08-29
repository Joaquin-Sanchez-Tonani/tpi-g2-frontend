import { useRef, useState } from "react";
import { FormGroup, Form, Button, Card, Row, Col } from "react-bootstrap";
import { initialErrors } from "./LoginData";
import { useNavigate } from "react-router-dom";
import "./login.css";
import imagenLogin from "../../../assets/imagenLogin.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initialErrors);

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

    if (!email.length) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true,
      }));
      emailRef.current.focus();
      return;
    }

    if (!password.length || password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: true,
      }));
      passwordRef.current.focus(); // ubica el cursor en la linea de password para que el usuario vuelva a escribir
      return;
    }

    setErrors(initialErrors);
    setEmail("");
    setPassword("");
    navTurno("/specialists");
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
              <h2>Inicie Sesión</h2>
            </Row>
            <Form onSubmit={handleLogin}>
              <FormGroup className="box-input-container">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="box-input"
                  type="email"
                  required
                  ref={emailRef}
                  placeholder="Ingrese su email"
                  onChange={handleEmail}
                  value={email}
                />
                {errors.email && <p>El email es un campo obligatorio</p>}
              </FormGroup>
              <FormGroup className="box-input-container">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="box-input"
                  type="password"
                  required
                  ref={passwordRef}
                  placeholder="Contraseña"
                  onChange={handlePassword}
                  value={password}
                />
                {errors.password && (
                  <p>
                    La contraseña es obligatoria y debe contener al menos 8
                    caracteres
                  </p>
                )}
              </FormGroup>
              <Button className="boton-submit" type="submit">
                Iniciar sesión
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
