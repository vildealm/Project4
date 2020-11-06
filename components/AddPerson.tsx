import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Alert, Modal, View, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import {useForm} from 'react-hook-form'; 
import {AddPersonPopUp} from './AddPersonPopUp'; 



export default function AddPerson() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
              <AddPersonPopUp setModalOpen={setModalVisible}/> 
            </Modal>
            <TouchableHighlight style={styles.openButton}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={styles.textStyle}>+</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    openButton: {
        backgroundColor: "#ff414d",
        borderRadius: 30,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 5,
        shadowOpacity: 0.33,
        shadowRadius: 5,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18, 
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
});


/* <Button title="+"
                buttonStyle={{
                    backgroundColor: '#c2575e',
                    padding: 15, right: 0
                }}
                titleStyle={{ fontFamily: 'Georgia' }}
                style={styles.addPerson}>
            </Button>

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
    },
            */