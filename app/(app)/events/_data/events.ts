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
    title: "Cérémonie d'ouverture de l'ACD",
    description:
      "Cérémonie officielle d'ouverture de l'Assemblée et Conférence de District 9101. Discours des officiels, présentation du programme et accueil des délégations des 10 pays du district.",
    type: "camaraderie",
    date: "Ven. 21 fév.",
    time: "09:00 – 11:00",
    location: "Palais de la Culture, Bouaké",
    attachments: [
      {
        name: "Programme officiel ACD 2025.pdf",
        url: "/attachments/acd-programme-officiel.pdf",
        mimeType: "application/pdf",
        sizeKb: 1850,
      },
      {
        name: "Plan du site – Bouaké.png",
        url: "/attachments/acd-plan-site.png",
        mimeType: "image/png",
        sizeKb: 620,
      },
    ],
  },
  {
    id: "2",
    title: "Atelier Leadership & Développement personnel",
    description:
      "Découvrez de nouvelles perspectives pour votre croissance personnelle et professionnelle. Session animée par des leaders Rotaract expérimentés sur le développement du leadership au sein des clubs.",
    type: "formation",
    date: "Ven. 21 fév.",
    time: "14:00 – 17:00",
    location: "Salle Houphouët, Bouaké",
    attachments: [
      {
        name: "Guide du leadership Rotaract.pdf",
        url: "/attachments/acd-leadership-guide.pdf",
        mimeType: "application/pdf",
        sizeKb: 1120,
      },
    ],
  },
  {
    id: "3",
    title: "Soirée culturelle – Découverte de Bouaké",
    description:
      "Explorez Bouaké, ville dynamique au cœur de la Côte d'Ivoire. Une soirée mêlant diversité culturelle, danses traditionnelles, gastronomie locale et moments de convivialité inoubliables.",
    type: "camaraderie",
    date: "Ven. 21 fév.",
    time: "19:00 – 23:00",
    location: "Esplanade du Grand Marché, Bouaké",
  },
  {
    id: "4",
    title: "Session plénière – Bilan de l'année Rotaract",
    description:
      "Participez aux discussions approfondies et ateliers de réflexion sur le bilan de l'année Rotaract du District 9101. Présentation des projets phares et vote des résolutions.",
    type: "formation",
    date: "Sam. 22 fév.",
    time: "09:00 – 12:30",
    location: "Palais de la Culture, Bouaké",
    attachments: [
      {
        name: "Rapport annuel District 9101.pdf",
        url: "/attachments/acd-rapport-annuel.pdf",
        mimeType: "application/pdf",
        sizeKb: 3200,
      },
      {
        name: "Résolutions proposées.pdf",
        url: "/attachments/acd-resolutions.pdf",
        mimeType: "application/pdf",
        sizeKb: 480,
      },
    ],
  },
  {
    id: "5",
    title: "Atelier Projets collaboratifs inter-clubs",
    description:
      "Participez à des projets collaboratifs qui renforcent les liens entre membres et créent un impact positif durable. Brainstorming, planification et mise en réseau entre les 10 pays du district.",
    type: "formation",
    date: "Sam. 22 fév.",
    time: "14:00 – 16:30",
    location: "Salle Houphouët, Bouaké",
    attachments: [
      {
        name: "Kit de démarrage projet.zip",
        url: "/attachments/acd-projet-starter-kit.zip",
        mimeType: "application/zip",
        sizeKb: 750,
      },
    ],
  },
  {
    id: "6",
    title: "Gala de clôture de l'ACD",
    description:
      "Soirée de gala marquant la clôture de l'ACD 2025. Remise des prix, célébration des réussites du district et passation symbolique. Tenue de soirée exigée.",
    type: "camaraderie",
    date: "Sam. 22 fév.",
    time: "20:00 – 00:00",
    location: "Hôtel Président, Bouaké",
  },
];
