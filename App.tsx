import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'; 
import Output from './components/Output';
import AddPerson from './components/AddPerson';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://192.168.0.101:4000',    
    cache: new InMemoryCache()
  });
//192.168.1.93
//10.22.7.35
  return (
    <ApolloProvider client = {client}>
      <View style={styles.container}>
        <Text style={styles.header}>Findr</Text>
        <Text style={{textAlign: 'center', fontFamily: 'Copperplate'}}>Are we gonna fight or are we gonna make out?</Text>
          <View style={{flexDirection: 'row'}}> 
            <Output/>
            <StatusBar style='auto'/>
            <View style={{justifyContent: 'flex-end', marginRight: 20}}> 
              <AddPerson/> 
            </View>
          </View>
      </View>
    </ApolloProvider>
  );
}
//#d9ecf2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#d9ecf2", 
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width, 
    height: Dimensions.get('screen').height
  },
  header: {
    color: 'black',
    letterSpacing: 1,
    fontSize: 36,
    fontFamily: 'Copperplate', 
    marginTop: 70,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
});
