import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

interface StateProps {
    setModalVisible(val: boolean): void;
}
//Functionality for the "Add-person popup"
export const PopUpPerson = (props: any, prop:StateProps) => {
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

    return(
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TouchableOpacity  style={styles.closeBtn} onPress={() => {props.setModalVisible(false); }}>
                <Image style={styles.imgBtn} source={require("../icon/close.png")}/>
            </TouchableOpacity>
            <Text>{person.first_name} {person.last_name}</Text>
            <Text>Age: {person.age}</Text>
            <Text>From: {person.location}</Text>
            <Text> {person.description}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    imgBtn:{
        width: 30,
        height: 30,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
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
});
// <img src={imageText} className='closeBtn' height="50" width="50" alt="closeButton"/>