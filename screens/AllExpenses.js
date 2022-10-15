import React, {useContext} from 'react';
import {Text} from 'react-native';
import ExpenseOutput from '../components/ExpenseOutput/ExpenseOutput';
import {ExpensesContext} from '../store/expenses-context';

export default function AllExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  return (
    <ExpenseOutput
      expensePeriod={'Total'}
      expenses={expenseCtx.expenses}
      fallbackText={'No registered expenses found!'}
    />
  );
}
