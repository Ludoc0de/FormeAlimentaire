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
        dropdownIconColor="#E8664B"
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
  },
  pickerContainer: {
    width: 350,
    borderBottomWidth: 2.5,
  },
  picker: {
    width: 350,
    marginLeft: -15,
  },
  pickerText: {
    fontSize: 14,
  },
});
