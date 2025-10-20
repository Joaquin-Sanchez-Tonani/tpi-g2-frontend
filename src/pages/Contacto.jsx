import { Container, Row, Col } from "react-bootstrap";
import ContactForm from "../components/contactForm.jsx";
import "./styles/contact.css"
import { useLanguage } from "../components/context/LanguageContext.jsx";
const Contacto = () => {
      const { t } = useLanguage();
  return (
    <Container className="container-formContact">
      <Row className="title-contact">
        <Col>
          <h2 className="fw-bold text-primary">{t("contact_us")||"Contáctanos"}</h2>
          <p className="text-muted">
            {t("form_complete")||"Completa el formulario y nuestro equipo se comunicará con vos lo antes posible."}
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
