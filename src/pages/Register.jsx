import { useRef, useState } from "react";
import { FormGroup, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/styles/login.css"
import imagenLogin from "../assets/imagenLogin.jpg";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.min.css'; // Or another theme like bootstrap.min.css

const Register = () => {
    const [email, setEmail] = useState("");
    const [name,setName] = useState("")
    const [lastName,setLastName] = useState("")
    const [password, setPassword] = useState("");
    const [rPassword, setRPassword] = useState("");


    const EMAILREGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


    const navTurno = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleLastName = (event) => {
        setLastName(event.target.value)
    }

    const handlePassword = () => {
        setPassword(event.target.value);
    };

    const handleRPassword = (event) => {
        setRPassword(event.target.value);
    };

    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const lastNameRef = useRef(null);
    const passwordRef = useRef(null);
    const rPasswordRef = useRef(null);

    const handleLogin = (event) => {
        event.preventDefault();


        if (!email) {
            emailRef.current.focus();
            alertify.error('Debes ingresar un email')
            return;
        }

        if (!EMAILREGEX.test(email)) {
            emailRef.current.focus();
            alertify.error('El email ingresado es invalido')

            return;
        }

        if (!name){
            alertify.error('Ingresar nombre')
            nameRef.current.focus()
            return;
        }

        if (!lastName){
            alertify.error('Ingresar apellido')
            lastNameRef.current.focus()
            return;
        }

        if (!password.length || password.length < 8) {
            alertify.error('Contraseña incorrecta')
            passwordRef.current.focus(); // ubica el cursor en la linea de password para que el usuario vuelva a escribir
            return;
        }

        if (rPassword != password) {
            alertify.error('Contraseña distinta')
            passwordRef.current.focus(); // ubica el cursor en la linea de password para que el usuario vuelva a escribir
            return;
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
