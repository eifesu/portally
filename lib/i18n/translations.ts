export type Locale = "en" | "fr";

const translations = {
  en: {
    title: "Access the portal",
    subtitle:
      "Enhance your experience during the District conference by first logging in and having access to restauration, formation documents and rooms.",
    phonePlaceholder: "6XX XXX XXX",
    sendCode: "Send code",
    codeSent: "Verification code sent",
    verify: "Verify",
    changeNumber: "Change number",
    loggedIn: "Logged in successfully",
  },
  fr: {
    title: "Accéder au portail",
    subtitle:
      "Améliorez votre expérience lors de la conférence de District en vous connectant pour accéder à la restauration, aux documents de formation et aux salles.",
    phonePlaceholder: "6XX XXX XXX",
    sendCode: "Envoyer le code",
    codeSent: "Code de vérification envoyé",
    verify: "Vérifier",
    changeNumber: "Changer le numéro",
    loggedIn: "Connexion réussie",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export default translations;
