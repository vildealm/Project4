import React, {  useState } from 'react';
import { StyleSheet, Text,  Dimensions, Modal, View, TouchableHighlight } from 'react-native';
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
              <AddPersonPopUp setModalVisible={setModalVisible}/> 
            </Modal>
            <TouchableHighlight style={styles.openButton}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={styles.textStyle}>+  </Text>
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