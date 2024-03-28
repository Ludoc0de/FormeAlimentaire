import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Main() {
  return (
    <View style={styles.wrapper}>
      <Text>Création de votre profile utilisateur</Text>
      <Text>Votre nom ?</Text>
      <Text>Votre objectif ? Sèche ou Masse ?</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
