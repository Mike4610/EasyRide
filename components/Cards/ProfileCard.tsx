import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileCard({ title, info, icon }: { title: string; info?: string, icon: string }) {
  return (
    <View style={styles.infoContainer}>
      <View style={{ marginTop: 30 }}>
        <Text style={styles.footer_title}>{title}</Text>
      </View>
      <View style={styles.info}>
          {/* @ts-ignore */}
        <MaterialCommunityIcons name={icon} size={28} color="#fd4d4d" />
        <Text style={styles.footer_text}>{info}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#a3a3a3",
    borderBottomWidth: 1,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  footer_text: {
    fontSize: 18,
    color: "#151a21",
    marginLeft: 5,
  },
  footer_title: {
    fontSize: 20,
    color: "#151a21",
    fontWeight: "bold",
  },
});
