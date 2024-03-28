import React, { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({ onPress, text }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 24,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#E8664B",
    borderRadius: 10,
    padding: 6,
    marginTop: 40,
    width: 350,
  },
  btnText: {
    color: "black",
    fontSize: 20,
  },
});
