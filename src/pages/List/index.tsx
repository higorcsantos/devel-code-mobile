import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet,Button, Image, TouchableOpacity,ScrollView } from 'react-native'
import api from '../../services/api';

interface User{
    id: number;
    name: string;
    birthDate: Date;
    image: string;
}

export default function List(){
    
    const [user,setUser] = useState<User[]>([]);
    const navigation = useNavigation()

    useEffect(() => {
        api.get('user').then(response => {
            setUser(response.data)
        })
    }, []);

    function handleUpdate(id: number){
        navigation.navigate("Update", {id});
    }
    async function handleDelete(id: number){
        await api.delete(`user/${id}`);
        alert('Usuario deleteado com sucesso');
        navigation.navigate('List')
    }
    
    return( 
        <ScrollView style={styles.container}>
            {user.map(user => {
                const date = new Date(user.birthDate);
                let formatedDate = date.toLocaleDateString()
                return(
                    <View key={user.id}
                    style={styles.userContainer}>
                        <Image
                         style={styles.image}
                        source={{
                            uri: user.image
                        }}/>
                        
                        <Text style={styles.text}>Nome: {user.name}</Text>
                        <Text style={styles.text}>Data de Nascimento: {formatedDate}</Text>

                        <TouchableOpacity 
                        style={styles.button}
                        onPress = {() => handleUpdate(user.id)}>
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.button}
                        onPress={() => handleDelete(user.id)}>
                            <Text style={styles.buttonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )
            })}
            
        </ScrollView>
    )
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8ab6d6'
        
    },
    userContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width:  200,
        height: 200,
        borderRadius: 200
    },
    text: {
        backgroundColor: 'white',
        width: 300,
        height: 70,
        fontSize: 20,
        paddingLeft: 8,
        paddingTop: 3,
        color: '#8ab6d6',
        marginBottom: 10,
        borderRadius: 8
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: "#FFF",
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
        
    },
    buttonText: {
        fontSize: 22,
        color: '#8ab6d6'
    }
})