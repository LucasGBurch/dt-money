import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions');
    const data = await response.json();

    setTransactions(data);
    console.log(data);
  }

  // useEffect não pode ser assíncrono, por isso, para evitarmos cascata de .then, precisamos fazer a função assíncrona separada acima (antes foi feita dentro do useEffect, que também funciona)
  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
              <td width='50%'>{transaction.description}</td>
              <td>
                <PriceHighlight variant={transaction.type}>R$ {transaction.price}</PriceHighlight>
              </td>
              <td>{transaction.category}</td>
              <td>{transaction.createdAt}</td>
            </tr>
              )
            })}
            
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
