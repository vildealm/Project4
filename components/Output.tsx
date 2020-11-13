import React, { useEffect, useState } from 'react';
import { Platform, FlatList, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { GET_ALL, GET_PERSON , FILTER_SEARCH} from '../resolvers';
import { useLazyQuery, QueryResult } from 'react-apollo';
import Person from './Person';
import RNPickerSelect from 'react-native-picker-select';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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

//This is used to keep track of previously loaded data while scroll loading
let prevData: any = [];
let keys: any = [];


export default function Output() {
    const [orderBy, setOrderBy] = useState('first_name');
    const [activeFilter, setActiveFilter] = useState('getAll');
    const [name, setName] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [location, setLocation] = useState('any');
    const [age, setAge] = useState(0);
    const [orderOutput, setOrderOutput] = useState('Alphabetical');

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
        else if(filter === "filterSearch"){
            if(filterResults.data !== undefined){
                if(pageNumber > 0){
                    for(let i = 0; i<filterResults.data.filterSearch.length; i++){
                        if (!keys.includes(filterResults.data.filterSearch[i].id)) {
                            prevData = prevData.concat(filterResults.data.filterSearch[i]);
                            keys= keys.concat(filterResults.data.filterSearch[i].id);
                        }
                    }
                    return prevData;
                }
                for(let i = 0; i<filterResults.data.filterSearch.length; i++){
                    if (!keys.includes(filterResults.data.filterSearch[i].id)) {
                        prevData = prevData.concat(filterResults.data.filterSearch[i]);
                        keys= keys.concat(filterResults.data.filterSearch[i].id);
                    }
                }
                return filterResults.data.filterSearch;
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

    function handleAgeChange(value: any){
        if(isNaN(value)){
            setAge(0);
        }
        else{
            setAge(value);
        }
        filterSearch();
        setPageNumber(0);
        setActiveFilter('filterSearch');
        prevData = [];
        keys = [];
   }

    function handleLocationChange(value: string){
        setLocation(value)
        filterSearch();
        setPageNumber(0);
        setActiveFilter('filterSearch');
        prevData = [];
        keys = [];
    }

    function handleOrderChange(value: string){
        if(value==='Alphabetical'){
            setOrderBy('first_name')
            setOrderOutput(value);
        }
        else {
            setOrderBy('age')
            setOrderOutput(value)
        }
        setPageNumber(0);
        prevData = [];
        keys = [];
    }

    const [persons, allResults] = useLazyQuery (
        GET_ALL,
        { variables: { orderBy: orderBy, pageNumber: pageNumber} });
    
    const [filterSearch, filterResults] = useLazyQuery (
        FILTER_SEARCH, 
        { variables : { age: age, location: location, orderBy: orderBy, pageNumber: pageNumber }});

    const [searchName, nameResults] = useLazyQuery (
        GET_PERSON,
        { variables: { name: name, orderBy: orderBy, pageNumber: pageNumber }});
    
    useEffect(() => {
        persons();
        setPageNumber(0);
        prevData = [];
        keys = [];
    }, []);

    function handleLoadMore(){
        setPageNumber(pageNumber + 20);
    }

    return (
        <View style={styles.container}>
            <View>
                        <View style={styles.searchWrapper}>
                            <SearchBar
                                round
                                style={styles.searchField}
                                placeholder="Search..."
                                onChangeText={(input) => getSearchVal(input)}
                                value={name}
                                underlineColorAndroid="transparent"
                                containerStyle={{width: 300, backgroundColor:"#d9ecf2" }}
                            />
                        </View>
                       <View style={styles.filters}>
                       <TextInput   
                                placeholder="Age " 
                                underlineColorAndroid='transparent'  
                                keyboardType={'numeric'} 
                                onChangeText={ (value) =>handleAgeChange(parseInt(value)) }
                                returnKeyType={ 'done' }
                                style = {styles.filterAge}
                            />
                            <View style={pickerSelectStyles.inputIOS}
>
                        <RNPickerSelect
                        value={location}  

                        onValueChange={(value: any) => handleLocationChange(value)}
                        items={[
                            { label: 'Location ', value: 'any' },
                            { label: 'Gløshaugen', value: 'Gløshaugen' },
                            { label: 'Dragvoll', value: 'Dragvoll' },
                            { label: 'Kalvskinnet', value: 'Kalvskinnet' },
                            { label: 'Handelshøyskolen', value: 'Handelshøyskolen' }
                        ]}
                         />
                         </View>
                         <View style={pickerSelectStyles.inputIOS}>
                        <RNPickerSelect
                        value = {orderOutput}
                        onValueChange={(value: any) => handleOrderChange(value)}
                        items={[
                            { label: 'Alphabetical ', value: 'Alphabetical' },
                            { label: 'Age', value: 'Age' }
                            ]}
                        />
                        </View>
                        </View>
                        </View>
                        
            <FlatList
                    data={checkStatus(activeFilter)}
                    renderItem={({ item }) => (
                        <Person first_name={item.first_name} last_name={item.last_name} location={item.location} age={item.age} description={item.description} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={() => handleLoadMore()}
                    onEndReachedThreshold={4}
                    showsVerticalScrollIndicator ={false}
                    showsHorizontalScrollIndicator={false}
            />
    </View>
    );
}
       

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        alignItems: 'center',
        height: windowHeight/1.2,
        width: windowWidth/1.3, 
    },
    searchField: {
        padding: 10,
        backgroundColor: '#d9ecf2',
    },
    searchWrapper: {
        ...Platform.select({
            ios:{
                marginLeft: 60,
                marginTop: 30,
            },
            android:{
                marginLeft: 90,
                marginTop: 20,
            }
        }),
       
    }, 
    filterLocation: {
      
    },
   
    filterAge: {
        marginLeft: 20,
        width: 45,
        paddingRight: 8,
        paddingLeft: 8,
        paddingBottom: 14,
        height: 35, 
        borderBottomColor: '#232B2B',
        borderBottomWidth: 2,  

        ...Platform.select({
            ios: {
                paddingBottom: 14,

            },
            android: {
                paddingBottom: 0,
                

            },
          }),
       
            
    },
    filters:{
        ...Platform.select({
            ios: {
                display: 'flex',
                flexDirection: 'row',
                width: 170,
                marginTop: 25,
                marginBottom: 30,
                marginLeft: 80,
            },
            android: {
                display: 'flex',
                flexDirection: 'column',
                width: 180,
                fontSize: 2,
                marginTop: 25,
                marginBottom: 30,
                marginLeft: 90,
            },
          }),
       
    }
   

});

const pickerSelectStyles = StyleSheet.create({
    
 
      inputIOS: {
        marginLeft: 15,
        height: 35, 
        borderBottomColor: '#232B2B',
        borderBottomWidth: 2,    
    },
  
    
    
});

