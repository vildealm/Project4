import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { GET_ALL, GET_PERSON , FILTER_SEARCH} from '../resolvers';
import gql from 'graphql-tag';
import { QueryResult, useLazyQuery, useQuery } from 'react-apollo';
import Person from './Person';
import AddPerson from './AddPerson';


/*
function setPerson(queryResult: QueryResult) {
    let people: any = [];
    let map = new Map();
    let keys: any = [];
    let person = {
        key: Number,
        first_name: String,
        last_name: String,
        age: Number,
        location: String,
        description: String
    }

    if (queryResult.error) {
        console.log(queryResult.error);
        return <Text>Error</Text>;
    }
    if (queryResult.data !== undefined) {
        if (queryResult.data.persons !== undefined) {
            queryResult.data.persons.map(({ id, first_name, last_name, age, location, description }: any) => {
                let tempPeople: any = []; 
                person.key = id;
                person.first_name = first_name;
                person.last_name = last_name;
                person.age = age;
                person.location = location;
                person.description = description;
                if (!map.has(person.key)) {
                    map.set(person.key ,person);
                }
            });
        }
        else if (queryResult.data.filterSearch !== undefined) {
            queryResult.data.filterSearch.map(({ id, first_name, last_name, age, location, description }: any) => {
                let keys: any = [];
                person.key = id;
                person.first_name = first_name;
                person.last_name = last_name;
                person.age = age;
                person.location = location;
                person.description = description;
                if (!keys.includes(person.key)) {
                    people.push(person);
                    keys.push(person.key);
                }
            });
        }
        else {
            queryResult.data.nameSearch.map(({ id, first_name, last_name, age, location, description }: any) => {
                let keys: any = [];
                person.key = id;
                person.first_name = first_name;
                person.last_name = last_name;
                person.age = age;
                person.location = location;
                person.description = description;
                if (!keys.includes(person.key)) {
                    people.push(person);
                    keys.push(person.key);
                }
            });
        }    
        return people;
    }
    console.log(map);
    return map;
}*/

let prevData: any = [];
let keys: any = [];


export default function Output() {
    const [orderBy, setOrderBy] = useState('first_name');
    const [activeFilter, setActiveFilter] = useState('getAll');
    const [name, setName] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [location, setLocation] = useState("");
    const [age, setAge] = useState(null);


   function handleAgeChange(value: any){
        setAge(value)
        setActiveFilter('filter')
        filterSearch();
   }




    const checkStatus = (filter: string) => {
        if (filter === "getAll") {
            if(allResults.data !== undefined){
                if(allResults.data.persons !== undefined){
                    if(pageNumber > 0){
                        for(let i = 0; i<allResults.data.persons.length; i++){
                            if (!keys.includes(allResults.data.persons[i].id)) {
                                prevData = prevData.concat(allResults.data.persons[i]);
                                keys= keys.concat(allResults.data.persons[i].id);
                            }
                            
                        }
                        return prevData;
                    }
                    for(let i = 0; i<allResults.data.persons.length; i++){
                        if (!keys.includes(allResults.data.persons[i].id)) {
                            prevData = prevData.concat(allResults.data.persons[i]);
                            keys= keys.concat(allResults.data.persons[i].id);
                        }
                        
                    }
                    return allResults.data.persons;
                }
            }
        }
        else {
            if(nameResults.data !== undefined){
                if(pageNumber > 0){
                    for(let i = 0; i<nameResults.data.nameSearch.length; i++){
                        if (!keys.includes(nameResults.data.nameSearch[i].id)) {
                            prevData = prevData.concat(nameResults.data.nameSearch[i]);
                            keys= keys.concat(nameResults.data.nameSearch[i].id);
                        }
                    }
                    return prevData;
                }
                for(let i = 0; i<nameResults.data.nameSearch.length; i++){
                    if (!keys.includes(nameResults.data.nameSearch[i].id)) {
                        prevData = prevData.concat(nameResults.data.nameSearch[i]);
                        keys= keys.concat(nameResults.data.nameSearch[i].id);
                    }
                }
                return nameResults.data.nameSearch;
            }
        }
        else{
            return filterResults;
        }
    }
    
    function getSearchVal(input: string) {
        let name: string = input;
        setName(name);
        searchName();
        setPageNumber(0);
        setActiveFilter('nameSearch');
        prevData = [];
        keys = [];
    }


    function handleLocationChange(value: string){
        setLocation(value)
        filterSearch();
        setActiveFilter('filters');

    }
    const [persons, allResults] = useLazyQuery(
        GET_ALL,
        { variables: { orderBy: orderBy, pageNumber: pageNumber} }
        
    );
    const [filterSearch, filterResults] = useLazyQuery (
        FILTER_SEARCH, 
        { variables : { age: age, location: location, orderBy: orderBy, pageNumber: pageNumber }}
    );
    
   
    const [searchName, nameResults] = useLazyQuery(
        GET_PERSON,
        { variables: { name: name, orderBy: orderBy, pageNumber: pageNumber }});
    useEffect(() => {
        persons();
    }, []);

    function handleLoadMore(){
        setPageNumber(pageNumber + 20);
    }

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                <View style={styles.searchWrapper}>
                    <SearchBar
                        round
                        style={styles.searchField}
                        placeholder="Search..."
                        onChangeText={(input) => getSearchVal(input)}
                        value={name}
                        containerStyle={{width: 300, backgroundColor:'#d9ecf2' }}
                    />
                </View>}
                data={checkStatus(activeFilter)}
                renderItem={({ item }) => (
                    <Person first_name={item.first_name} last_name={item.last_name} location={item.location} age={item.age} description={item.description} />
                )}
                keyExtractor={(item) => item.id}
                onEndReached={() => handleLoadMore()}
                onEndReachedThreshold={4}
                ListFooterComponent={
                    <Text>Made with love by Group 4</Text>
                }
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    searchField: {
        padding: 10,
        backgroundColor: '#d9ecf2',
        fontFamily: 'Copperplate',
    },
    searchWrapper: {
        marginLeft: 50,
        marginTop: 30
    }, 
    filterAge: {
        padding: 5, 
        borderWidth: 2,
        width: 200,
        margin: 2
    }

});

