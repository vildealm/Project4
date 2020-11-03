import { useState, useEffect } from "react";
import React from 'react';
import {PopUpPerson}  from './PopUpPerson';
import { StyleSheet, Text, View } from 'react-native';


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

    <View > 
    {togglePop ? <PopUpPerson 
                    first_name={props.first_name} 
                    last_name={props.last_name} 
                    location={props.location} 
                    age={props.age} 
                    description={props.description}
                /> : null}
                <Text>{props.first_name} {props.last_name} Age: {props.age}</Text>
    </View>
    )
}
export default Person;

//className="person" onClick={()=> togglePopUp(true)}