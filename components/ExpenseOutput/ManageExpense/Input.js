import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../../constants/styles';

export default function Input({label, style, inputTextConfig, isValid}) {
  const inputStyle = [styles.input];
  if (inputTextConfig && inputTextConfig.multiline) {
    inputStyle.push(styles.multiline);
  }
  if (!isValid) {
    inputStyle.push(styles.invalidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyle} {...inputTextConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
