import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { database } from "../firebaseConfig";
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
      <Text style={styles.title}>Historique</Text>
      <ScrollView>
        {profiles.map((profile) => (
          <View style={styles.reportContainer} key={profile.id}>
            <Text style={styles.reportText}>{profile.name}</Text>
            <Text style={styles.reportText}>Poids: {profile.weight}</Text>
            <Text style={styles.reportText}>Graisse: {profile.fat}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9faf4",
    justifyContent: "center",
    paddingLeft: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 40,
  },
  reportContainer: {
    width: 350,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginBottom: 40,
  },
  reportText: {
    fontSize: 18,
  },
});
