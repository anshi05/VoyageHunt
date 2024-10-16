import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'

import { IsLoggedInContext } from '@/app/context/isLoginContext';
import { router } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { supabase } from '@/utils/supabase';

const index = () => {
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                // User is authenticated, redirect to dashboard or home
                router.push('/(tabs)/)'); // Adjust the route as necessary
            } else {
                router.push('/pages/login)');// Set loading to false if no session
            }
        };

        checkUser();
    }, []);
    return (
        <View>
            <Text>index</Text>
        </View>
    )
}

export default index