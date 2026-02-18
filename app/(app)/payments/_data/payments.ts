export const MOCK_BALANCE = 75000;

export interface Transaction {
  id: string;
  type: "sent" | "received";
  name: string;
  amount: number;
  date: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "t1", type: "received", name: "Awa Diallo", amount: 10000, date: "Aujourd'hui" },
  { id: "t2", type: "sent", name: "Kofi Mensah", amount: 3500, date: "Hier" },
  { id: "t3", type: "sent", name: "Marie Kouassi", amount: 7500, date: "Lun. 17 fév." },
  { id: "t4", type: "received", name: "Thierno Bah", amount: 15000, date: "Sam. 15 fév." },
  { id: "t5", type: "sent", name: "Adjoua Yao", amount: 5000, date: "Ven. 14 fév." },
];

// Mock recipients keyed by the QR value they would emit
export const MOCK_RECIPIENTS: Record<string, string> = {
  "mock-recipient-awa": "Awa Diallo",
  "mock-recipient-kofi": "Kofi Mensah",
  "mock-recipient-marie": "Marie Kouassi",
  "mock-recipient-thierno": "Thierno Bah",
};

export function resolveName(qrValue: string): string {
  return MOCK_RECIPIENTS[qrValue] ?? "Membre inconnu";
}

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}
