import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet,Button, TextInput,  TouchableOpacity, Image } from 'react-native'
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker'
interface UserParams{
    id: number
}
export default function Update(){
    const routes = useRoute();
    const navigation = useNavigation()
    const params = routes.params as UserParams
    const [user,setUser] = useState<User>();
    const [name, setName] = useState('');
    const [birth,setBirth] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [image,setImage] = useState('')
    interface User{
        id: number,
        name: string,
        birthDate: string,
        image: string
    }
    useEffect(() => {
        api.get(`user/${params.id}`).then(response => {
            setUser(response.data)
        })
    }, []);

    async function handleSelectImages(){
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        // if (status !== 'granted'){
        //     alert('Precisamos de acesso a galeria de imagens');
        //     return
        // } 
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        if(result.cancelled){
            return;
        }
        const {uri: image} = result;

        setImage(image);
        setImagePreview(image);
    }
    async function handleUpdateImage(){
    const data = new FormData();

    data.append('name', name);
    data.append('birthDate', birth);
    data.append('image', {
        name: image,
        type: 'image/jpg' || 'image/png',
        uri: image,

    } as any);


    await api.put(`user/${user?.id}`, data);

    navigation.navigate('List')

    
}
    
    return(
        <View style={styles.container}>
            <TextInput 
            defaultValue={user?.name}
            style={styles.input}/>
            <TextInput 
            defaultValue={user?.birthDate}
            style={styles.input}/>
            <Image source={{uri: user?.image}} style={styles.uploadedImage}/>
            <TouchableOpacity style={styles.imageButton} 
            onPress={handleSelectImages}>
                
                <Text style={styles.textImage}> + </Text>
            </TouchableOpacity>
            <Button title='Atualizar' onPress={handleUpdateImage} />
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "#8ab6d6",
    },
    input: {
        backgroundColor: "#fff",
        paddingLeft: 8,
        height: 50,
        borderRadius: 8,
        marginBottom: 10
    },
    button: {
        height: 50,
        backgroundColor: 'white',
        marginBottom: 20
    },
    uploadedImage: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    imageButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        backgroundColor: "#fff",
        marginBottom: 20,
        borderRadius: 8
    },
    textImage: {
        fontSize: 32,
        color: "#8ab6d6",
    }
})