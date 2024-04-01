import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PickerSelect({
  label,
  selectedValue,
  onChange,
  items,
  customStyle,
}) {
  const [selectedItem, setSelectedItem] = useState();
  return (
    <View style={[customStyle, styles.pickerContainer]}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        style={styles.picker}
        dropdownIconColor="white"
        mode="dropdown"
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedItem(itemValue);
          onChange(itemValue);
        }}
      >
        {items.map(({ label, value }) => (
          <Picker.Item
            key={value}
            style={styles.pickerText}
            label={label}
            value={value}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    color: "white",
  },
  pickerContainer: {
    width: 205,
    borderBottomColor: "white",
    borderWidth: 1,
  },
  picker: {
    width: 240,
    marginLeft: -15,
    color: "white",
    backgroundColor: "black",
    borderColor: "black",
  },
  pickerText: {
    fontSize: 14,
  },
});
