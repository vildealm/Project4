import gql from 'graphql-tag';
import { useMutation, useApolloClient, useLazyQuery } from 'react-apollo';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Alert, Modal, View, TouchableHighlight } from 'react-native';
import { Button, } from 'react-native-elements';
import {useForm} from 'react-hook-form'; 

const ADD_PERSON = gql`
  mutation register($last_name: String!, $first_name: String!, $age: Int!, $location: String!, $description: String!) {
    register(last_name: $last_name, first_name: $first_name, age: $age, location: $location, description: $description)
  }
`;

interface StateProps {
    setModalVisible(val: boolean): void;
}

export const AddPersonPopUp = (props: StateProps) => {
    const onSubmit = (data: string | undefined) => {
        Alert.alert("Form Data", data);
    }; 
    const [addPerson, { error, data }] = useMutation(ADD_PERSON,
        { variables: { first_name: "first_name", last_name: 'last_name', age: 'age', location: 'location', description: 'description' } });

    const {register, handleSubmit, setValue} = useForm(); 

    useEffect(() => {
        register("first_name");
        register('last_name');
        register('age');
        register('location');
        register('decription');
    }, [register]); 

 return (
    <View style={styles.centeredView}>
    <View style={styles.modalView}>
        <Text style={styles.modalText}>Add a person!</Text>
        <View> 
            <Text style={styles.modalText}>Firstname</Text>
            <TextInput style={styles.modalText} onChangeText={text => {
                setValue("first_name", text)
            }}/>
            <Text style={styles.modalText}>Lastname</Text>
            <TextInput style={styles.modalText} onChangeText={text => {
                setValue("last_name", text)
            }}/>
            <Text style={styles.modalText}>Age</Text>
            <TextInput style={styles.modalText} onChangeText={text => {
                setValue("age", text)
            }}/>
            <Text style={styles.modalText}>Location</Text>
            <TextInput style={styles.modalText} onChangeText={text => {
                setValue("location", text)
            }}/> 
            <Text style={styles.modalText}>Description</Text>
            <TextInput style={styles.modalText} onChangeText={text => {
                setValue("description", text)
            }}/>
        </View>

        <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#a6dcef" }}
            onPress={() => {
                //handleSubmit(onSubmit); 
                props.setModalVisible(false); 
            }}
        >
            <Text style={styles.textStyle}>Submit</Text>
        </TouchableHighlight>
    </View>
</View>
 )
}
const styles = StyleSheet.create({
    openButton: {
        backgroundColor: "#ff414d",
        borderRadius: 30,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 5,
        shadowOpacity: 0.33,
        shadowRadius: 5,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18, 
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
})