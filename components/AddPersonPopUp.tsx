import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions,Image,TextInput, View, TouchableHighlight, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useForm} from 'react-hook-form';

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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const AddPersonPopUp = (props: StateProps) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [location, setLoc] = useState('Gløshaugen');
    const [description, setDesc] = useState('');
    const [txtField, setTextField] = useState(false);

    const [addPerson, { error, data }] = useMutation(ADD_PERSON,
        { variables: { first_name: first_name, last_name: last_name, age: age, location: location, description: description } });

    const onSubmit = ({ first_name, last_name, age, location, description }: IFormInputs) => {
        alert('You successfully added a person!');
        console.log(first_name, last_name, age, location, description); };

    const { handleSubmit } = useForm<IFormInputs>();
    function checkTextField(input: string) {
        if (!input.trim()) {
            alert('Fill in the empty fields');
            setTextField(false)
            return false;
        } 
        if (input.length === 30) {
            alert('Too long name');
            setTextField(false)
            return false;
        }
        if (!checkValidChar(input)){
            alert('Invalid char');
            setTextField(false)
            return false;
        }
        setTextField(true)
        return true;
    }
    function checkNum(input:number){
        if(input < 0  || input > 101){
            alert('Invalid age')
            return false;
        }
        return true;
    }
   function checkValidChar(input:string){
        if(input.match('(?:[a-zæøåA-ZÆØÅ])')){return true;} 
   }

   function checkDropDown(input: string){
       if(input.match('Gløshaugen' || 'Dragvoll' || 'Handelshøyskolen' || 'Kalvskinnet')){return true}
   }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View>
                    <TouchableOpacity onPress={() => {props.setModalVisible(false);}}>
                        <Image style={styles.imgBtn} source={require("../icon/close.png")} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, textAlign: "center", fontWeight:"bold", margin: 5 }}>Add a person!</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.modalText}
                        placeholder="Firstname"
                        onChangeText={(e) => setFirstName(e)}
                        returnKeyType={ 'done' }
                        underlineColorAndroid = "transparent"
                    />
                    <TextInput
                        style={styles.modalText}
                        placeholder="Lastname"
                        onChangeText={(e) => setLastName(e)}
                        returnKeyType={ 'done' }
                        underlineColorAndroid = "transparent"
                    />
                    <TextInput
                        placeholder="Age"
                        style={styles.modalText}
                        keyboardType='numeric'
                        onChangeText={(e) => setAge(+e)}
                        returnKeyType={ 'done' }
                        underlineColorAndroid = "transparent"
                    />
                    <TextInput
                        placeholder="Description"
                        style={styles.modalText}
                        onChangeText={(e) => setDesc(e)}
                        returnKeyType={ 'done' }
                        underlineColorAndroid = "transparent"
                    />
                    <RNPickerSelect 
                        value={location}
                        onValueChange={(e) => {setLoc(e)}}
                        items={[
                            { label: 'Select a location', value: 'null' },
                            { label: 'Gløshaugen', value: 'Gløshaugen' },
                            { label: 'Dragvoll', value: 'Dragvoll' },
                            { label: 'Kalvskinnet', value: 'Kalvskinnet' },
                            { label: 'Handelshøyskolen', value: 'Handelshøyskolen' }
                        ]}
                    />
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#c2f0fc" }}
                        onPress={() => {
                            if (checkTextField(first_name || last_name || description) && checkNum(age) && checkDropDown(location)) {
                                first_name &&
                                last_name &&
                                age &&
                                location &&
                                description &&
                                addPerson()
                                handleSubmit(onSubmit);
                                props.setModalVisible(false);
                            }
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
    modalView: {
        ...Platform.select({
            ios: {
                width: windowWidth-80,
                height: windowHeight-190,
                margin: 20,
                backgroundColor: "#F8F8FF",
                borderRadius: 20,
                padding: 30,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                    },
            android: {
                    width: windowWidth-80,
                    height: windowHeight-100,
                    margin: 20,
                    backgroundColor: "#F8F8FF",
                    borderRadius: 20,
                    padding: 40,
                    alignItems: "center",    
            },
          }),

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        borderRadius: 30,

        ...Platform.select({
            ios: {
                shadowOpacity: 0.7,
                shadowRadius: 60.19,
                elevation: 8,
            },
            android: {
                
            },
        }),
       
    },
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
        marginTop: 25,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    modalText: {

        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        marginBottom: 10,
        marginTop: 15,
        textAlign: "center",
        
        padding: 8,
        width: 200,
        fontSize: 16,
        borderRadius: 20
    },
    imgBtn: {
        width: 25,
        height: 25,
        marginLeft: 200,
    }
})
