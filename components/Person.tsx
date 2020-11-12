import { useState, useEffect } from "react";
import React from 'react';
import { PopUpPerson } from './PopUpPerson';
import { Platform, StyleSheet, Modal, Text, View, TouchableOpacity } from 'react-native';

const Person = (props: any) => {
    const examplePerson = ["Ola, Normann", 100, "Norge", "tullat"];
    const [modalVisible, setModalVisible] = useState(false);
    let [person, setPerson] = useState(examplePerson);

    useEffect(() => {
        setPerson([props.first_name, props.last_name, props.age, props.location, props.description]);
    }, [setPerson, props]);

    return (
        <View style={styles.personBox}>
            {Platform.OS === 'ios'||'android' &&
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={{flex:1}}
            >
                <PopUpPerson
                    first_name={props.first_name}
                    last_name={props.last_name}
                    location={props.location}
                    age={props.age}
                    description={props.description}
                    setModalVisible={setModalVisible}
                />
            </Modal>}
            <TouchableOpacity onPress={() => {setModalVisible(true);}}>
                <Text style={{ fontWeight: "bold", marginTop:5}}> {props.first_name} {props.last_name} </Text>
                <Text style={{margin:2}}> Age: {props.age}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Person;

const styles = StyleSheet.create({
    personBox: {
        marginLeft: 55,
        marginTop: 15,
        marginRight: 8, 
        padding: 5,
        color: 'black',
        backgroundColor: 'white',
        width: 200,
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 5,
        shadowOpacity: 0.33,
        shadowRadius: 5,
    }
})
