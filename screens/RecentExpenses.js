import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import ExpenseOutput from '../components/ExpenseOutput/ExpenseOutput';
import LoadingOverlay from '../components/ExpenseOutput/UI/LoadingOverlay';
import {ExpensesContext} from '../store/expenses-context';
import {isRecent} from '../util/date';
import {fetchExpenses} from '../util/http';

export default function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);

  const expenseCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expenseCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }
  const last7days = expenseCtx.expenses.filter(expenses => {
    return isRecent(expenses.date);
  });

  return (
    <ExpenseOutput
      expenses={last7days}
      expensePeriod="Last 7 Days"
      fallbackText={'No expenses registered for the last 7 days.'}
    />
  );
}
