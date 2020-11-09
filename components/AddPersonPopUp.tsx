import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Alert, Modal, View, TouchableHighlight } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useForm, Controller } from 'react-hook-form';

const ADD_PERSON = gql`
  mutation register($last_name: String!, $first_name: String!, $age: Int!, $location: String!, $description: String!) {
    register(last_name: $last_name, first_name: $first_name, age: $age, location: $location, description: $description)
  }
`;

interface StateProps {
    setModalVisible(val: boolean): void;
}

interface IFormInputs {
    first_name: string;
    last_name: string;
    age: number;
    location: string;
    description: string;
}

export const AddPersonPopUp = (props: StateProps) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [location, setLoc] = useState('Gløshaugen');
    const [description, setDesc] = useState('');
    
    const onSubmit = ({ first_name, last_name, age, location, description }: IFormInputs) => {
        console.log(first_name, last_name, age, location, description);
        Alert.alert("Success!")
    };
    const [addPerson, { error, data }] = useMutation(ADD_PERSON,
        { variables: { first_name: "first_name", last_name: 'last_name', age: 'age', location: 'location', description: 'description' } });

    const { handleSubmit, setValue, control } = useForm<IFormInputs>();

    return (

        <View style={styles.centeredView}>

            <View style={styles.modalView}>

                <Text style={{fontSize: 24}}>Add a person!</Text>

                <View>
                    <Text style={styles.modalText}>Firstname</Text>
              
                            <TextInput
                                style={styles.modalText}
                        
                                placeholder="Firstname"
                                onChangeText={(e) => setFirstName(e)}
                                value={first_name}
                            />
                      
                     

                    <Text style={styles.modalText}>Lastname</Text>
                    
                            <TextInput
                                style={styles.modalText}
                                placeholder="Lastname"
                                
                                onChangeText={(e) => setLastName(e)}
                                value={last_name}
                            />
                    
                    <Text style={styles.modalText}>Age</Text>
                    
                            <TextInput
                                placeholder="Age"
                                style={styles.modalText}
                                keyboardType='numeric'
                                onChangeText={(e) => setAge(+e)}
                            />
                      
                    <Text style={styles.modalText}>Description</Text>
                    
                            <TextInput
                                placeholder="Description"
                                style={styles.modalText}
                                
                                onChangeText={(e) => setDesc(e)}
                                value={description}
                            />
                       
                    <Text style={styles.modalText}>Location</Text>
                            <RNPickerSelect
                                onValueChange={(e) => setLoc(e)}
                                items={[
                                    { label: 'Gløshaugen', value: 'gløshaugen' },
                                    { label: 'Dragvoll', value: 'dragvoll' },
                                    { label: 'Kalvskinnet', value: 'kavlskinnet' },
                                    {label: 'Handelshøyskolen', value:'handelshøyskolen'}
                                ]}
                            />
                       

                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#a6dcef" }}
                        onPress={() => {
                            handleSubmit(onSubmit);
                            props.setModalVisible(false);
                            first_name &&
                            last_name &&
                            age &&
                            location &&
                            description &&
                            addPerson() 
                        }}
                    >
                        <Text style={styles.textStyle}>Add</Text>
                    </TouchableHighlight>
                </View>
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
        margin: 15
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    modalText: {
        marginBottom: 5,
        textAlign: "center",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        padding: 5,
        width: 200, 
        fontSize: 16,
        borderRadius:20
    },
    modalView: {
        margin: 20,
        backgroundColor: "#F8F8FF",
        borderRadius: 20,
        padding: 40,
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
        marginTop: 22,
        borderRadius: 30
    }
})
/* <TextInput style={styles.modalText} onChangeText={text => {
                        setValue("first_name", text)
                    }} />
                    <TextInput ref={register} style={styles.modalText} onChangeText={text => {
                        setValue("last_name", text)
                    }} />

                    <TextInput ref={register} style={styles.modalText} onChangeText={text => {
                        setValue("age", text)
                    }} />
<TextInput ref={register} style={styles.modalText} onChangeText={text => {
                        setValue("description", text)
                    }} />
                     <select name="location" ref={register}>
                        <option value="Gløshaugen">Gløshaugen</option>
                        <option value="Dragvoll">Dragvoll</option>
                        <option value="Kalvskinnet">Kalvskinnet</option>
                        <option value="Handelshøyskolen">Handelshøyskolen</option>
                    </select>
                    */