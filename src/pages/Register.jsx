import { useRef, useState } from "react";
import { FormGroup, Form, Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/styles/login.css";
import imagenLogin from "../assets/imagenLogin.jpg";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";


const Register = () => {
    const [email, setEmail] = useState("");
    const [name,setName] = useState("")
    const [lastName,setLastName] = useState("")
    const [password, setPassword] = useState("");
    const [rPassword, setRPassword] = useState("");


    const EMAILREGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

import {
  validateEmail,
  validateName,
  validateLastName,
  validatePassword,
  validateRepeatPassword,
} from "../components/contactForm";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

  const navTurno = useNavigate();

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const rPasswordRef = useRef(null);

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRPassword = (e) => setRPassword(e.target.value);

  const handleRegister = (e) => {
    e.preventDefault();


    const emailError = validateEmail(email);
    if (emailError) {
      alertify.error(emailError);
      emailRef.current.focus();
      return;
    }

    const nameError = validateName(name);
    if (nameError) {
      alertify.error(nameError);
      nameRef.current.focus();
      return;
    }

    const lastNameError = validateLastName(lastName);
    if (lastNameError) {
      alertify.error(lastNameError);
      lastNameRef.current.focus();
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      alertify.error(passwordError);
      passwordRef.current.focus();
      return;
    }

        if (!password.length || password.length < 7) {
            alertify.error('Contraseña incorrecta')
            passwordRef.current.focus(); // ubica el cursor en la linea de password para que el usuario vuelva a escribir
            return;
        }

    fetch("http://localhost:3000/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        lastName,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        !data.ok ? alertify.error(data.message) : alertify.success(data.message);
        return data;
      })
      .then((result) => {
        if (result.ok) {
          localStorage.clear();
          navTurno("/");
        }

        fetch("http://localhost:3000/auth/register", {
            method: "POST",
            body: JSON.stringify({ email: email, name: name, lastName: lastName, password: password }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => { !data.ok ? alertify.error(data.message) : alertify.success(data.message); return data; })
            .then((result) => result.ok && navTurno("/"))
            .catch((error) => console.error("Error:", error))
        setRPassword("");
        setEmail("");
        setPassword("");
        localStorage.clear()

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
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    className="box-input"
                                    type="text"
                                    ref={nameRef}
                                    placeholder="Nombre"
                                    onChange={handleName}
                                    value={name}
                                />
                            </FormGroup>

                            <FormGroup className="box-input-container">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    className="box-input"
                                    type="text"
                                    ref={lastNameRef}
                                    placeholder="Apellido"
                                    onChange={handleLastName}
                                    value={lastName}
                                />
                            </FormGroup>

                            <FormGroup className="box-input-container">
                                <Form.Label>Contraseña</Form.Label>
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
                                <Form.Label>Repetir contraseña</Form.Label>
                                <Form.Control
                                    className="box-input"
                                    type="password"
                                    ref={rPasswordRef}
                                    placeholder="Contraseña"
                                    onChange={handleRPassword}
                                    value={rPassword}
                                />
                            </FormGroup>
                            <Button className="boton-submit" type="submit">
                                Iniciar sesión
                            </Button>
                            <Button className="toRegister" onClick={() => navTurno("/login")}>
                                <i className="fi fi-rr-arrow-small-right"></i>Iniciar sesión
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Register;
