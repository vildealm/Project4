import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {SearchBar} from 'react-native-elements'; 
import { GET_ALL } from './resolvers';
import { QueryResult, useLazyQuery, useQuery } from 'react-apollo';
import Person from './Person';

function setPerson(queryResult: QueryResult){

    let people : any = []; 
    let ids : any = [];
    let person = {
        id: Number,
        first_name: String,
        last_name: String,
        age: Number,
        location: String,
        description: String
    } 
    if(queryResult.error){
        return <p>{queryResult.error}</p>;
    }
    if(queryResult.data !== undefined){
        if(queryResult.data.persons !== undefined){
            queryResult.data.persons.map(({id, first_name, last_name, age, location, description}: any) => {
                person.id= id;
                person.first_name = first_name;
                person.last_name = last_name;
                person.age = age;
                person.location = location;
                person.description = description;
                if(!ids.includes(person.id)){
                    people.push(<Person first_name= {person.first_name} last_name = {person.last_name} location = {person.location} age= {person.age} description = {person.description}/>);
                    ids.push(person.id);
                }
            });
        }
        else if(queryResult.data.filterSearch !== undefined){
            queryResult.data.filterSearch.map(({id, first_name, last_name, age, location, description}: any) => {
                person.id= id;
                person.first_name = first_name;
                person.last_name = last_name;
                person.age = age;
                person.location = location;
                person.description = description;
                if(!ids.includes(person.id)){
                    people.push(<Person first_name= {person.first_name} last_name = {person.last_name} location = {person.location} age= {person.age} description = {person.description}/>);
                    ids.push(person.id);
                }
            });
        }
        else{
            queryResult.data.nameSearch.map(({id, first_name, last_name, age, location, description}: any) => {
                person.id= id;
                person.first_name = first_name;
                person.last_name = last_name;
                person.age = age;
                person.location = location;
                person.description = description;
                if(!ids.includes(person.id)){
                    people.push(<Person first_name= {person.first_name} last_name = {person.last_name} location = {person.location} age= {person.age} description = {person.description}/>);
                    ids.push(person.id);
                }
            });
        }
        return people;
    }  
}


export default function Output() {
    const[orderBy, setOrderBy] = useState('first_name');
    const[pageNumber, setPageNumber] = useState(0);
  
    const [persons, allResults] = useLazyQuery(  
        GET_ALL,
        { variables: { orderBy: orderBy, pageNumber: pageNumber } }
    );
    
    useEffect(() => {
        persons();
        }, []);
    
    return (
        <View>
            <TextInput style={styles.searchField} placeholder="Search..."> </TextInput>
            <View> 
            {setPerson(allResults)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchField: {
      color: 'red',
      backgroundColor: "white",
      borderWidth: 1,
      padding: 10,
      width: 200
    }
  });

