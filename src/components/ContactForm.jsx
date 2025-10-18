import React, { useState } from "react";
import "./styles/contactForm.css";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";

import {
  validateName,
  validateEmail,
  validateSubject,
  validateMessage,
} from "./contactForm"; // tu archivo contactForm.js

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // 🟡 Configuramos posición de alertify (arriba a la derecha)
  alertify.set("notifier", "position", "top-right");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación dinámica mientras escribe
    if (name === "name") {
      const filtered = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      setForm((prev) => ({ ...prev, name: filtered }));
      setErrors((prev) => ({ ...prev, name: validateName(filtered) }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "subject")
      setErrors((prev) => ({ ...prev, subject: validateSubject(value) }));
    if (name === "message")
      setErrors((prev) => ({ ...prev, message: validateMessage(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      subject: validateSubject(form.subject),
      message: validateMessage(form.message),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) {
      // Enfocar el primer campo con error
      const firstErrorField = Object.keys(newErrors).find((k) => newErrors[k]);
      if (firstErrorField) {
        document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      }

      alertify.error("Por favor corrige los errores antes de enviar.");
      return;
    }

    // Enviar formulario (simulado)
    alertify.success("Formulario enviado correctamente");

    // Limpiar
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            name="name"
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Ingresa tu nombre"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="ejemplo@gmail.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Asunto</label>
          <input
            name="subject"
            type="text"
            className={`form-control ${errors.subject ? "is-invalid" : ""}`}
            placeholder="Escribe el asunto"
            value={form.subject}
            onChange={handleChange}
          />
          {errors.subject && (
            <div className="invalid-feedback">{errors.subject}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea
            name="message"
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            placeholder="Escribe tu mensaje aquí..."
            rows={4}
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && (
            <div className="invalid-feedback">{errors.message}</div>
          )}
        </div>

        <div className="d-grid">
          <button type="submit" className="buttonSubmit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
