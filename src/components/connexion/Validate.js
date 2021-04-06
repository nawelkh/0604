export default function Validate(values) {
  let errors = {};

  // Nom...page -insc
  if (!values.nom.trim()) {
    errors.nom = "veuillez remplir le champ";
  } else if (!/^[A-Za-z]+$/i.test(values.nom)) {
    errors.nom = "Vérifier le nom";
  }

  // prenom...page -insc
  if (!values.prenom.trim()) {
    errors.prenom = "veuillez remplir le champ";
  } else if (!/^[A-Za-z]+$/i.test(values.prenom)) {
    errors.prenom = "Vérifier le prenom";
  }
  // email page-insc
  if (!values.email) {
    errors.email = "veuillez remplir le champ";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "l'email n'est pas valide";
  }

  // password ............page-insc
  if (!values.password) {
    errors.password = "veuillez remplir le champ";
    //le mot de passe => Huit caractères au minimum, au moins une lettre et un chiffre
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)) {
    errors.password = "mot de passe incorrecte";
  }

  // confirm password ......page-insc
  if (!values.confirmPassword) {
    errors.confirmPassword = "veuillez remplir le champ";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "mot de passe non valide";
  }

  return errors;
}
