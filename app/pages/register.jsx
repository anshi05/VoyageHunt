import { Picker } from '@react-native-picker/picker';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { IsLoggedInContext } from '@/app/context/isLoginContext';
import { Redirect, useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Tourist');  // Default to "Tourist"
    const [businessType, setBusinessType] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

    const router = useRouter();
    // useFocusEffect(() => {
    //     if (!isLoggedIn) {
    //         router.replace('/pages/register');
    //     }
    //     else{
    //         router.replace('/(tabs)/index')
    //     }
    // })
    useEffect(() => {
        if (userType === 'Tourist') {
            setBusinessType('')
        }
    }, [userType])


    const handleSubmit = () => {
        if (!name || !email || !password || !userType || (userType === 'Business' && !businessType)) {
            Alert.alert('Error', 'Please fill all fields.');
        } else {
            // Handle registration logic here
            const formData = {
                name, email, userType, businessType
            }
            console.log(formData)

            Alert.alert('Success', `Registered as ${userType}${businessType ? ` - ${businessType}` : ''}`);
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
        </View>
    );
};

export default RegisterScreen;
