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
       

        <View style={styles.modalView}>
            <View> 
            <Image style={{width: 80, height: 80}} source={require("../icon/personIcon.png")}/> 
            </View>
            
            <View style={styles.modelView}> 
            <Text style={styles.modalText}> {person.first_name} {person.last_name}</Text>
            <Text style={styles.modalText}>Age: {person.age}</Text>
            <Text style={styles.modalText}>From: {person.location}</Text>
            <Text style={{fontStyle: "italic"}}>{person.description}</Text> 
            </View>
            <TouchableOpacity onPress={() => {props.setModalVisible(false); }}>
                <Image style={styles.imgBtn} source={require("../icon/close.png")}/>
            </TouchableOpacity>
           
        </View>
    )
}
const styles = StyleSheet.create({
    modalText: {
        marginBottom: 5,
        textAlign: "center",
        margin: 15,
       width: 210,
        fontSize: 16,
        borderRadius: 20
    },
    imgBtn:{
        width: 30,
        height: 30,
        marginBottom: 100,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    modalView: {
        flexDirection: "row", 
        marginTop: 300,
        backgroundColor: "#F8F8FF",
        borderRadius: 20,
        padding: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});
// <img src={imageText} className='closeBtn' height="50" width="50" alt="closeButton"/>