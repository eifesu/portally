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
    spendingOverview: "Spending Overview",
    searchTransactions: "Search transactions...",
    noTransactionsFound: "No transactions found",
    totalSpent: "Total Spent",
    last7Days: "Last 7 days",

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

    // Housing pages
    housing: "Housing",
    availableResidences: "Available Residences",
    viewDetails: "View Details",
    kmAway: "km away",
    amenities: "Amenities",
    roomTypes: "Room Types",
    availableRooms: "Available Rooms",
    selectThisRoom: "Select This Room",
    capacity: "Capacity",
    person: "person",
    people: "people",
    unavailable: "Unavailable",
    roomSelected: "Room selected successfully",
    available: "Available",
    notAvailable: "Not available",

    // Security Setup
    setupSecurity: "Secure your account",
    passkeyTitle: "Set up biometric authentication",
    passkeyDescription:
      "Use Face ID, Touch ID, or your device's biometric sensor to quickly verify payments and housing.",
    setupPasskey: "Set up passkey",
    skipPasskey: "Skip for now",
    passkeySuccess: "Passkey configured successfully",
    passkeyFailed: "Failed to set up passkey",
    pinTitle: "Create a PIN code",
    pinDescription:
      "Your PIN will be used to verify payments and housing selection.",
    pinPlaceholder: "Enter 4-digit PIN",
    confirmPinPlaceholder: "Confirm PIN",
    createPin: "Create PIN",
    pinMismatch: "PINs do not match",
    pinTooShort: "PIN must be 4 digits",
    pinSuccess: "PIN created successfully",
    enterPin: "Enter your PIN",
    pinIncorrect: "Incorrect PIN",
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
    spendingOverview: "Aperçu des dépenses",
    searchTransactions: "Rechercher des transactions...",
    noTransactionsFound: "Aucune transaction trouvée",
    totalSpent: "Total dépensé",
    last7Days: "7 derniers jours",

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

    // Housing pages
    housing: "Logement",
    availableResidences: "Résidences Disponibles",
    viewDetails: "Voir les détails",
    kmAway: "km",
    amenities: "Équipements",
    roomTypes: "Types de chambres",
    availableRooms: "Chambres disponibles",
    selectThisRoom: "Sélectionner cette chambre",
    capacity: "Capacité",
    person: "personne",
    people: "personnes",
    unavailable: "Indisponible",
    roomSelected: "Chambre sélectionnée avec succès",
    available: "Disponible",
    notAvailable: "Non disponible",

    // Security Setup
    setupSecurity: "Sécurisez votre compte",
    passkeyTitle: "Configurer l'authentification biométrique",
    passkeyDescription:
      "Utilisez Face ID, Touch ID ou le capteur biométrique de votre appareil pour vérifier rapidement les paiements et le logement.",
    setupPasskey: "Configurer la clé d'accès",
    skipPasskey: "Passer pour l'instant",
    passkeySuccess: "Clé d'accès configurée avec succès",
    passkeyFailed: "Échec de la configuration de la clé d'accès",
    pinTitle: "Créer un code PIN",
    pinDescription:
      "Votre code PIN sera utilisé pour vérifier les paiements et la sélection du logement.",
    pinPlaceholder: "Entrez un code PIN à 4 chiffres",
    confirmPinPlaceholder: "Confirmez le code PIN",
    createPin: "Créer le code PIN",
    pinMismatch: "Les codes PIN ne correspondent pas",
    pinTooShort: "Le code PIN doit comporter 4 chiffres",
    pinSuccess: "Code PIN créé avec succès",
    enterPin: "Entrez votre code PIN",
    pinIncorrect: "Code PIN incorrect",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export default translations;
