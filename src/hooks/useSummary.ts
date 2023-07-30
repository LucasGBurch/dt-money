import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { useMemo } from 'react';

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  // Com useMemo, a variável summary só é recriada quando o transactions mudar. Esse caso só seria performático quando a variável fosse atualizada para MUUUITOS componentes, que acabariam rerenderizando de modo desnecessário.
  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        // acc = accumulator
        if (transaction.type === 'income') {
          acc.income += transaction.price;
          acc.total += transaction.price;
        } else {
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );
  }, [transactions]);

  return summary;
}
