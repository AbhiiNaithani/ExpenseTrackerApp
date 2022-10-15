import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyles} from '../../constants/styles';
import {getFormattedDate} from '../../util/date';

export default function ExpenseItem({id, description, date, amount}) {
  const navigation = useNavigation();

  function ExpenseItemPressHandler() {
    navigation.navigate('ManageExpense', {
      expenseId: id,
    });
  }
  return (
    <Pressable
      onPress={ExpenseItemPressHandler}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            {'\u20B9'}
            {amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    elevation: 3,
    marginVertical: 10,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
  },
  pressed: {
    opacity: 0.75,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  amountContainer: {
    backgroundColor: 'white',
    fontSize: 15,
    minWidth: '22%',

    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
