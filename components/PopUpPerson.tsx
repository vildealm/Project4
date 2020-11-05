import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const imageText = require("../icon/close.png") as string;

//Functionality for the "Add-person popup"
export const PopUpPerson = (props: any) => {
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
        <View style={styles.popup}>
            <img src={imageText} className='closeBtn' height="50" width="50" alt="closeButton"/>
            <Text>{person.first_name} {person.last_name}</Text>
            <Text>Age: {person.age}</Text>
            <Text>From: {person.location}</Text>
            <Text> {person.description}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    popup: {
        margin: 10
    }
});