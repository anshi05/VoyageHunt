import React, { useState } from 'react';
import { View, Button, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createClient, SupabaseClient } from '@supabase/supabase-js';


const PhotoUpload = () => {
    const supabase = createClient("https://mezityqgxnauanmjjkgv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leml0eXFneG5hdWFubWpqa2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTQ3OTMsImV4cCI6MjA0NDYzMDc5M30.FnzXtfkcxM1Xq_TRIsZyb-EOHLNE6-9i0Coq1F4GnHw");
    const [caption, setCaption] = useState('');
    const [imageUri, setImageUri] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const uploadPhoto = async () => {
        if (imageUri) {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const fileName = `public/${Date.now()}.jpg`;

            const { data, error } = await supabase.storage
                .from('posts')  // Replace with your bucket name
                .upload(fileName, blob);
            console.log("data: ", data)

            if (error) {
                console.error('Upload error:', error);
                return;
            }
            else {
                console.log(data)
            }

            const imageUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/your-bucket/${data.Key}`;

            const { error: postError } = await supabase
                .from('Posts')
                .insert([{ user_id: supabase.auth.user().id, caption, image_url: imageUrl }]);

            if (postError) {
                console.error('Post error:', postError);
            } else {
                setCaption('');
                setImageUri(null);
                // Optionally refresh your posts list here
            }
        }
    };

    return (
        <View>
            <Button title="Pick an image" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
            <TextInput
                value={caption}
                onChangeText={setCaption}
                placeholder="Enter caption"
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Upload" onPress={uploadPhoto} />
        </View>
    );
};

export default PhotoUpload;
