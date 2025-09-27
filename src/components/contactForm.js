//name
export const validateName = (name) => {
  if (!name.trim()) return "El nombre es obligatorio";
  if (name.length < 3) return "El nombre debe tener al menos 3 letras";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) return "El nombre solo puede tener letras";
  return "";
};

// Email
export const validateEmail = (email) => {
  if (!email.trim()) return "El email es obligatorio";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // formato general email
  if (!regex.test(email)) return "El email no es válido";
  return "";
};

//asunto
export const validateSubject = (subject) => {
  if (!subject.trim()) return "El asunto es obligatorio";
  if (subject.length < 3) return "El asunto debe tener al menos 3 caracteres";
  if (subject.length > 20) return "El asunto debe tener un maximo de 20 letras"
  return "";
};

// Mensaje
export const validateMessage = (message) => {
  if (!message.trim()) return "El mensaje es obligatorio";
  if (message.length < 10) return "El mensaje debe tener al menos 10 caracteres";
  return "";
};

