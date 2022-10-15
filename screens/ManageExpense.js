import React, {useContext, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ExpenseForm from '../components/ExpenseOutput/ManageExpense/ExpenseForm';

import IconButton from '../components/ExpenseOutput/UI/IconButton';
import LoadingOverlay from '../components/ExpenseOutput/UI/LoadingOverlay';
import {GlobalStyles} from '../constants/styles';
import {ExpensesContext} from '../store/expenses-context';
import {deleteExpense, storeExpense, updateExpense} from '../util/http';

export default function ManageExpense({route, navigation}) {
  const [isSetting, setIsSetting] = useState(false);
  const editedExpenseId = route.params?.expenseId;
  const isEditting = !!editedExpenseId;
  const expenseCtx = useContext(ExpensesContext);

  const selectedExpense = expenseCtx.expenses.find(
    expense => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditting]);

  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSetting(true);
    if (isEditting) {
      await updateExpense(editedExpenseId.expenseData);
      expenseCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expenseCtx.addExpense({expenseData, id: id});
    }
    navigation.goBack();
  }
  async function deletePressHandler() {
    setIsSetting(true);
    await deleteExpense(editedExpenseId);
    expenseCtx.delExpense(editedExpenseId);
    navigation.goBack();
  }

  if (isSetting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        isEditting={isEditting}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditting && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deletePressHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },

  deleteContainer: {
    paddingTop: 8,
    marginTop: 16,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
