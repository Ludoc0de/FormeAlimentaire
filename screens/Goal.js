import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { auth, database } from "../firebaseConfig";
import {
  get,
  getDocs,
  collection,
  getFirestore,
  where,
  query,
} from "firebase/firestore";
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from "react-native";

export default function Reports() {
  const [profiles, setProfiles] = useState([]);
  const database = getFirestore();
  const auth = getAuth();
  const authUserId = auth.currentUser.uid;
  const userProfile = collection(database, "profile");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (authUserId) {
          const q = query(userProfile, where("uid", "==", authUserId));
          const data = await getDocs(q);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setProfiles(filteredData);
        } else {
          console.log("User is not authenticated.");
          setReports([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchReports();
  }, [profiles]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>test</Text>
      <Text style={[styles.text, styles.customLastRapportText]}>test2</Text>
      <ScrollView>
        {profiles.map((profile) => (
          <View style={styles.lastReportContainer} key={profile.id}>
            <Text style={styles.lastReportText}>{profile.name}</Text>
            <Text style={styles.lastReportText}>Poids: {profile.weight}</Text>
            <Text style={styles.lastReportText}>Graisse: {profile.fat}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    backgroundColor: "black",
    justifyContent: "space-evenly",
    marginTop: -32,
  },
  title: {
    fontSize: 24,
    color: "white",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  pickerInput: {
    fontSize: 18,
    width: 205,
    color: "pink",
    borderColor: "transparent",
    backgroundColor: "transparent",
    borderBottomColor: "#FF70BC",
    borderWidth: 1,
    marginVertical: 10,
  },
  lastReportContainer: {
    width: 205,
    borderBottomColor: "#FF70BC",
    borderWidth: 2,
    marginVertical: 10,
  },
  customLastRapportText: {
    marginVertical: 20,
    borderBottomColor: "#FF70BC",
    borderWidth: 2,
  },
  lastReportText: {
    color: "white",
    fontSize: 18,
  },
});
