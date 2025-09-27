import { Container, Row, Col } from "react-bootstrap";
import ContactForm from "../components/contactForm.jsx";
import "./styles/contact.css"

const Contacto = () => {
  return (
    <Container className="container-formContact">
      <Row className="title-contact">
        <Col>
          <h2 className="fw-bold text-primary">Contáctanos</h2>
          <p className="text-muted">
            Completa el formulario y nuestro equipo se comunicará con vos lo antes posible.
          </p>
        </Col>
      </Row>

      <Row className="contact-form">
        <Col >
          <ContactForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
