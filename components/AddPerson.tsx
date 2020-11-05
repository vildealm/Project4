import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';

const AddPerson = () => {
    return (
        <View> 
            <Button title="+" buttonStyle={{backgroundColor: '#c2575e', padding: 15, right: 0}} titleStyle={{fontFamily:'Georgia'}} style={styles.addPerson}> </Button>
        </View>
    )
}

export default AddPerson; 

const styles = StyleSheet.create({
    addPerson: {
        margin: 5,
        fontSize: 20,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
    elevation: 5, 
    shadowOpacity: 0.33,
    shadowRadius: 5,
  
}
});