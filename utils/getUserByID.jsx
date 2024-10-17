import { createClient } from "@supabase/supabase-js";
import * as SecureStore from 'expo-secure-store';

async function getUserByUID() {
    const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");

    const data = await SecureStore.getItemAsync('session');
    const uid = JSON.parse(data).session.user.id;
    try {
        const { data, error } = await supabase
            .from('Users') // The table name is 'Users'
            .select('*') // Selecting all columns
            .eq('uid', uid); // Where the 'uid' column matches the provided UID

        if (error) {
            console.error('Error fetching user:', error);
            return null;
        }
        if (data.length > 0) {
            return (data[0]); // Return the first matching user
        } else {
            console.log('No user found with this UID');
            return null;
        }
    } catch (error) {
        console.error('Error during fetching user by UID:', error);
        return null;
    }
}
export default getUserByUID;