import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View
      style={{
        backgroundColor: "#1e88e5",
        height: 50,
        alignItems: "right",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
        SAY_YAS
      </Text>
    </View>
  );
};

export default Footer;
