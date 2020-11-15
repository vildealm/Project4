import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions , Platform} from 'react-native';

interface StateProps {
    setModalVisible(val: boolean): void;
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
            <Image style = {[styles.image,{overflow: 'visible'}]} source={require("../icon/personIcon.png")}/>
            <View>
                <Text style={styles.modalNameText}> {person.first_name} {person.last_name}</Text>
                <Text style={styles.modalText}>Age: &nbsp;{person.age}</Text>
                <Text style={styles.modalText}>From: &nbsp; {person.location}</Text>
                <Text style={{width: 210, fontStyle: "italic", textAlign: "center", fontSize: 18, marginTop: 20,  marginLeft: 25}}>&nbsp; &nbsp;"{person.description}"</Text>
            </View>
            <TouchableOpacity onPress={() => {props.setModalVisible(false); }}>
                <Image style={styles.imgBtn} source={require("../icon/close.png")} />
            </TouchableOpacity>
                
        </View>
                
    )
}
const styles = StyleSheet.create({
    image:{
        width: windowWidth*0.1,
        height: windowHeight*0.1,
    },
    modalView: {
        ...Platform.select({ 
            ios:{
                width: windowWidth-10,
                height: windowHeight-400, 
                flexDirection: "row",
                marginTop: 330,
                backgroundColor: "#F8F8F8",
                borderRadius: 40,
                padding: 20,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 11,
                },
                shadowOpacity: 0.57,
                shadowRadius: 15.19,
                elevation: 23,
                },
            android:{
                width: windowWidth-5,
                height: windowHeight-400, 
                flexDirection: "row",
                marginTop: 300,
                backgroundColor: "#F8F8F8",
                borderRadius: 40,
                padding: 50,
                alignItems: "center",

            },
        }),
    },
    modalText: {
       marginBottom: 0,
        textAlign: "center",
        marginTop: 15,
        marginLeft: 35,
        width: 200,
        fontSize: 18,
    },
    modalNameText: {
        width: 180, 
        fontWeight: "bold", 
        textAlign: "center", 
        fontSize: 24,
        marginLeft: 30, 
    }, 
    imgBtn: {
        ...Platform.select({
            ios:{
                width: windowWidth*0.07,
                height: windowHeight*0.03,
                marginBottom: 135,
                marginLeft: -10, 
            },
            android:{
                width: windowWidth*0.09,
                height: windowHeight*0.04,
                marginBottom: 150,
                marginLeft: -10, 
            },
        }),
       
       
    }
});
