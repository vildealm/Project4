import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { GET_ALL, GET_PERSON } from '../resolvers';
import gql from 'graphql-tag';
import { QueryResult, useLazyQuery, useQuery } from 'react-apollo';
import Person from './Person';

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
        return <p>{queryResult.error}</p>;
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

    const checkStatus = (filter: string) => {
        if (filter === "getAll") {
            return allResults;
        }
        else {
            return nameResults;
        }
    }

    function getSearchVal(input: string) {
        let name: string = input;
        setName(name);
        searchName();
        setActiveFilter('nameSearch');
    }

    const [persons, allResults] = useLazyQuery(
        GET_ALL,
        { variables: { orderBy: orderBy, pageNumber: pageNumber} }
    );

    const [searchName, nameResults] = useLazyQuery(
        GET_PERSON,
        { variables: { name: name, orderBy: orderBy, pageNumber: pageNumber }});

    useEffect(() => {
        persons();
    }, []);


    return (
        <View style={styles.container}>
            <View>
                <SearchBar
                    round
                    style={styles.searchField}
                    placeholder="Search..."
                    onChangeText={(input) => getSearchVal(input)}
                    value={name}

                />
                <View style={{ margin: 'auto', alignItems: 'center' }}>
                    {setPerson(checkStatus(activeFilter))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 50
    },
    searchField: {
        borderColor: '#d9ecf2',
        padding: 10,
        backgroundColor: '#d9ecf2'
    }
});

