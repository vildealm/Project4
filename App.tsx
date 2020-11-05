import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'; 
import Output from './components/Output';
import AddPerson from './components/AddPerson';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://10.22.7.35:4000',    
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client = {client}>
      <View style={styles.container}>
        <ScrollView> 
        <Text style={styles.header}>Finder</Text>
        <Text style={{textAlign: 'center', fontFamily: 'Copperplate'}}>Are we gonna fight or are we gonna make out?</Text>
        <Output/>
        <StatusBar style="auto" />
        </ScrollView>
        <AddPerson/> 
        
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d9ecf2',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black', 
    borderBottomWidth: 2, 
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
