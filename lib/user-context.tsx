"use client";

import { createContext, useContext, useState, useCallback } from "react";
import {
  MOCK_BALANCE,
  MOCK_TRANSACTIONS,
  Transaction,
} from "@/app/(app)/payments/_data/payments";

interface UserData {
  firstName: string;
  lastName: string;
  roomId: string | null;
}

interface UserContextValue {
  // User data
  user: UserData;
  setRoomId: (roomId: string) => void;

  // Payments
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateBalance: (amount: number) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData>({
    firstName: "Jean",
    lastName: "Konan",
    roomId: null,
  });

  const [balance, setBalance] = useState(MOCK_BALANCE);
  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);

  const setRoomId = useCallback((roomId: string) => {
    setUser((prev) => ({ ...prev, roomId }));
  }, []);

  const addTransaction = useCallback(
    (transaction: Omit<Transaction, "id">) => {
      const newTransaction: Transaction = {
        ...transaction,
        id: `t-${Date.now()}`,
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    },
    []
  );

  const updateBalance = useCallback((amount: number) => {
    setBalance((prev) => prev + amount);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setRoomId,
        balance,
        transactions,
        addTransaction,
        updateBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
