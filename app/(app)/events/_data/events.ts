import { GraduationCap, Users } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type EventType = "formation" | "camaraderie";

export interface Attachment {
  name: string;
  url: string;
  mimeType: "application/pdf" | "image/png" | "application/zip";
  sizeKb: number;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  attachments?: Attachment[];
}

export const EVENT_TYPE_CONFIG: Record<
  EventType,
  {
    border: string;
    badge: string;
    iconBubble: string;
    typeIcon: LucideIcon;
  }
> = {
  formation: {
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    iconBubble: "bg-blue-100 text-blue-600",
    typeIcon: GraduationCap,
  },
  camaraderie: {
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    iconBubble: "bg-amber-100 text-amber-600",
    typeIcon: Users,
  },
};

export const EVENTS: ScheduleEvent[] = [
  {
    id: "1",
    title: "Introduction à la sécurité réseau",
    description: "Une session pratique pour comprendre les bases de la sécurité réseau : protocoles, pare-feu, détection d'intrusion et bonnes pratiques pour protéger votre infrastructure.",
    type: "formation",
    date: "Jeu. 20 fév.",
    time: "09:00 – 12:00",
    location: "Salle A",
    attachments: [
      {
        name: "Support de cours – Sécurité réseau.pdf",
        url: "/attachments/securite-reseau-support.pdf",
        mimeType: "application/pdf",
        sizeKb: 1240,
      },
      {
        name: "Exercices pratiques.pdf",
        url: "/attachments/securite-reseau-exercices.pdf",
        mimeType: "application/pdf",
        sizeKb: 380,
      },
    ],
  },
  {
    id: "2",
    title: "Soirée jeux de société",
    description: "Une soirée conviviale autour de jeux de société pour se retrouver et passer un bon moment entre résidents. Jeux fournis, venez juste avec votre bonne humeur !",
    type: "camaraderie",
    date: "Sam. 22 fév.",
    time: "18:00 – 21:00",
    location: "Foyer",
  },
  {
    id: "3",
    title: "Formation premiers secours",
    description: "Apprenez les gestes qui sauvent : réanimation cardio-pulmonaire, position latérale de sécurité, gestion des hémorragies et conduite à tenir en cas d'urgence. Formation animée par un secouriste certifié.",
    type: "formation",
    date: "Mar. 25 fév.",
    time: "14:00 – 17:00",
    location: "Salle B",
    attachments: [
      {
        name: "Manuel premiers secours.pdf",
        url: "/attachments/premiers-secours-manuel.pdf",
        mimeType: "application/pdf",
        sizeKb: 2150,
      },
      {
        name: "Fiche mémo gestes d'urgence.pdf",
        url: "/attachments/premiers-secours-memo.pdf",
        mimeType: "application/pdf",
        sizeKb: 95,
      },
    ],
  },
  {
    id: "4",
    title: "Barbecue d'équipe",
    description: "Profitez du printemps avec un barbecue convivial en plein air. Viandes, salades et desserts sont au programme. Pensez à vous inscrire avant le 28 février pour la commande des victuailles.",
    type: "camaraderie",
    date: "Dim. 1 mars",
    time: "12:00 – 15:00",
    location: "Terrain extérieur",
  },
  {
    id: "5",
    title: "Atelier développement web",
    description: "Un atelier hands-on pour découvrir les fondamentaux du développement web moderne : HTML, CSS et JavaScript. Aucun prérequis nécessaire — repartez avec votre première page web fonctionnelle.",
    type: "formation",
    date: "Jeu. 5 mars",
    time: "10:00 – 13:00",
    location: "Salle informatique",
    attachments: [
      {
        name: "Slides – Introduction au développement web.pdf",
        url: "/attachments/dev-web-slides.pdf",
        mimeType: "application/pdf",
        sizeKb: 870,
      },
      {
        name: "Projet de démarrage.zip",
        url: "/attachments/dev-web-starter.zip",
        mimeType: "application/zip",
        sizeKb: 450,
      },
    ],
  },
  {
    id: "6",
    title: "Escape game",
    description: "Résolvez des énigmes en équipe et tentez de vous échapper avant la fin du temps imparti ! Une activité idéale pour renforcer la cohésion et s'amuser. Groupes de 4 à 6 personnes.",
    type: "camaraderie",
    date: "Mar. 10 mars",
    time: "16:00 – 18:00",
    location: "Salle de jeux",
  },
];
