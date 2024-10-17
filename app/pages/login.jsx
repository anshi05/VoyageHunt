import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { router } from 'expo-router';


const LoginScreen = () => {
    const supabase = createClient(
        process.env.EXPO_PUBLIC_SUPABASE_URL || "",
        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
        {
            auth: {
                storage: AsyncStorage,
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: false,
            },
        }
    );

    const [email, setEmail] = useState('a1@gmail.com');
    const [password, setPassword] = useState('abhijith');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        async function loginUser() {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                    Alert.alert('Error', error.message);
                } else {
                    Alert.alert('Success', 'Logged in successfully');
                    router.push('/(tabs)/index'); // Navigate to the main tabs
                }
            } catch (error) {
                console.log("Catch error: " + error);
            }
        }

        loginUser();
    };

    return (
        
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={styles.content}>
                <Image source={require('../../assets/images/login.png')} style={styles.logo} resizeMode="contain" />
                <Text style={styles.welcomeText}>Fun's calling, you in?</Text>
                <Text style={styles.subText}>Login to dive back in!</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#A0A0A0"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#A0A0A0"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="#A0A0A0" marginTop={5} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/pages/register')}>
                        <Text style={styles.signupLink}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E2E',
    },
    content: {
        alignItems: 'center',
        padding: 0,
        position: 'relative',
        
    },
    logo: {
        marginTop: 40,
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        marginTop: 40,
    },
    subText: {
        fontSize: 14,
        color: '#CCCCCC',
        marginBottom: 30,
    },
    inputContainer: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        marginBottom: 15,
        position: 'relative',
    },
    input: {
        width: '100%',
        padding: 15,
        color: '#FFFFFF',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 12,
    },
    loginButton: {
        width: '88%',
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    signupText: {
        color: '#FFFFFF',
    },
    signupLink: {
        color: '#FFD700',
    },
});

export default LoginScreen;
