export type Locale = "en" | "fr";

const translations = {
  en: {
    // Auth
    title: "Access the portal",
    subtitle:
      "Enhance your experience during the District conference by first logging in and having access to restauration, formation documents and rooms.",
    phonePlaceholder: "6XX XXX XXX",
    sendCode: "Send code",
    codeSent: "Verification code sent",
    verify: "Verify",
    changeNumber: "Change number",
    loggedIn: "Logged in successfully",

    // Navigation
    logout: "Logout",
    tabHome: "Home",
    tabPayments: "Payments",
    tabEvents: "Events",

    // Home
    nextEvent: "Next event",
    latestTransactions: "Latest transactions",

    // Events
    events: "Events",
    upNext: "Up next",
    upcoming: "Upcoming",
    attachments: "Attachments",
    eventFormation: "Training",
    eventCamaraderie: "Camaraderie",

    // Payments
    availableBalance: "Available balance",
    scanAndPay: "Scan & Pay",
    recentTransactions: "Recent transactions",
    sendTo: "Send to",
    insufficientBalance: "Insufficient balance",
    confirmSend: "Confirm payment",
    placeQrInFrame: "Place the QR code in the frame",
    cameraHttpsError:
      "Camera access requires a secure connection (HTTPS). Please access the app via HTTPS.",
    cameraDeniedError:
      "Camera access denied. Please allow access in your settings.",
    cameraError: "Unable to access the camera.",
    now: "Just now",

    // ID Card
    memberRole: "Rotaract Member",
    memberId: "Member ID",
    balance: "Balance",
    room: "Room",
    selectHousing: "Select your housing",
    tapToClose: "Tap to close",

    // Housing picker
    selectResidence: "Select a residence",
    selectRoom: "Select your room",
    searchResidence: "Search residence…",
    searchRoom: "Search room…",
    noResults: "No results",
    rooms: "rooms",
    roomLabel: "Room",
    biometricError: "Authentication failed. Please try again.",
  },
  fr: {
    // Auth
    title: "Accéder au portail",
    subtitle:
      "Améliorez votre expérience lors de la conférence de District en vous connectant pour accéder à la restauration, aux documents de formation et aux salles.",
    phonePlaceholder: "6XX XXX XXX",
    sendCode: "Envoyer le code",
    codeSent: "Code de vérification envoyé",
    verify: "Vérifier",
    changeNumber: "Changer le numéro",
    loggedIn: "Connexion réussie",

    // Navigation
    logout: "Déconnexion",
    tabHome: "Accueil",
    tabPayments: "Paiements",
    tabEvents: "Événements",

    // Home
    nextEvent: "Prochain événement",
    latestTransactions: "Dernières transactions",

    // Events
    events: "Événements",
    upNext: "Prochain",
    upcoming: "À venir",
    attachments: "Pièces jointes",
    eventFormation: "Formation",
    eventCamaraderie: "Camaraderie",

    // Payments
    availableBalance: "Solde disponible",
    scanAndPay: "Scanner & Payer",
    recentTransactions: "Transactions récentes",
    sendTo: "Envoyer à",
    insufficientBalance: "Solde insuffisant",
    confirmSend: "Confirmer l'envoi",
    placeQrInFrame: "Placez le QR code dans le cadre",
    cameraHttpsError:
      "L'accès à la caméra nécessite une connexion sécurisée (HTTPS). Veuillez accéder à l'application via HTTPS.",
    cameraDeniedError:
      "Accès à la caméra refusé. Veuillez autoriser l'accès dans les paramètres.",
    cameraError: "Impossible d'accéder à la caméra.",
    now: "Maintenant",

    // ID Card
    memberRole: "Membre Rotaract",
    memberId: "Member ID",
    balance: "Solde",
    room: "Chambre",
    selectHousing: "Choisir votre logement",
    tapToClose: "Appuyer pour fermer",

    // Housing picker
    selectResidence: "Choisir une résidence",
    selectRoom: "Choisir votre chambre",
    searchResidence: "Rechercher une résidence…",
    searchRoom: "Rechercher une chambre…",
    noResults: "Aucun résultat",
    rooms: "chambres",
    roomLabel: "Chambre",
    biometricError: "Authentification échouée. Veuillez réessayer.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export default translations;
