import React, { Fragment, useState } from 'react';
import { Text, View,StyleSheet,Button, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api';
import { useNavigation } from '@react-navigation/core';
import {AiFillPlusCircle} from 'react-icons/ai'


export default function SignUp(){
    const[name,setName] = useState('');
    const[birth,setBirth] = useState('');
    const[image,setImage] = useState('');
    const[imagePreview, setImagePreview] = useState('');
    const navigation = useNavigation();

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
    async function handleCreateImage(){
    const data = new FormData();

    data.append('name', name);
    data.append('birthDate', birth);
    data.append('image', {
        name: image,
        type: 'image/jpg' || 'image/png',
        uri: image,

    } as any);

    await api.post('user', data);

    alert('Usuário Cadastrado com Sucesso')

    navigation.navigate('Main')
    }

    

    return(
        <View style={styles.container}>
            <Text>SignUp</Text>
            <TextInput 
            value={name} 
            placeholder="Nome do Usuário: "
            onChangeText={text => setName(text)}
            style={styles.input}/>
            <TextInput 
            value={birth} 
            placeholder="Data de Nascimento: "
            onChangeText={text => setBirth(text)}
            style={styles.input}/>
            
            <View>
                {
                    imagePreview ? (
                        <Image 
                         source ={{uri: image}}
                         style={styles.uploadedImage}/>
                    ): 
                    (<Fragment/>)
                }
                
            </View>
            <TouchableOpacity 
            style={styles.imageButton}
            onPress={handleSelectImages}
            >
                <Text style={styles.textImage}> + </Text>
            </TouchableOpacity>
            <Button title='Cadastrar' onPress={handleCreateImage} />
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
        height: 200
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