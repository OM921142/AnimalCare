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

const MeasurementTab = () => {

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

                <View style={style.inputContainer}>
                    <Text style={style.labels}>Weight :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Girth :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Head Length :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Wing Span :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Wing Length :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Tail Length :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Weight Dead :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Others :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.labels}>Observations :</Text>
                    <TextInput style={style.inputstyle} autoCapitalize='none'></TextInput>
                </View>
            </View>
            <View style={[styles.buttonsContainer, style.btnContainer]}>
                    <TouchableOpacity activeOpacity={1}>
                        <Text style={[styles.buttonText, styles.saveBtnText]}>
                            SAVE
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1}>
                        <Text style={[styles.buttonText, styles.exitBtnText]}>
                            EXIT
                        </Text>
                    </TouchableOpacity>
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
    btnContainer:{
        position: "relative",
        top: 140,
        left: 9,
    },
})
export default MeasurementTab;