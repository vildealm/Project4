import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'; 
import Output from './Output';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://10.22.7.35:4000',    
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client = {client}>
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Text>Are we gonna fight or are we gonna make out?</Text>
        <Output/>
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
