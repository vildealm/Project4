import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Picker, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { GET_ALL, GET_PERSON , FILTER_SEARCH} from '../resolvers';
import gql from 'graphql-tag';
import { QueryResult, useLazyQuery, useQuery } from 'react-apollo';
import Person from './Person';
import AddPerson from './AddPerson';

function setPerson(queryResult: QueryResult) {
    let people: any = [];
    let ids: any = [];
    let person = {
        id: Number,
        first_name: String,
        last_name: String,
        age: Number,
        location: String,
        description: String
    }

    if (queryResult.error) {
        console.log(queryResult.error);
        return <Text>Error</Text>
    }
    if (queryResult.data !== undefined) {
        if (queryResult.data.persons !== undefined) {
            queryResult.data.persons.map(({ id, first_name, last_name, age, location, description }: any) => {
                person.id = id;
                person.first_name = first_name;
                person.last_name = last_name;
                person.age = age;
                person.location = location;
                person.description = description;
                if (!ids.includes(person.id)) {
                    people.push(<Person first_name={person.first_name} last_name={person.last_name} location={person.location} age={person.age} description={person.description} />);
                    ids.push(person.id);
                }
            });
        }
        else if (queryResult.data.filterSearch !== undefined) {
            queryResult.data.filterSearch.map(({ id, first_name, last_name, age, location, description }: any) => {
                person.id = id;
                person.first_name = first_name;
                person.last_name = last_name;
                person.age = age;
                person.location = location;
                person.description = description;
                if (!ids.includes(person.id)) {
                    people.push(<Person first_name={person.first_name} last_name={person.last_name} location={person.location} age={person.age} description={person.description} />);
                    ids.push(person.id);
                }
            });
        }
        else {
            queryResult.data.nameSearch.map(({ id, first_name, last_name, age, location, description }: any) => {
                person.id = id;
                person.first_name = first_name;
                person.last_name = last_name;
                person.age = age;
                person.location = location;
                person.description = description;
                if (!ids.includes(person.id)) {
                    people.push(<Person first_name={person.first_name} last_name={person.last_name} location={person.location} age={person.age} description={person.description} />);
                    ids.push(person.id);
                }
            });
        }    
        return people;
    }
}

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
            return allResults;
        }
        else if(filter === "nameSearch"){
            return nameResults;
        }
        else{
            return filterResults;
        }
    }

    function getSearchVal(input: string) {
        let name: string = input;
        setName(name);
        searchName();
        setActiveFilter('nameSearch');
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

    return (
        <View style={styles.container}>
            <View style={styles.searchWrapper}>
                <SearchBar
                    round
                    style={styles.searchField}
                    placeholder="Search..."
                    onChangeText={(input) => getSearchVal(input)}
                    value={name}
                    
                    containerStyle={{width: 300, backgroundColor:'#d9ecf2' }}
                />
            </View>

            <View>
                    <Text>Location: </Text>
                <Picker selectedValue = {location} 
                    onValueChange={ (value) => 
                        handleLocationChange(value)
                    } 
                     style={{width: 200, height: 44}} itemStyle={{height: 44}}
                    >   
                    <Picker.Item label="Any" value="any" />
                    <Picker.Item label="Gløshaugen" value="Gløshaugen" />
                    <Picker.Item label="Kalvskinnet" value="Kalvskinnet" />
                    <Picker.Item label="Handelshøyskolen" value="Handelshøyskolen" />
                    <Picker.Item label="Dragvoll" value="Dragvoll" />
                </Picker>
                
                <TextInput   
                    placeholder="Age"  
                    underlineColorAndroid='transparent'  
                    keyboardType={'numeric'} 
                    onChangeText={ (value) =>handleAgeChange(parseInt(value)) }
                    returnKeyType={ 'done' }
                    style = {styles.filterAge}
                    />
            </View>
            <View style={{ margin: 'auto', alignItems: 'center'}}>
                {setPerson(checkStatus(activeFilter))}
                
            </View>
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
        width: 60,
        color: '#555555',
        paddingRight: 8,
        paddingLeft: 8,
        height: 50, 
        borderColor: '#6E5BAA',
        borderWidth: 1,
        borderRadius: 2,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    }
});

