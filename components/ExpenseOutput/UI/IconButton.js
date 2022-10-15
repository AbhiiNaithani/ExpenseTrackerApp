import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function IconButton({name, color, size, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.button}>
        <Icon name={name} color={color} size={size} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 26,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
