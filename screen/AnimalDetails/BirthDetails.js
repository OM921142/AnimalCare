// Created By Om Tripathi
// Created on 5/01/2023
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Dimensions,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment';


const BirthDetails = (props) => {
    const [show, setShow] = useState(false);
    const [showIput, setShowIput] = useState(false);
    const [statusShow, setStatusShow] = useState(false);
    const [date, setDate] = useState(new Date())
    const [NewDate, setNewDate] = useState('')
    const [statusDate, setStatusDate] = useState(new Date())
    const [Age, setAge] = useState('')
    const [birthDetailType, setBirthDetailType] = useState("");
    const [initialRearing, setInitialRearing] = useState("");
    const [isbirthDetailTypeMenuOpen, setIsbirthDetailTypeMenuOpen] = useState(false);
    const [father, setFather] = useState([])
    const [mother, setMother] = useState('')
    const [searchFor, setSearchFor] = useState("")
    const [isAnimalSearchModalOpen, setIsAnimalSearchModalOpen] = useState(false)
    const [animalSectionName, setAnimalSectionName] = useState([])
    const [parentEnclosureID, setParentEnclosureID] = useState([])
    const [enclosureIDName, setEnclosureIDName] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isAnimalEnclosureMenuOpen, setIsAnimalEnclosureMenuOpen] = useState(false)
    const [isinitialRearingMenuOpen, setIsinitialRearingMenuOpen] = useState(false)
    const [isAnimalSectionMenuOpen, setIsAnimalSectionMenuOpen] = useState(false)
    const [englishName] = useState(props.route.params.commonName)
    const [animalSection, setAnimalSection] = useState([])
    const [showTable, setShowTable] = useState(false)
    const [showTableMother, setShowTableMother] = useState(false)
    const [animal_status, setAnimalStatus] = useState(false)
    const [year, setYears] = useState(false)
    const [month, setMonth] = useState(false)
    const [week, setWeek] = useState(false)
    const [day, setDay] = useState(false)
    const [isAnimalStatusMenuOpen, setIsAnimalStatusMenuOpen] = useState(false)

    let context = useContext(AppContext);
    const ShowDatePicker = () => {
        setShow(true)
    }
    const StatusChangeDtae = () => {
        setStatusShow(true)
    }
    const handelAnimalStatus = (v) => {
        setAnimalStatus(v.value)
        setIsAnimalStatusMenuOpen(false)
    };

    const toggleAnimalStatusMenu = () => {
        setIsAnimalStatusMenuOpen(!isAnimalStatusMenuOpen,)
    };


    const handleConfirmYears = () => {
        setYears(true)
        setMonth(false)
        setWeek(false)
        setDay(false)
        let startdate = moment();
        startdate = startdate.subtract(NewDate, "years");
        setDate(startdate)
    }

    const handleConfirmMonths = () => {
        setMonth(true)
        setYears(false)
        setWeek(false)
        setDay(false)
        let startdate = moment();
        startdate = startdate.subtract(NewDate, "months");
        setDate(startdate)
    }

    const handleConfirmWeeks = () => {
        setMonth(false)
        setYears(false)
        setWeek(true)
        setDay(false)
        setShowIput(true , "weeks")
        let startdate = moment();
        startdate = startdate.subtract(NewDate, "weeks");
        setDate(startdate)
    }

    const handleConfirmDays = () => {
        setMonth(false)
        setYears(false)
        setWeek(false)
        setDay(true)
        setShowIput(true, "days")
        let startdate = moment();
        startdate = startdate.subtract(NewDate, "days");
         setDate(startdate)
    }

    const getAge = (selectDate) => {
        setDate(selectDate)
        let today = new Date();
        let DOB = new Date(selectDate);
        let totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
        totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
        let years = today.getFullYear() - DOB.getFullYear();
        if (DOB.getMonth() > today.getMonth())
            years = years - 1;
        else if (DOB.getMonth() === today.getMonth())
            if (DOB.getDate() > today.getDate())
                years = years - 1;

        let days;
        let months;

        if (DOB.getDate() > today.getDate()) {
            months = (totalMonths % 12);
            if (months == 0)
                months = 11;
            let x = today.getMonth();
            switch (x) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12: {
                    let a = DOB.getDate() - today.getDate();
                    days = 31 - a;
                    break;
                }
                default: {
                    let a = DOB.getDate() - today.getDate();
                    days = 30 - a;
                    break;
                }
            }

        }
        else {
            days = today.getDate() - DOB.getDate();
            if (DOB.getMonth() === today.getMonth())
                months = (totalMonths % 12);
            else
                months = (totalMonths % 12) + 1;
        }
        hideDatePicker()
        let Days = (years * 365) + (months * 30) + days
        setAge(Days)
        hideDatePicker();
        setMonth(false)
        setYears(false)
        setWeek(false)
        setDay(true)
    }


    const handleConfirmDate = (selectStatusDate) => {
        setStatusDate(selectStatusDate)
        hideDatePicker();


    }

    const hideDatePicker = () => {
        setShow(false)
        setStatusShow(false)
    }

    const HandleSetBirthDetailsType = (v) => {
        setBirthDetailType(v.value);

        setIsbirthDetailTypeMenuOpen(false);
    }
    const HandleInitialRearning = (v) => {

        setInitialRearing(v.value)
        setIsinitialRearingMenuOpen(false);
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
    const toggeInitialRearingMenu = () => {
        setIsinitialRearingMenuOpen(!isinitialRearingMenuOpen)
    }


    const OpenSearchModal = (searchFor) => {
        setIsAnimalSearchModalOpen(true)
        setSearchFor(searchFor)
        setAnimalSectionName(undefined)
        setParentEnclosureID()
        setEnclosureIDName(undefined)
        setSearchValue('')
    };
    const closeSearchModal = () => {
        setIsAnimalSearchModalOpen(false)
        setSearchFor('')
        setAnimalSectionName(undefined)
        setParentEnclosureID(undefined)
        setEnclosureIDName(undefined)
        setSearchValue('')

    };

    const handleSubmit = () => {
        let value = { enclosure_name: enclosureIDName, section_name: animalSectionName, search_value: searchValue };
        let arr = father;
        arr.push(value);
        setFather(arr)
        closeSearchModal()
        setShowTable(true)
    }
    const handelMotherSection = () => {
        let value2 = { enclosure_name: enclosureIDName, section_name: animalSectionName, search_value: searchValue };
        setMother(value2)
        closeSearchModal()
        setShowTableMother(true)
    }

    useEffect(() => {
        getCommonNameSections(englishName).then((response) => {
            let section = response.map((v) => ({ id: v.section_id, name: v.section_name }));
            setAnimalSection(section)
        }).catch((error) => console.log(error));
    }, [])


    const handleAnimalSection = (v) => {
        setAnimalSectionName(v.name)
        setIsAnimalSectionMenuOpen(false)
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
        setIsAnimalEnclosureMenuOpen(false)
        getCommonNameSections(englishName, v.value).then((response) => {
            let inclosurId = response.map((v) => ({ id: v.id, name: v.enclosure_id }));
            setParentEnclosureID(inclosurId)
        }).catch((error) => console.log(error));
    }


    return (
        <>
            <KeyboardAwareScrollView extraHeight={"auto"}>
                <View style={styles.mainContainer}>

                    <View style={[styles.fieldBox]}>
                        <Text style={styles.labelName}>Date of Birth: </Text>
                        <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }} onPress={() => { ShowDatePicker("dob") }}>
                        <Text style={styles.dateField}>{moment(date).format("ddd DD-MMM-YYYY")}</Text>
                            <AntDesign name="calendar" color={Colors.primary} size={20} />
                        </TouchableOpacity>
                    </View>
                    <Text style={style.ageTextBox}>Age</Text>
                    <View style={style.agebox}>
                        <TextInput style={style.AgeInput} autoCapitalize='none' onChangeText={(text) => setNewDate(text)} keyboardType={'numeric'}>
                            {Age}
                        </TextInput>
                        <TouchableOpacity>
                            <Text style={[style.year ,  year == true ? style.DateColor : ""]} onPress={() => { handleConfirmYears("years") }}>Years</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={[style.month ,  month == true ? style.DateColor : ""]} onPress={() => { handleConfirmMonths("months") }}>Months</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={[style.weeks,    week == true ? style.DateColor : ""]} onPress={() => { handleConfirmWeeks("weeks") }}>Weeks</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={[style.days  ,  day == true ? style.DateColor : ""]} onPress={() => { handleConfirmDays("days") }}>Days</Text>
                        </TouchableOpacity>
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
                            style.fieldBox,
                            // this.state.isSourceValidationFailed
                            //     ? styles.errorFieldBox
                            //     : null,
                        ]}
                    />
                    <View style={styles.inputContainer}>
                        <Text style={styles.labels}>Birth Place :</Text>
                        <TextInput style={styles.inputstyle} autoCapitalize='none'></TextInput>
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.fieldBox}
                        onPress={() => OpenSearchModal("father")}>
                        <Text style={styles.labelName}>Father :</Text>
                        <TextInput
                            editable={false}
                            // value={father}
                            onChangeText={(father) => setFather({ father })}
                            style={[styles.textfield, { width: '50%' }]}
                            autoCompleteType="off"
                        />
                        <Ionicons name="add" size={26} color="black" style={style.ionicons} />
                    </TouchableOpacity>

                    {showTable == true ? (
                        <DataTable style={style.Table_container}>
                            <DataTable.Header style={styles.tableHeader}>
                                <DataTable.Title>Animal Section name</DataTable.Title>
                                <DataTable.Title>Enclosure Name</DataTable.Title>
                                <DataTable.Title>Animal Code</DataTable.Title>
                            </DataTable.Header>
                            {father?.map((data, index) => {
                                return (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{data.section_name}</DataTable.Cell>
                                        <DataTable.Cell>{data.enclosure_name}</DataTable.Cell>
                                        <DataTable.Cell>{data.search_value}</DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })}
                        </DataTable>
                    ) : null}

                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.fieldBox}
                        onPress={() => OpenSearchModal("mother")}
                    >
                        <Text style={styles.labelName}>Mother:</Text>
                        <TextInput
                            editable={false}
                            // value={mother}
                            onChangeText={(mother) => setMother({ mother })}
                            style={[styles.textfield, { width: '50%' }]}
                            autoCompleteType="off"
                        />

                    </TouchableOpacity>
                    {showTableMother == true ? (
                        <DataTable style={style.Table_container}>
                            <DataTable.Header style={styles.tableHeader}>
                                <DataTable.Title>Animal Section name</DataTable.Title>
                                <DataTable.Title>Enclosure Name</DataTable.Title>
                                <DataTable.Title>Animal Code</DataTable.Title>
                            </DataTable.Header>

                            <DataTable.Row>
                                <DataTable.Cell>{mother.section_name}</DataTable.Cell>
                                <DataTable.Cell>{mother.enclosure_name}</DataTable.Cell>
                                <DataTable.Cell>{mother.search_value}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    ) : null}


                    <InputDropdown
                        label={"Initial Rearing:"}
                        isMandatory={true}
                        value={initialRearing}
                        isOpen={isinitialRearingMenuOpen}
                        items={Configs.INITIAL_REARING}
                        openAction={toggeInitialRearingMenu}
                        closeAction={toggeInitialRearingMenu}
                        setValue={HandleInitialRearning}
                        labelStyle={styles.labelName}
                        textFieldStyle={[styles.textfield, initialRearing ? styles.width50 : null,]}
                        style={[
                            styles.fieldBox,
                            // this.state.isSourceValidationFailed
                            //     ? styles.errorFieldBox
                            //     : null,
                        ]}
                    />
                    <View style={styles.inputContainer}>
                        <Text style={styles.labels}>Birth weight :</Text>
                        <TextInput style={styles.inputstyle} autoCapitalize='none' keyboardType={'numeric'}></TextInput>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.labels}>Marks :</Text>
                        <TextInput style={styles.inputstyle} autoCapitalize='none'></TextInput>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.labels}>Color :</Text>
                        <TextInput style={styles.inputstyle} autoCapitalize='none'></TextInput>
                    </View>

                    <InputDropdown
                        label={" Status:"}
                        isMandatory={false}
                        value={animal_status}
                        isOpen={isAnimalStatusMenuOpen}
                        items={Configs.ANIMAL_STATUS}
                        openAction={toggleAnimalStatusMenu}
                        closeAction={toggleAnimalStatusMenu}
                        setValue={handelAnimalStatus}
                        labelStyle={styles.labelName}
                        textFieldStyle={[styles.textfield, animal_status ? [styles.width50, { paddingLeft: 0 }] : null,]}
                        style={[styles.fieldBox, { borderBottomWidth: 1 }]}
                    />

                    <View style={[styles.fieldBox,]}>
                        <Text style={styles.labelName}>Status change date: </Text>
                        <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }} onPress={() => { StatusChangeDtae("dob") }}>
                            <Text style={styles.dateField}>{statusDate.toDateString()}</Text>
                            <AntDesign name="calendar" color={Colors.primary} size={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.labels}>Comment on Status :</Text>
                        <TextInput style={styles.inputstyle} autoCapitalize='none'></TextInput>
                    </View>
                </View>
                <View style={style.btnContainer}>
                    <TouchableOpacity activeOpacity={1} onPress={handleSubmit}>
                        <Text style={[styles.buttonText, styles.saveBtnText]}>
                            SAVE
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={closeSearchModal}>
                        <Text style={[styles.buttonText, styles.exitBtnText]}>
                            EXIT
                        </Text>
                    </TouchableOpacity>
                </View>

                </KeyboardAwareScrollView>

                <DateTimePickerModal
                    mode={'date'}
                    display={Platform.OS == 'ios' ? 'inline' : 'default'}
                    isVisible={show}
                    onConfirm={getAge}
                    onCancel={hideDatePicker}
                />

                <DateTimePickerModal
                    mode={'date'}
                    display={Platform.OS == 'ios' ? 'inline' : 'default'}
                    isVisible={statusShow}
                    onConfirm={handleConfirmDate}
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

                                </View>
                            </View>
                            {searchFor === "father" ?
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity activeOpacity={1} onPress={handleSubmit}>
                                        <Text style={[styles.buttonText, styles.saveBtnText]}>
                                            SAVE
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={1} onPress={closeSearchModal}>
                                        <Text style={[styles.buttonText, styles.exitBtnText]}>
                                            EXIT
                                        </Text>
                                    </TouchableOpacity>
                                </View> : <View style={styles.buttonsContainer}>
                                    <TouchableOpacity activeOpacity={1} onPress={handelMotherSection}>
                                        <Text style={[styles.buttonText, styles.saveBtnText]}>
                                            SAVE
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={1} onPress={closeSearchModal}>
                                        <Text style={[styles.buttonText, styles.exitBtnText]}>
                                            EXIT
                                        </Text>
                                    </TouchableOpacity>
                                </View>}
                        </View>
                    </View>
                </Modal>

           
        </>
    )
};

export default BirthDetails;

const style = StyleSheet.create({
    Table_container: {
        height: "auto",
        width: "100%",
        position: "relative",
        left: 5,
        bottom: 1,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
    ionicons: {
        position: "relative",
        top: 2,
        right: 1,
    },
    AgeInput: {
        borderWidth: 0.9,
        borderColor: "#ddd",
        padding: 8,
        marginLeft:10,
        width:50,
        height:38,
    },
    agelabel: {
        borderWidth: 10,
        position: "relative",
        top: 0,
        left: 50,

    },
    agebox: {
         alignItems:"center",
        flexDirection:"row",
        borderwitdh:10,
        borderColor:"black",
        justifyContent:"space-between",
        maxWidth: "60%",
        height: "10%",
        
    },
    year: {
        borderWidth: 0.9,
        borderColor: "#ddd",
        padding: 8,
        marginLeft:10,
    },
    month: {
        borderWidth: 0.9,
        borderColor: "#ddd",
        padding:8,
        marginLeft:20,
    },
    weeks: {
        marginLeft:20,
        borderWidth: 0.9,
        borderColor: "#ddd",
        padding:8,
        
    },
    days: {
        borderWidth: 0.9,
        borderColor: "#ddd",
        maxWidth: "89%",
        marginLeft:20,
        padding:8,
    },
    fieldBox: {
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
        flexDirection: "row",
        padding: 5,
        borderRadius: 3,
        borderColor: "#ddd",
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        height: "auto",
        justifyContent: "space-between",
        borderTopWidth: 1,
        // marginLeft:20,
    },
    ageTextBox: {
        top: 15,
        left: 8,
        marginRight:10,
    },
    daysColor: {
        color: "green"
    },
    DateColor: {
        color: "green",
        backgroundColor:"#ddd"
    },
    btnContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical:"30%",
        marginTop:15,
    }
});





