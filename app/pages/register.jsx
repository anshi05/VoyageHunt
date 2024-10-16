import { Picker } from '@react-native-picker/picker';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { router } from 'expo-router';

const RegisterScreen = () => {
    const supabase = createClient(
        "https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw",
        {
            auth: {
                storage: AsyncStorage,
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: false,
            },
        })
    const [name, setName] = useState('Abhijith');
    const [email, setEmail] = useState('abhijithsogal@gmail.com');
    const [password, setPassword] = useState('abhijith');
    const [userType, setUserType] = useState('Tourist');  // Default to "Tourist"
    const [location, setLocation] = useState('Udupi');
    const [businessType, setBusinessType] = useState('');

    useEffect(() => {
        if (userType === 'Tourist') {
            setBusinessType('')
        }
    }, [userType])


    const handleSubmit = () => {
        if (!name || !location || !email || !password || !userType || (userType === 'Business' && !businessType)) {
            Alert.alert('Error', 'Please fill all fields.');
        } else {
            // Handle registration logic here
            const formData = {
                name, email, userType, businessType, location
            }
            console.log("Formdata: ", formData)
            async function signUpNewUser() {
                try {
                    const form = {
                        email,
                        password
                    }
                    console.log(form)
                    //signup
                    const { data, error } = await supabase.auth.signUp(form)
                    data && console.log("email from data: " + data.user)
                    console.log("error:", error)
                    // console.log(data.session.user.aud)
                    // insert user in table
                    if (data.user) {
                        const userobj = data.user;
                        const d = [
                            {
                                uid: userobj.id,
                                email: userobj.email,
                                name,
                                location,
                                business_type: businessType
                            }
                        ]
                        console.log(d)
                        const { error } = await supabase
                            .from('Users')  // Replace 'Users' with your table name
                            .insert(d);
                        if (error) {
                            console.error('Error inserting data:', error);
                        } else {
                            router.replace('/(tabs)/')
                            console.log('Data inserted successfully:');
                        }
                    }
                } catch (error) {
                    console.log("catch error: " + error)
                }
            }
            signUpNewUser()
            // Alert.alert('Success', `Registered as ${userType}${businessType ? ` - ${businessType}` : ''}`);
        }
    };

    return (
        <View className="flex-1 bg-gray-100 p-6 justify-center">
            <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">Register</Text>

            {/* Name Input */}
            <TextInput
                className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg"
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            {/* Location Input */}
            <TextInput
                className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg"
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />

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

            {/* User Type Dropdown */}
            <View className="border border-gray-300 rounded-lg mb-4">
                <Picker
                    selectedValue={userType}
                    onValueChange={(itemValue) => setUserType(itemValue)}
                >
                    <Picker.Item label="Tourist" value="Tourist" />
                    <Picker.Item label="Business" value="Business" />
                </Picker>
            </View>

            {/* Business Type Dropdown (Visible only if 'Business' is selected) */}
            {userType === 'Business' && (
                <View className="border border-gray-300 rounded-lg mb-4">
                    <Picker
                        selectedValue={businessType}
                        onValueChange={(itemValue) => setBusinessType(itemValue)}
                    >
                        <Picker.Item label="Select Business Type" value="" />
                        <Picker.Item label="Restaurant" value="Restaurant" />
                        <Picker.Item label="Hotel" value="Hotel" />
                        <Picker.Item label="Guides" value="Guides" />
                        <Picker.Item label="Shops" value="Shops" />
                    </Picker>
                </View>
            )}
            {/* Submit Button */}
            <TouchableOpacity
                className="w-full p-4 bg-blue-600 rounded-lg"
                onPress={handleSubmit}
            >
                <Text className="text-center text-white text-lg font-semibold">Register</Text>
            </TouchableOpacity>
            {/* Login Button */}
            <TouchableOpacity
                className="w-full p-4 "
                onPress={() => router.replace('/pages/login')}
            >
                <Text className="text-center  text-lg font-semibold">Login if you have an account</Text>
            </TouchableOpacity>

        </View>
    );
};

export default RegisterScreen;
