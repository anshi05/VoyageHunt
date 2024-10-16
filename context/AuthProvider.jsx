import { supabase } from '@/utils/supabase';
import React, { createContext, useEffect, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [session, setsession] = useState();
    const [initialized, setInitialized] = useState(false)
    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
            setsession(session);
            setUser(session ? session.user : null);
            setInitialized(true);
        });

        return () => {
            data.subscription.unsubscribe();
        }
    }, [])

    const signOut = async () => {
        await supabase.auth.signOut();
    }
    return (
        <AuthContext.Provider value={{ user, session, initialized, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
