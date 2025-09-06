import { useRef, useState } from "react";
import { FormGroup, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/styles/login.css"
import imagenLogin from "../assets/imagenLogin.jpg";
   import alertify from 'alertifyjs';
    import 'alertifyjs/build/css/alertify.css';
    import 'alertifyjs/build/css/themes/default.min.css'; // Or another theme like bootstrap.min.css

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


    if(!email){
      emailRef.current.focus(); 
      alertify.error('Debes ingresar un email')
      return;
    }

    if(!EMAILREGEX.test(email)){
      emailRef.current.focus(); 
      alertify.error('El email ingresado es invalido')

      return;
    }
    if (!password.length || password.length < 8) {
      alertify.error('Contraseña incorrecta')
      passwordRef.current.focus(); // ubica el cursor en la linea de password para que el usuario vuelva a escribir
      return;
    }

    
    setEmail("");
    setPassword("");
    navTurno("/");
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
              <h2>Registrate</h2>
            </Row>
            <Form onSubmit={handleLogin}>
              <FormGroup className="box-input-container" noValidate >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="box-input"
                  type="text"
              
                  ref={emailRef}
                  placeholder="Ingrese su email"
                  onChange={handleEmail}
                  value={email}
                />

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
              </FormGroup>

                <FormGroup className="box-input-container">
                <Form.Label>repeat the password</Form.Label>
                <Form.Control
                  className="box-input"
                  type="password"
              
                  ref={passwordRef}
                  placeholder="Contraseña"
                  onChange={handlePassword}
                  value={password}
                />
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
