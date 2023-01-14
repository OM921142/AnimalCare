// Created By Om Tripathi
// Created on 14/01/2023

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import Colors from "../../config/colors";
import styles from "../../config/Styles";
import { DatePicker, InputDropdown } from "../../component";
import { Picker } from 'native-base';
import { Configs } from '../../config';
import { Header, } from "../../component";

const MeasurementsComponent = () => {
    const [UOM, setUOM] = useState("")
    const [isUOMTypeMenuOpen, setIsUOMTypeMenuOpen] = useState(false)


    const HandleSetUOMType = (v) => {
        setUOM(v.name);
        setIsUOMTypeMenuOpen(false);
    }
    const toggleUOMTypeMenu = () => {
        setIsUOMTypeMenuOpen(!isUOMTypeMenuOpen)
    };

    return (
        <>
            <View>
                <Header title={"Measurement"} />
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Measure Name  :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <InputDropdown
                    label={"UOM :"}
                    value={UOM}
                    isOpen={isUOMTypeMenuOpen}
                    items={Configs.Measurements}
                    openAction={toggleUOMTypeMenu}
                    closeAction={toggleUOMTypeMenu}
                    setValue={HandleSetUOMType}
                    labelStyle={styles.labelName}
                    textFieldStyle={[styles.textfield, UOM ? [styles.width50, { paddingLeft: 0 }] : null,]}
                    style={[styles.fieldBox]}
                />
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Matric System :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Mathod  :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Acceptable Highest :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Acceptable Lowest  :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Target Lowest Value   :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Comments  :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Alert Signifficant Change:</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
            </View>
        </>
    )
};
const style = StyleSheet.create({
    mainContainer: {
        position: "relative",
        bottom: 9,
        left: 0,
        width: "auto",
        marginVertical: 10,
        borderColor: "black",
        alignItems: "baseline",
    },
    inputContainer: {
        width: "100%",
    },
    labels: {
        position: "absolute",
        top: 9,
        left: 10,
        fontSize: Colors.lableSize,
    },
    inputstyle: {
        position: "relative",
        top: -1,
        left: 0,
        padding: 7,
        paddingLeft: 182,
      
        width: "100%",
        borderWidth: 0.8,
        borderColor: "#ddd",
    },
})
export default MeasurementsComponent;