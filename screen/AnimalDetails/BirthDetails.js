// Created By Om Tripathi
// Created on 5/01/2023
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Colors from "../../config/colors";
import React, { useState } from 'react';
import styles from "../../config/Styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { event } from 'react-native-reanimated';


const BirthDetails = () => {
    const [show, setShow] = useState(false);
   
    const[date, setDate]= useState(new Date())
    const [Age, setAge] = useState('')


    const ShowDatePicker = (type) => {
        setShow(true)
    }

    const handleConfirm = (selectDate) => {
            setDate(selectDate)
            if (selectDate) {
                let birthDate = selectDate
                var today = new Date();
                let value = today.getTime() - birthDate.getTime();
                let age = Math.floor( value/ (1000 * 60 * 60 * 24 * 365.25))
                setAge(age)
            }
        hideDatePicker();
        console.log('dobbbbbb', Age);
    } 

    const hideDatePicker = () => {
        setShow(false)
    }
    return (
        <>
            <View style={styles.mainContainer}>

                <View style={[styles.fieldBox]}>
                    <Text style={styles.labelName}>Date of Birth: </Text>
                    <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }} onPress={() => { ShowDatePicker("dob") }}>
                        <Text style={styles.dateField}>{date.toDateString()}</Text>
                        <AntDesign name="calendar" color={Colors.primary} size={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}> Age :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={110} autoCapitalize='none'>{Age}</TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Birth Type :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={120} autoCapitalize='none'></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Birth Place :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={150} autoCapitalize='none'></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Father :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={110} autoCapitalize='none'></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Mother :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={110} autoCapitalize='none'></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Initial Rearing :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={110} autoCapitalize='none'></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Birth waight :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={110} autoCapitalize='none'></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Marks :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={110} autoCapitalize='none'></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Color :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={110} autoCapitalize='none'></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Status :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={110} autoCapitalize='none'></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Status change date  :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={110} autoCapitalize='none'></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Comment on Status :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={110} autoCapitalize='none'></TextInput>
                </View>

            </View>


            <DateTimePickerModal
                mode={'date'}
                display={Platform.OS == 'ios' ? 'inline' : 'default'}
                isVisible={show}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    )
};
export default BirthDetails;







