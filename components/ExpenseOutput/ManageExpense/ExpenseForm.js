import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../../constants/styles';
import Input from './Input';
import Button from '../UI/Button';
import {getFormattedDate} from '../../../util/date';

export default function ExpenseForm({
  onCancel,
  isEditting,
  onSubmit,
  defaultValues,
}) {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInput(currInputValues => {
      return {
        ...currInputValues,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInput(currInputs => {
        return {
          amount: {
            value: currInputs.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: currInputs.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsValid =
    input.amount.isValid && input.date.isValid && input.description.isValid;
  return (
    <View style={styles.formContainer}>
      <Text style={styles.heading}>Your Expense</Text>
      <View style={styles.rowInput}>
        <Input
          label={'Amount'}
          isValid={input.amount.isValid}
          inputTextConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: input.amount.value,
          }}
          style={styles.rowInputAlign}
        />
        <Input
          label={'Date'}
          isValid={input.date.isValid}
          inputTextConfig={{
            keyboardType: 'number-pad',
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: input.date.value,
          }}
          style={styles.rowInputAlign}
        />
      </View>
      <Input
        label={'Description'}
        isValid={input.description.isValid}
        inputTextConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: input.description.value,
        }}
      />
      {!formIsValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          CANCEL
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {isEditting ? 'UPDATE' : 'ADD'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 64,
  },
  heading: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
    marginBottom: 20,
  },
  rowInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowInputAlign: {
    flex: 1,
    marginHorizontal: 6,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    margin: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
