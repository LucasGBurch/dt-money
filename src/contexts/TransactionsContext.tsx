import { ReactNode, useState, useEffect, useCallback } from 'react';
import { createContext } from 'use-context-selector';
import { api } from '../lib/axios';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>; // Promise por ser assíncrona
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt', // pesquisa no Git do JSON-Server parâmetro de ordenamento
        _order: 'desc',
        q: query,
      },
    });

    setTransactions(response.data);
    // console.log(data);
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(), // No Backend real, eles geram este dado. Criamos para não precisar configurar muita cois no JSON-Server
      });

      setTransactions((state) => [response.data, ...state]);
    },
    []
  );

  // useEffect não pode ser assíncrono, por isso, para evitarmos cascata de .then, precisamos fazer a função assíncrona separada acima (antes foi feita dentro do useEffect, que também funciona)
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
