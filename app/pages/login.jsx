import { Picker } from '@react-native-picker/picker';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';


import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
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
        })
    const [email, setEmail] = useState('abhijithsogal@gmail.com');
    const [password, setPassword] = useState('abhijith');

    const handleSubmit = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill all fields.');
        } else {
            // Handle registration logic here
            const formData = {
                email, password
            }
            console.log("Formdata: ", formData)
            async function loginUser() {
                try {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: email,
                        password: password,
                    })
                    console.log(data.session.user.id)
                    if (error) {
                        Alert.alert('Error', error.message);
                    }
                    else {
                        alert('Logged in successfully');
                        console.log("data: ".data)
                        const { data, error } = await supabase.auth.getSession()
                        console.log(data, error)
                        router.push('/(tabs)/')
                    }

                    console.log('Data inserted successfully:');

                } catch (error) {
                    console.log("catch error: " + error)
                }
            }
            loginUser()
            // Alert.alert('Success', `Logined as ${userType}${businessType ? ` - ${businessType}` : ''}`);
        }
    };

    return (
        <View className="flex-1 bg-gray-100 p-6 justify-center">
            <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">Login</Text>

            {/* Email Input */}
            <TextInput
                className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg"
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            {/* Password Input */}
            <TextInput
                className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {/* Submit Button */}
            <TouchableOpacity
                className="w-full p-4 bg-blue-600 rounded-lg"
                onPress={handleSubmit}
            >
                <Text className="text-center text-white text-lg font-semibold">Login</Text>
            </TouchableOpacity>
            {/* Login Button */}
            <TouchableOpacity
                className="w-full p-4"
                onPress={() => router.replace('/pages/register')}
            >
                <Text className="text-center  text-lg font-semibold">Register if you don't have an account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
