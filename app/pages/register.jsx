import { Picker } from '@react-native-picker/picker';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { IsLoggedInContext } from '@/app/context/isLoginContext';

import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { router } from 'expo-router';

const RegisterScreen = () => {
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
    const [name, setName] = useState('Abhijith');
    const [email, setEmail] = useState('abhijithsogal@gmail.com');
    const [password, setPassword] = useState('abhijith');
    const [userType, setUserType] = useState('Tourist');  // Default to "Tourist"
    const [location, setLocation] = useState('Udupi');
    const [businessType, setBusinessType] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

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
                    //signup
                    const { data, error } = await supabase.auth.signUp({
                        email: email,
                        password: password
                    })
                    data && console.log("email from data: " + data.user.email)

                    //insert user in table
                    if (data.user) {
                        const userobj = data.user;
                        if (userType === "Business") {
                            const { error } = await supabase
                                .from('BusinessData')  // Replace 'Users' with your table name
                                .insert([
                                    {
                                        uid: userobj.id,
                                        email: userobj.email,
                                        name: name,
                                        location: location,
                                        business_type: businessType
                                    }
                                ]);
                            if (error) {
                                console.error('Error inserting data:', error);
                            } else {
                                router.replace('/(tabs)/')
                                console.log('Data inserted successfully:');
                            }
                        }
                        else if (userType === "Tourist") {
                            const { error } = await supabase
                                .from('TouristsData')
                                .insert([
                                    {
                                        uid: userobj.id,
                                        email: userobj.email,
                                        name: name,
                                        location: location,
                                    },
                                ]);

                            if (error) {
                                console.error('Error inserting data:', error);
                            } else {
                                console.log('Data inserted successfully:');
                            }
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
