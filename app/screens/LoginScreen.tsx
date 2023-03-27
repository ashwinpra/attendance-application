import React from "react";
import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined; // undefined means that the screen doesn't take any params
  Login: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function LoginScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Welcome Back!</Text>
    </View>
  );
}
