import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function LabeledTextInput({
  label,
  value,
  placeholder,
  onChange,
  keyboardType,
  customStyle,
  customStyleInput,
  textColor,
  secure,
}) {
  return (
    <View style={(styles.inputContainer, customStyle)}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, { color: textColor }, customStyleInput]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={textColor}
        onChangeText={onChange}
        secureTextEntry={secure}
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    color: "black",
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
    width: 350,
    borderBottomWidth: 2,
    marginBottom: 40,
  },
});
