import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

interface StateProps {
    setModalVisible(val: boolean): void;
}
//Functionality for the "Add-person popup"
export const PopUpPerson = (props: any, prop: StateProps) => {
    let person = {
        first_name: String,
        last_name: String,
        age: Number,
        location: String,
        description: String
    }
    person.first_name = props.first_name;
    person.last_name = props.last_name;
    person.age = props.age;
    person.location = props.location;
    person.description = props.description;
    

    return (
        <View style={styles.modalView}>
            <View >
                <Image style={{ width: 80, height: 80 }} source={require("../icon/personIcon.png")}/>
            </View>
            <View>
                <Text style={styles.modalNameText}> {person.first_name} {person.last_name}</Text>
                <Text style={styles.modalText}>Age: &nbsp;{person.age}</Text>
                <Text style={styles.modalText}>From: &nbsp; {person.location}</Text>
                <Text style={{width: 210, fontStyle: "italic", textAlign: "center", fontSize: 18, marginTop: 20}}>&nbsp; &nbsp;"{person.description}"</Text>
            </View>
            <TouchableOpacity onPress={() => {props.setModalVisible(false); }}>
                <Image style={styles.imgBtn} source={require("../icon/close.png")} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    modalText: {
       marginBottom: 0,
        textAlign: "center",
        margin: 15,
        width: 200,
        fontSize: 18,
    },
    modalNameText: {
        width: 210, fontWeight: "bold", textAlign: "center", fontSize: 24
    }, 
    imgBtn: {
        width: 25,
        height: 25,
        marginBottom: 105,
    },
    modalView: {
        flexDirection: "row",
        marginTop: 330,
        backgroundColor: "#F8F8F8",
        borderRadius: 40,
        padding: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,
        elevation: 23,
    }
});
