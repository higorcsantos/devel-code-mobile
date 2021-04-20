import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native';



export default function Main(){
    const navigation = useNavigation();
    
    function handleMainToSignUp(){
        navigation.navigate("SignUp")
    }
    function handleMainToList(){
        navigation.navigate("List")
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={handleMainToSignUp}
            style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar Usuário</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={handleMainToList
            }
            style={styles.button}>
                <Text style={styles.buttonText}>Listar Usuários</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#8ab6d6',
        justifyContent:'center'
    },
    button: {
        width: 200,
        height: 200,
        backgroundColor: "#FFF",
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    buttonText: {
        fontSize: 22
    }

})