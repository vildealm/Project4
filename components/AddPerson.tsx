import React, {  useState } from 'react';
import { StyleSheet, Text,  Dimensions, Modal, View, TouchableHighlight, Platform } from 'react-native';
import {AddPersonPopUp} from './AddPersonPopUp'; 

export default function AddPerson() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={{flex:1}}
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
        marginRight: 20,
        marginBottom: 45,
        backgroundColor: 'cyan',
        borderRadius: 18,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 5,
        shadowOpacity: 0.33,
        shadowRadius: 5,

        ...Platform.select({
            ios: {
                paddingLeft:10
            },
            android: {
                padding: 5,
                paddingLeft: 15
            },
    })
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 24, 
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
});