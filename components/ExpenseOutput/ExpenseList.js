import React from 'react';
import {FlatList, View, Text} from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderItemHandler(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

export default function ExpenseList({expenses}) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderItemHandler}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
}
