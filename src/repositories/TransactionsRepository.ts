import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let incomeCalc = 0;
    let outcomeCalc = 0;

    const income = this.transactions.reduce((_accumulator, currentValue) => {
      if (currentValue.type === 'income') {
        incomeCalc += currentValue.value;
      }

      return incomeCalc;
    }, 0);

    const outcome = this.transactions.reduce((_accumulator, currentValue) => {
      if (currentValue.type === 'outcome') {
        outcomeCalc += currentValue.value;
      }

      return outcomeCalc;
    }, 0);

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
