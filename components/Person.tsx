import { useState, useEffect } from "react";
import React from 'react';
import {PopUpPerson}  from './PopUpPerson';
import { StyleSheet, ScrollView, Text, View } from 'react-native';


const Person = (props: any) => {
    let examplePerson = ["Ola, Normann", 100, "Norge", "tullat"];
    let [person, setPerson] = useState(examplePerson);
    const [togglePop, setToggle] = useState(false);

    const togglePopUp = (open: boolean) => {
        if(togglePop){
            setToggle(false);
        }
        else{
            setToggle(true);
        }
    }
    
    useEffect(() => {
        setPerson([props.first_name,props.last_name, props.age, props.location, props.description]);
    }, []);
    return (

    <View style={styles.personBox}> 
    {togglePop ? <PopUpPerson 
                    first_name={props.first_name} 
                    last_name={props.last_name} 
                    location={props.location} 
                    age={props.age} 
                    description={props.description}
                /> : null}
                <Text style={{fontWeight: "bold", fontFamily: 'Copperplate'}}> {props.first_name} {props.last_name} </Text> 
                <Text style={{fontFamily: 'Copperplate'}}> Age: {props.age}</Text>
    </View>
    )
}
export default Person;

const styles = StyleSheet.create({
    personBox: {
    marginLeft: 60, 
    marginTop: 15, 
    padding:10,
    color: 'black',
    backgroundColor: 'white',
    width: 200,
    height: 50, 
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

//className="person" onClick={()=> togglePopUp(true)}