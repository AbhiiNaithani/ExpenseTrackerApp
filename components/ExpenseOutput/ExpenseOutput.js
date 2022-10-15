import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import {GlobalStyles} from '../../constants/styles';

export default function ExpenseOutput({expenses, expensePeriod, fallbackText}) {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpenseList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} expensePeriod={expensePeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
    paddingBottom: 0,
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary50,
    textAlign: 'center',
    marginTop: 32,
  },
});
