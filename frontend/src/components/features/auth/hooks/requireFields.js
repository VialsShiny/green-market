export default function requireFields(action, formData) {
  if (!action) return null;

  const requiredFields = {
    login: ['email', 'password'],
    register: ['name', 'email', 'password']
  };

  const fieldsToCheck = requiredFields[action] || [];
  const fieldErrors = {};
  let isValid = true;

  // Fonction pour valider email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  fieldsToCheck.forEach(field => {
    fieldErrors[field] = null;

    // Vérifier si le champ est vide
    if (!formData[field] || formData[field].trim() === '') {
      fieldErrors[field] = `Le champ ${field} est requis`;
      isValid = false;
    }
    // Vérifier si c'est un email valide
    else if (field === 'email' && !isValidEmail(formData[field])) {
      fieldErrors[field] = 'Veuillez entrer une adresse email valide';
      isValid = false;
    }
    // Vérifier la longueur du password
    else if (field === 'password' && formData[field].length < 6) {
      fieldErrors[field] = 'Le mot de passe doit contenir au moins 6 caractères';
      isValid = false;
    }
    // Vérifier le nom (au moins 2 caractères)
    else if (field === 'name' && formData[field].trim().length < 2) {
      fieldErrors[field] = 'Le nom doit contenir au moins 2 caractères';
      isValid = false;
    }
  });

  return {
    isValid,
    errors: fieldErrors,
    hasErrors: !isValid
  };
}