import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'

import { IsLoggedInContext } from '@/app/context/isLoginContext';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';

const index = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

    const router = useRouter();
    useFocusEffect(() => {
        if (!isLoggedIn) {
            router.replace('/pages/register');
        }
        else {
            router.replace('/(tabs)/')
        }
    })
    return (
        <View>
            <Text>index</Text>
        </View>
    )
}

export default index