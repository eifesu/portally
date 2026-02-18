export const mockUser = {
  firstName: "Jean",
  lastName: "Konan",
  roomId: null as string | null,
};

export interface Room {
  id: string;
  label: string;
}

export interface Residence {
  id: string;
  name: string;
  rooms: Room[];
}

export const mockResidences: Residence[] = [
  {
    id: "res-1",
    name: "Résidence Les Palmiers",
    rooms: [
      { id: "PA-101", label: "101" },
      { id: "PA-102", label: "102" },
      { id: "PA-103", label: "103" },
      { id: "PA-201", label: "201" },
      { id: "PA-202", label: "202" },
      { id: "PA-203", label: "203" },
    ],
  },
  {
    id: "res-2",
    name: "Résidence Cocody",
    rooms: [
      { id: "CO-101", label: "101" },
      { id: "CO-102", label: "102" },
      { id: "CO-201", label: "201" },
      { id: "CO-202", label: "202" },
      { id: "CO-301", label: "301" },
    ],
  },
  {
    id: "res-3",
    name: "Résidence du Lac",
    rooms: [
      { id: "LA-A1", label: "A1" },
      { id: "LA-A2", label: "A2" },
      { id: "LA-B1", label: "B1" },
      { id: "LA-B2", label: "B2" },
      { id: "LA-C1", label: "C1" },
    ],
  },
  {
    id: "res-4",
    name: "Résidence Plateau",
    rooms: [
      { id: "PL-01", label: "01" },
      { id: "PL-02", label: "02" },
      { id: "PL-03", label: "03" },
      { id: "PL-04", label: "04" },
    ],
  },
];
