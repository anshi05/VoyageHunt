// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView, StyleSheet, Image } from 'react-native';
// import { router } from 'expo-router';
// import { createClient } from '@supabase/supabase-js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';

// const SignUpScreen = () => {
//     const supabase = createClient(
//         "https://mezityqgxnauanmjjkgv.supabase.co",
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw",
//         {
//             auth: {
//                 storage: AsyncStorage,
//                 autoRefreshToken: true,
//                 persistSession: true,
//                 detectSessionInUrl: false,
//             },
//         }
//     );

//     const [name, setName] = useState('');
//     const [location, setLocation] = useState('');
//     const [tags, settags] = useState([]);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [userType, setUserType] = useState('Tourist');
//     const [referralCode, setReferralCode] = useState('');
//     const [passwordStrength, setPasswordStrength] = useState('');
    
//     // Additional states for business type
//     const [businessType, setBusinessType] = useState('');
//     const [customBusinessType, setCustomBusinessType] = useState(''); // For 'Others' option

//     const handlePasswordChange = (inputPassword) => {
//         setPassword(inputPassword);
//         evaluatePasswordStrength(inputPassword);
//     };

//     const evaluatePasswordStrength = (inputPassword) => {
//         let strength = '';
//         if (inputPassword.length === 0) {
//             strength = '';
//         } else if (inputPassword.length < 5) {
//             strength = 'easy';
//         } else if (inputPassword.length < 7) {
//             strength = 'medium';
//         } else {
//             strength = 'strong';
//         }
//         setPasswordStrength(strength);
//     };

//     const handleSignUp = async () => {
//         if (!name || !location || !email || !password || !confirmPassword || !userType) {
//             Alert.alert('Error', 'Please fill all fields.');
//         } else if (password !== confirmPassword) {
//             Alert.alert('Error', 'Passwords do not match.');
//         } else {
//             // Prepare form data
//             const formData = {
//                 name,
//                 email,
//                 location,
//                 referralCode,
//                 tags,
//                 business_type: userType === 'Business' ? (businessType === 'Others' ? customBusinessType : businessType) : '',
//             };
//             console.log("Formdata: ", formData);

//             async function signUpNewUser() {
//                 try {
//                     const form = {
//                         email,
//                         password
//                     };
//                     console.log(form);
//                     // Sign up the user
//                     const { data, error } = await supabase.auth.signUp(form);
//                     if (data && data.user) {
//                         const userobj = data.user;
//                         const d = [
//                             {
//                                 uid: userobj.id,
//                                 email: userobj.email,
//                                 name,
//                                 location,
//                                 referralCode,
//                                 business_type: formData.business_type,  // Include business type
//                             }
//                         ];
//                         const { error } = await supabase
//                             .from('Users')  // Replace 'Users' with your table name
//                             .insert(d);
//                         if (error) {
//                             console.error('Error inserting data:', error);
//                         } else {
//                             router.replace('/pages/login');
//                             console.log('Registered successfully. Please Login now');
//                         }
//                     }
//                 } catch (error) {
//                     console.log("catch error: " + error);
//                 }
//             }
//             signUpNewUser();
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView>
//                 <View style={styles.content}>
//                     <Image source={require('../../assets/images/voyageHunt.png')} style={styles.logo} resizeMode="contain" />
//                     <Text style={styles.title}>Ready to explore?</Text>
//                     <Text style={styles.signChild}>Sign up now!</Text>

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Name"
//                         placeholderTextColor="#A0A0A0"
//                         value={name}
//                         onChangeText={setName}
//                     />

//                     <View style={styles.input}>
//                         <Text className='text-[#A0A0A0]'>Select Category</Text>
//                         <Picker
//                             selectedValue={userType}
//                             onValueChange={(itemValue) => setUserType(itemValue)}
//                             style={styles.picker}
//                         >
//                             <Picker.Item label="Tourist" value="Tourist" />
//                             <Picker.Item label="Business" value="Business" />
//                         </Picker>
//                     </View>

//                     {/* If userType is Business, show Business Type picker */}
//                     {userType === 'Business' && (
//                         <View style={styles.input}>
//                             <Text className='text-[#A0A0A0]'>Select Type of Business</Text>
//                             <Picker
//                                 selectedValue={businessType}
//                                 onValueChange={(itemValue) => setBusinessType(itemValue)}
//                                 style={styles.picker}
//                             >
//                                 <Picker.Item label="Guides" value="Guides" />
//                                 <Picker.Item label="Restaurants" value="Restaurants" />
//                                 <Picker.Item label="Hotels" value="Hotels" />
//                                 <Picker.Item label="Others" value="Others" />
//                             </Picker>
//                         </View>
//                     )}

//                     {/* If businessType is Others, show input for custom business type */}
//                     {businessType === 'Others' && (
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Type of Business"
//                             placeholderTextColor="#A0A0A0"
//                             value={customBusinessType}
//                             onChangeText={setCustomBusinessType}
//                         />
//                     )}

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Location"
//                         placeholderTextColor="#A0A0A0"
//                         value={location}
//                         onChangeText={setLocation}
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Email"
//                         placeholderTextColor="#A0A0A0"
//                         value={email}
//                         onChangeText={setEmail}
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Password"
//                         placeholderTextColor="#A0A0A0"
//                         value={password}
//                         onChangeText={handlePasswordChange}
//                         secureTextEntry
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Confirm Password"
//                         placeholderTextColor="#A0A0A0"
//                         value={confirmPassword}
//                         onChangeText={setConfirmPassword}
//                         secureTextEntry
//                     />

//                     {/* Password Strength Indicator */}
//                     <View style={styles.strengthIndicatorContainer}>
//                         <View style={[styles.strengthIndicator, (passwordStrength === 'easy' && styles.easy) || (passwordStrength === 'medium' && styles.medium) || (passwordStrength === 'strong' && styles.strong)]} />
//                         <View style={[styles.strengthIndicator, (passwordStrength === 'medium' && styles.medium) || (passwordStrength === 'strong' && styles.strong)]} />
//                         <View style={[styles.strengthIndicator, (passwordStrength === 'strong' && styles.strong)]} />
//                         <Text style={styles.strengthText}>
//                             {passwordStrength === 'strong' ? 'Strong' : passwordStrength === 'medium' ? 'Medium' : passwordStrength === 'easy' ? 'Easy' : ''}
//                         </Text>
//                     </View>

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Referral Code (Optional)"
//                         placeholderTextColor="#A0A0A0"
//                         value={referralCode}
//                         onChangeText={setReferralCode}
//                     />

//                     <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
//                         <Text style={styles.signUpButtonText}>Sign Up</Text>
//                     </TouchableOpacity>
//                     <View style={styles.loginContainer}>
//                         <Text style={styles.loginText}>Have an account?</Text>
//                         <TouchableOpacity onPress={() => router.push('/pages/login')}>
//                             <Text style={styles.backToLogin}> Login</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//      container: {
//         flex: 1,
//         backgroundColor: '#1E1E2E',
//     },
//     content: {
//         alignItems: 'center',
//         padding: 20,
//         marginTop: 40,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#FFFFFF',
//         marginBottom: 10,
//     },
//     signChild: {
//         fontSize: 14,
//         color: '#CCCCCC',
//         marginBottom: 30,
//     },
//     loginText: {
//         color: '#fff',
//     },
//     loginContainer: {
//         flexDirection: 'row',
//         marginTop: 10,
//     },
//     input: {
//         width: '90%',
//         padding: 15,
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         borderRadius: 10,
//         marginBottom: 15,
//         color: '#FFFFFF',
//     },
//     picker: {
//         height: 0,
//         marginBottom: 40,
//         width: '100%',
//         color: '#FFFFFF',
//     },
//     signUpButton: {
//         width: '88%',
//         backgroundColor: '#FFD700',
//         padding: 10,
//         borderRadius: 50,
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     signUpButtonText: {
//         color: '#000000',
//         fontWeight: 'bold',
//     },
//     backToLogin: {
//         color: '#FFD700',
//     },
//     logo: {
//         width: 150,
//         height: 150,
//         marginBottom: 20,
//     },
//     strengthIndicatorContainer: {
//         flexDirection: 'row',
//         marginLeft: -150,
//         width: '40%',
//         marginBottom: 15,
//         borderRadius: 15,
//     },
//     strengthIndicator: {
//         height: 5,
//         flex: 1,
//         borderRadius: 10,
//         backgroundColor: "gray",
//         marginRight: 2,
//     },
//     easy: {
//         backgroundColor: 'red',
//     },
//     medium: {
//         backgroundColor: 'orange',
//     },
//     strong: {
//         backgroundColor: 'green',
//     },
//     strengthText: {
//         color: '#FFFFFF',
//         fontSize: 10,
//         marginLeft: 10,
//         marginTop: -6,
//     },
// });

// export default SignUpScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const SignUpScreen = () => {
    const supabase = createClient(
        "https://mezityqgxnauanmjjkgv.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw",
        {
            auth: {
                storage: AsyncStorage,
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: false,
            },
        }
    );

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [tags, settags] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('Tourist');
    const [referralCode, setReferralCode] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    // Additional states for business type
    const [businessType, setBusinessType] = useState('');
    const [customBusinessType, setCustomBusinessType] = useState(''); // For 'Others' option

    const handlePasswordChange = (inputPassword) => {
        setPassword(inputPassword);
        evaluatePasswordStrength(inputPassword);
    };

    const evaluatePasswordStrength = (inputPassword) => {
        let strength = '';
        if (inputPassword.length === 0) {
            strength = '';
        } else if (inputPassword.length < 6) {
            strength = 'easy';
        } else if (inputPassword.length < 8) {
            strength = 'medium';
        } else {
            strength = 'strong';
        }
        setPasswordStrength(strength);
    };

    const handleSignUp = async () => {
        if (!name || !location || !email || !password || !confirmPassword || !userType) {
            Alert.alert('Error', 'Please fill all fields.');
        } else if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
        } else {
            // Prepare form data
            const formData = {
                name,
                email,
                location,
                referralCode,
                tags,
                business_type: userType === 'Business' ? (businessType === 'Others' ? customBusinessType : businessType) : '',
            };
            console.log("Formdata: ", formData);

            async function signUpNewUser() {
                try {
                    const form = {
                        email,
                        password
                    };
                    
                    // Sign up the user
                    const { data, error } = await supabase.auth.signUp(form);
                    if (error) {
                        // Check if error is related to existing user
                        if (error.message.includes("User already registered")) {
                            Alert.alert('Error', 'User already exists. Please try logging in.');
                        } else {
                           
                            Alert.alert('Error', error.message);
                        }
                    } 
                    else if (data && data.user) {
                        const userobj = data.user;
                        const d = [
                            {
                                uid: userobj.id,
                                email: userobj.email,
                                name,
                                location,
                                referralCode,
                                business_type: formData.business_type,  // Include business type
                            }
                        ];
                        const { error } = await supabase
                            .from('Users') 
                            .insert(d);
                        if (error) {
                            console.log('Error inserting user data:', error);
                            
                        } else {
                            // Show success message
                            Alert.alert('Success', 'Registered successfully. Answer some question before proceeding...');
                            
                            // Delay navigation by 2 seconds
                            setTimeout(() => {
                                router.replace('/pages/onboarding1');
                            }, 2000);
                            
                    
                        }
                    }
                } catch (error) {
                    
                    console.log("catch error: " + error);
                }
            }
            signUpNewUser();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Image source={require('../../assets/images/voyageHunt.png')} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.title}>Ready to explore?</Text>
                    <Text style={styles.signChild}>Sign up now!</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#A0A0A0"
                        value={name}
                        onChangeText={setName}
                    />

                    <View style={styles.input}>
                        <Text className='text-[#A0A0A0]'>Select Category</Text>
                        <Picker
                            selectedValue={userType}
                            onValueChange={(itemValue) => setUserType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Tourist" value="Tourist" />
                            <Picker.Item label="Business" value="Business" />
                        </Picker>
                    </View>

                    {/* If userType is Business, show Business Type picker */}
                    {userType === 'Business' && (
                        <View style={styles.input}>
                            <Text className='text-[#A0A0A0]'>Select Type of Business</Text>
                            <Picker
                                selectedValue={businessType}
                                onValueChange={(itemValue) => setBusinessType(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Guides" value="Guides" />
                                <Picker.Item label="Restaurants" value="Restaurants" />
                                <Picker.Item label="Hotels" value="Hotels" />
                                <Picker.Item label="Others" value="Others" />
                            </Picker>
                        </View>
                    )}

                    {/* If businessType is Others, show input for custom business type */}
                    {businessType === 'Others' && (
                        <TextInput
                            style={styles.input}
                            placeholder="Type of Business"
                            placeholderTextColor="#A0A0A0"
                            value={customBusinessType}
                            onChangeText={setCustomBusinessType}
                        />
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Location"
                        placeholderTextColor="#A0A0A0"
                        value={location}
                        onChangeText={setLocation}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#A0A0A0"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#A0A0A0"
                        value={password}
                        onChangeText={handlePasswordChange}
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#A0A0A0"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    {/* Password Strength Indicator */}
                    <View style={styles.strengthIndicatorContainer}>
                        <View style={[styles.strengthIndicator, (passwordStrength === 'easy' && styles.easy) || (passwordStrength === 'medium' && styles.medium) || (passwordStrength === 'strong' && styles.strong)]} />
                        <View style={[styles.strengthIndicator, (passwordStrength === 'medium' && styles.medium) || (passwordStrength === 'strong' && styles.strong)]} />
                        <View style={[styles.strengthIndicator, (passwordStrength === 'strong' && styles.strong)]} />
                        <Text style={styles.strengthText}>
                            {passwordStrength === 'strong' ? 'Strong' : passwordStrength === 'medium' ? 'Medium' : passwordStrength === 'easy' ? 'Easy' : ''}
                        </Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Referral Code (Optional)"
                        placeholderTextColor="#A0A0A0"
                        value={referralCode}
                        onChangeText={setReferralCode}
                    />

                    <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('/pages/onboarding')}>
                            <Text style={styles.backToLogin}> Login</Text>
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
                padding: 20,
                marginTop: 40,
            },
            title: {
                fontSize: 24,
                fontWeight: 'bold',
                color: '#FFFFFF',
                marginBottom: 10,
            },
            signChild: {
                fontSize: 14,
                color: '#CCCCCC',
                marginBottom: 30,
            },
            loginText: {
                color: '#fff',
            },
            loginContainer: {
                flexDirection: 'row',
                marginTop: 10,
            },
            input: {
                width: '90%',
                padding: 15,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 10,
                marginBottom: 15,
                color: '#FFFFFF',
            },
            picker: {
                height: 0,
                marginBottom: 40,
                width: '100%',
                color: '#FFFFFF',
            },
            signUpButton: {
                width: '88%',
                backgroundColor: '#FFD700',
                padding: 10,
                borderRadius: 50,
                alignItems: 'center',
                marginTop: 10,
            },
            signUpButtonText: {
                color: '#000000',
                fontWeight: 'bold',
            },
            backToLogin: {
                color: '#FFD700',
            },
            logo: {
                width: 150,
                height: 150,
                marginBottom: 20,
            },
            strengthIndicatorContainer: {
                flexDirection: 'row',
                marginLeft: -150,
                width: '40%',
                marginBottom: 15,
                borderRadius: 15,
            },
            strengthIndicator: {
                height: 5,
                flex: 1,
                borderRadius: 10,
                backgroundColor: "gray",
                marginRight: 2,
            },
            easy: {
                backgroundColor: 'red',
            },
            medium: {
                backgroundColor: 'orange',
            },
            strong: {
                backgroundColor: 'green',
            },
            strengthText: {
                color: '#FFFFFF',
                fontSize: 10,
                marginLeft: 10,
                marginTop: -6,
            },
});

export default SignUpScreen;
