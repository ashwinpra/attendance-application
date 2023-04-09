import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#1e88e5",
        height: 50,
        paddingBottom: 10,
        alignItems: "right",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
        SAY_YAS
      </Text>
    </SafeAreaView>
  );
};

export default Footer;
