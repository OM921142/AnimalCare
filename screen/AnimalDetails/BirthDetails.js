// Created By Om Tripathi
// Created on 5/01/2023
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import Colors from "../../config/colors";
import React, { useState, useContext, useEffect } from 'react';
import styles from "../../config/Styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import AppContext from "../../context/AppContext";
import Configs from "../../config/Configs";
import InputDropdown from "../../component/InputDropdown";
import { getCommonNameEnclosures, getCommonNameSections, } from "../../services/APIServices";


const BirthDetails = (props) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date())
    const [Age, setAge] = useState('')
    const [birthDetailType, setBirthDetailType] = useState("");
    const [isbirthDetailTypeMenuOpen, setIsbirthDetailTypeMenuOpen] = useState(false);
    const [father, setFather] = useState([])
    const [mother, setMother] = useState('')
    const [searchFor, setSearchFor] = useState("")
    const [isAnimalSearchModalOpen, setIsAnimalSearchModalOpen] = useState(false)
    const [animalSectionName, setAnimalSectionName] = useState([])
    const [parentEnclosureID, setParentEnclosureID] = useState([])
    const [enclosureIDName, setEnclosureIDName] = useState([])
    const [animalEnclosures, setAnimalEnclosures] = useState([])
    const [isFetchingParent, setIsFetchingParent] = useState(true)
    const [parentAnimals, setParentAnimals] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isAnimalEnclosureMenuOpen, setIsAnimalEnclosureMenuOpen] = useState(false)
    const [isAnimalSectionMenuOpen, setIsAnimalSectionMenuOpen] = useState(false)
    const [englishName] = useState(props.route.params.commonName)
    const [animalSection, setAnimalSection] = useState([])
    const [showTable, setShowTable] = useState(false)

    let context = useContext(AppContext);
    const ShowDatePicker = () => {
        setShow(true)
    }

    const handleConfirm = (selectDate) => {
        setDate(selectDate)
        if (selectDate) {
            let birthDate = selectDate
            var today = new Date();
            let value = today.getTime() - birthDate.getTime();
            let age = Math.floor(value / (1000 * 60 * 60 * 24 * 365.25))
            setAge(age)
        }
        hideDatePicker();

    }

    const hideDatePicker = () => {
        setShow(false)
    }

    const HandleSetBirthDetailsType = (v) => {
        setBirthDetailType(v.value);
        setIsbirthDetailTypeMenuOpen(false);
    }
    const toggleBirthDetailsTypeMenu = () => {
        setIsbirthDetailTypeMenuOpen(!isbirthDetailTypeMenuOpen)
    };
    const toggleAnimalSectionMenu = () => {
        setIsAnimalSectionMenuOpen(!isAnimalSectionMenuOpen)
    }
    const toggleAnimalEnclosureMenu = () => {
        setIsAnimalEnclosureMenuOpen(!isAnimalEnclosureMenuOpen)
    }


    const OpenSearchModal = (searchFor) => {
        setIsAnimalSearchModalOpen(true)
        setSearchFor(searchFor)
        setAnimalSectionName(undefined)
        setAnimalEnclosures([])
        setParentEnclosureID()
        setEnclosureIDName(undefined)
        setIsFetchingParent(true)
        setParentAnimals([])
        setSearchValue('')
    };
    const closeSearchModal = () => {
        setIsAnimalSearchModalOpen(false)
        setSearchFor('')
        setAnimalSectionName(undefined)
        setAnimalEnclosures([])
        setParentEnclosureID(undefined)
        setEnclosureIDName(undefined)
        setIsFetchingParent(true)
        setParentAnimals([])
        setSearchValue('')

    };

    const handleSubmit = () => {
        let value = { enclosure_name: enclosureIDName, section_name: animalSectionName };
        let arr = father;
        arr.push(value);
        setFather(arr)
        closeSearchModal()
        setShowTable(true)
    }

    useEffect(() => {
        getCommonNameSections(englishName).then((response) => {
            let section = response.map((v) => ({ id: v.section_id, name: v.section_name }));
            setAnimalSection(section)
        }).catch((error) => console.log(error));
    }, [])


    const handleAnimalSection = (v) => {
        setAnimalSectionName(v.name)
        getCommonNameEnclosures(englishName, v.id)
            .then((data) => {
                let animalEnclosures = data.map((v, i) => ({
                    id: v.id,
                    name: v.enclosure_id,
                    value: v.id,
                }))
                setParentEnclosureID(animalEnclosures);
            })
            .catch((error) => console.log(error));
    }

    const handelParentEnclosure = (v) => {
        setEnclosureIDName(v.name)
        getCommonNameSections(englishName, v.value).then((response) => {
            console.log(response, "data")
            let inclosurId = response.map((v) => ({ id: v.id, name: v.enclosure_id }));
            setParentEnclosureID(inclosurId)
        }).catch((error) => console.log(error));
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

                <InputDropdown
                    label={"Birth Type:"}
                    isMandatory={true}
                    value={birthDetailType}
                    isOpen={isbirthDetailTypeMenuOpen}
                    items={Configs.BIRTH_TYPE}
                    openAction={toggleBirthDetailsTypeMenu}
                    closeAction={toggleBirthDetailsTypeMenu}
                    setValue={HandleSetBirthDetailsType}
                    labelStyle={styles.labelName}
                    textFieldStyle={[styles.textfield, birthDetailType ? styles.width50 : null,]}
                    style={[
                        styles.fieldBox,
                        // this.state.isSourceValidationFailed
                        //     ? styles.errorFieldBox
                        //     : null,
                    ]}
                />
                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Birth Place :</Text>
                    <TextInput style={styles.inputstyle} paddingHorizontal={150} autoCapitalize='none'></TextInput>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.fieldBox}
                    onPress={() => OpenSearchModal("father")}>
                    <Text style={styles.labelName}>Father:</Text>
                    <TextInput
                        editable={false}
                        // value={father}
                        onChangeText={(father) => setFather({ father })}
                        style={[styles.textfield, { width: '50%' }]}
                        autoCompleteType="off"
                    />

                    {showTable == true ? (
                        <DataTable style={style.Table_container}>
                            <DataTable.Header style={styles.tableHeader}>
                                <DataTable.Title>Animal Section name</DataTable.Title>
                                <DataTable.Title>Enclosure Name</DataTable.Title>
                                <DataTable.Title>Age</DataTable.Title>
                            </DataTable.Header>
                            {father?.map((data, index) => {
                                console.log('map dats', data)
                                return (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{data.enclosure_name}</DataTable.Cell>
                                        <DataTable.Cell>{data.section_name}</DataTable.Cell>
                                        <DataTable.Cell></DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })}
                        </DataTable>
                    ) : null}
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.fieldBox}
                    onPress={() => OpenSearchModal("mother")}
                >
                    <Text style={styles.labelName}>Mother:</Text>
                    <TextInput
                        editable={false}
                        value={mother}
                        onChangeText={(mother) => setMother({ mother })}
                        style={[styles.textfield, { width: '50%' }]}
                        autoCompleteType="off"
                    />
                </TouchableOpacity>

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

            {/*Search Modal for Father and Mother*/}


            <Modal
                animationType="fade"
                transparent={true}
                visible={isAnimalSearchModalOpen}
            >
                <View style={styles.searchModalOverlay}>
                    <View style={styles.seacrhModalContainer}>
                        <View style={styles.searchModalHeader}>

                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.headerBackBtnContainer}
                                onPress={closeSearchModal}
                            >
                                <Ionicons name="arrow-back" size={25} color={Colors.white} />
                            </TouchableOpacity>
                            <View style={styles.headerTitleContainer}>
                                <Text
                                    style={{
                                        fontSize: Colors.headerSize,
                                        color: Colors.white,
                                    }}
                                >
                                    {searchFor === "father"
                                        ? "Select Father"
                                        : "Select Mother"}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.searchModalBody}>
                            <View
                                style={styles.formBorder}
                            >
                                <InputDropdown
                                    label={"Select Section:"}
                                    value={animalSectionName}
                                    isOpen={isAnimalSectionMenuOpen}
                                    items={animalSection}
                                    openAction={toggleAnimalSectionMenu}
                                    closeAction={toggleAnimalSectionMenu}
                                    setValue={handleAnimalSection}
                                    labelStyle={styles.labelName}
                                    textFieldStyle={[styles.textfield, animalSectionName ? [styles.width50, { paddingLeft: 0 }] : null,]}
                                    style={[styles.fieldBox]}
                                />


                                <InputDropdown
                                    label={"Enclosure ID:"}
                                    value={enclosureIDName}
                                    isOpen={isAnimalEnclosureMenuOpen}
                                    items={parentEnclosureID}
                                    openAction={toggleAnimalEnclosureMenu}
                                    closeAction={toggleAnimalEnclosureMenu}
                                    setValue={handelParentEnclosure}
                                    labelStyle={styles.labelName}
                                    textFieldStyle={[styles.textfield, enclosureIDName ? [styles.width50, { paddingLeft: 0 }] : null,]}
                                    style={[styles.fieldBox, { borderBottomWidth: 0 }]}
                                />

                                {typeof enclosureIDName !== "undefined" ? (
                                    <View style={[styles.fieldBox, {
                                        borderRadius: 3,
                                        borderColor: "#ddd",
                                        borderTopWidth: 1, borderBottomWidth: 0
                                    }]}>
                                        <TextInput
                                            autoCompleteType="off"
                                            autoCapitalize="none"
                                            placeholder={"Type Animal Code"}
                                            value={searchValue}
                                            style={[
                                                styles.textfield,]}
                                            onChangeText={(searchValue) =>
                                                setSearchValue(searchValue)
                                            }
                                        />
                                    </View>
                                ) : null}

                                {isFetchingParent ? null : (
                                    <FlatList
                                        contentContainerStyle={{ flex: 1 }}
                                        data={getParentAnimalsData()}
                                        keyExtractor={(item, index) => item.id.toString()}
                                        renderItem={() => renderSearchItem}
                                        initialNumToRender={parentAnimals.length}
                                        ListEmptyComponent={() => (
                                            <Text style={styles.searchingText}>No Result Found</Text>
                                        )}
                                    />
                                )}

                            </View>
                        </View>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity activeOpacity={1} onPress={handleSubmit}>
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
                    </View>
                </View>
            </Modal>
        </>
    )
};

export default BirthDetails;

const style = StyleSheet.create({
    Table_container: {
        padding: 0,
        position: "relative",
        left: -150,

    },
    tableHeader: {
        backgroundColor: '#DCDCDC',

    },
});





