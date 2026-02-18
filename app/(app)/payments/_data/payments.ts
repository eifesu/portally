export const MOCK_BALANCE = 45000;

export interface Transaction {
  id: string;
  type: "sent" | "received";
  name: string;
  amount: number;
  date: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    type: "sent",
    name: "Déjeuner – Hôtel Président",
    amount: 3500,
    date: "Aujourd'hui",
  },
  {
    id: "t2",
    type: "sent",
    name: "Supplément boissons – Gala ACD",
    amount: 2000,
    date: "Aujourd'hui",
  },
  {
    id: "t3",
    type: "sent",
    name: "Cocktails – Bar Le Diplomate",
    amount: 4500,
    date: "Ven. 21 fév.",
  },
  {
    id: "t4",
    type: "received",
    name: "Remb. repas – Awa Diallo",
    amount: 1750,
    date: "Ven. 21 fév.",
  },
  {
    id: "t5",
    type: "sent",
    name: "Dîner – Restaurant Chez Tantie",
    amount: 5000,
    date: "Jeu. 20 fév.",
  },
  {
    id: "t6",
    type: "sent",
    name: "Petit-déjeuner – Hôtel Ran",
    amount: 1500,
    date: "Jeu. 20 fév.",
  },
  {
    id: "t7",
    type: "received",
    name: "Remb. cocktails – Kofi Mensah",
    amount: 2250,
    date: "Mer. 19 fév.",
  },
];

// Mock recipients keyed by the QR value they would emit
export const MOCK_RECIPIENTS: Record<string, string> = {
  "mock-recipient-awa": "Awa Diallo",
  "mock-recipient-kofi": "Kofi Mensah",
  "mock-recipient-marie": "Marie Kouassi",
  "mock-recipient-thierno": "Thierno Bah",
  "mock-recipient-district": "District 9101",
};

export function resolveName(qrValue: string): string {
  return MOCK_RECIPIENTS[qrValue] ?? "Membre inconnu";
}

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}
