import React from 'react';
import { StyleSheet, View, Text, Pressable} from 'react-native';
import { NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined, // undefined means that the screen doesn't take any params
    Login: undefined,
    Register: undefined
}

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList,'Home'>;
}

export default function HomeScreen({navigation}: Props) {

    return (
        // make a container for the login page
        <View style={styles.background}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>

            {/* Add buttons for student, teacher and admin login */}
            {/* They should redirect to corresponding login page on click */}

            <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Student</Text>
            </Pressable>

            <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Teacher</Text>
            </Pressable>

            <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Admin</Text>
            </Pressable>

            {/* Add option for new user registration */}
            <Pressable style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.loginText}>New User? Register here</Text>
            </Pressable>
            
        </View>

    );
}

const styles = StyleSheet.create({

    background: {
      flex: 1,
      backgroundColor: '#28282B',
      alignItems: 'center',
      justifyContent: 'center'
    },

    welcomeText: {
        color: '#F5F5F5',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 50,
    },

    loginButton: {
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        marginVertical: 5,
    },

    loginText: {
        color: '#28282B',
        fontSize: 18,
        fontWeight: 'bold',
    },

    registerButton: {
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        marginVertical: 5,
    }

  });
