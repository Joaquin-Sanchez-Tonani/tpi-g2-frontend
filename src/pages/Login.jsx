import { useRef, useState } from "react";
import { FormGroup, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/styles/login.css"
import imagenLogin from "../assets/imagenLogin.jpg";
   import alertify from 'alertifyjs';
    import 'alertifyjs/build/css/alertify.css';
    import 'alertifyjs/build/css/themes/default.min.css'; // Or another theme like bootstrap.min.css

const Login = () => {
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const EMAILREGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

=======
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(initialErrors);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
>>>>>>> 360b2f2b21ee08b84708d1773369e7769351426b

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

<<<<<<< HEAD

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
              <h2>Inicie Sesión</h2>
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

            <button onClick={() => navTurno("/register")}>No tienes cuenta? registrete aqui</button>      
          </Card.Body>

        </Card>
      </div>
    </div>
  );
=======
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

        const OPTIONS = {
            method: "POST",
            body: JSON.stringify({ 
                email: email,
                password: password
            })
        }
        
        fetch('http://localhost:3000/auth/login', OPTIONS)
            .then(data => JSON(data))
            .then(result => () => {
                
            })


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
>>>>>>> 360b2f2b21ee08b84708d1773369e7769351426b
};

export default Login;
