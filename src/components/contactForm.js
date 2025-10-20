//name
export const validateName = (name) => {
  if (!name.trim()) return "El nombre es obligatorio";
  if (name.length < 3) return "El nombre debe tener al menos 3 letras";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) return "El nombre solo puede tener letras";
  return "";
};


export const validateLastName = (lastName) => {
  if (!lastName.trim()) return "El apellido es obligatorio";
  if (lastName.length < 3) return "El apellido debe tener minimo 3 caracteres";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(lastName)) return "El apellido solo puede contener letras";
  return "";
};

// Email
export const validateEmail = (email) => {
  if (!email.trim()) return "El email es obligatorio";
  const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (!regex.test(email)) return "El email ingresado no es valido";
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


export const validatePassword = (password) => {
  if (!password.trim()) return "La contraseña es obligatoria";
  if (password.length < 7) return "La contraseña debe tener al menos 8 caracteres";
  return "";
};


export const validateRepeatPassword = (password, rPassword) => {
  if (!rPassword.trim()) return "Debes repetir la contraseña";
  if (password !== rPassword) return "Las contraseñas no coinciden";
  return "";
};
