import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "./styles/contactForm.css"
const ContactForm = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto:"",
        mensaje: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        alert("¡Gracias por contactarnos! Te responderemos pronto.");
        setFormData({ nombre: "", email: "", mensaje: "" });
    };

    return (
        <Card className="shadow border-0 rounded-4">
            <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNombre" className="mb-3">
                        <Form.Label className="fw-semibold">Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa tu nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label className="fw-semibold">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="ejemplo@correo.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAsunto" className="mb-4">
                        <Form.Label className="fw-semibold">asunto</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength={20}
                            rows={4}
                            placeholder="Sobre que nos quiere hablar?"
                            name="asunto"
                            value={formData.asunto}
                            onChange={handleChange}
                            required
                            className="input" 
                        />
                    </Form.Group>
                    <Form.Group controlId="formMensaje" className="mb-4">
                        <Form.Label className="fw-semibold">Mensaje</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Escribe tu mensaje aquí..."
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <div className="d-grid">
                        <Button variant="primary" type="submit" className="rounded-3 fw-semibold">
                            Enviar
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ContactForm;
