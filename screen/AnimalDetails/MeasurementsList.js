// Created By Om Tripathi
// Created on 14/01/2023  

import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from "react-native";
import { Header, } from "../../component";
import { Container } from "native-base";


export default class MeasurementsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            factors: [],
        };
    }

    //   componentDidMount() {
    //     this.focusListener = this.props.navigation.addListener(
    //       "focus",
    //       this.onScreenFocus
    //     );
    //   }

    //   onScreenFocus = () => {
    //     this.setState(
    //       {
    //         isLoading: true,
    //         factors: [],
    //       },
    //       () => {
    //         this.loadFeedingFactors();
    //       }
    //     );
    //   };

    //   componentWillUnmount = () => {
    //     this.focusListener();
    //   };

    //   loadFeedingFactors = () => {
    //     this.setState(
    //       {
    //         isLoading: true,
    //       },
    //       () => {
    //         get_feed_factor()
    //           .then((data) => {
    //             this.setState({
    //               isLoading: false,
    //               factors: data.data
    //             });
    //           })
    //           .catch((error) => console.log(error));
    //       }
    //     );
    //   };

    gotoAddFeedingFactors = () => {
        this.props.navigation.navigate("MeasurementsComponent");

    };

    //   gotoEdit = (item) =>
    //     this.props.navigation.navigate("AddFeedingFactors", {
    //       item: item,
    //     });

    //   renderItem = ({ item }) => (
    //     <TouchableOpacity
    //         style={[globalStyles.fieldBox,globalStyles.justifyContentSpaceBetween]}
    //         activeOpacity={1}
    //         onPress={this.gotoEdit.bind(this, item)}
    //       >
    //         <View>
    //           <Text style={[globalStyles.labelName, globalStyles.pd0, globalStyles.p5 , Styles.fW ]}>
    //             Sl. No.  :  {item.id}
    //           </Text>

    //           <Text style={[globalStyles.labelName, globalStyles.pd0, globalStyles.p5, Styles.fW]}>
    //            Factor Name :  {item.factor_name}
    //           </Text>

    //           <Text style={[globalStyles.textfield, globalStyles.pd0, globalStyles.p5]}>
    //            Details :  {item.details}
    //           </Text>
    //         </View>
    //       </TouchableOpacity>
    //   );

    render = () => (
        <Container>
            <Header title={"Measurements List"} addAction={this.gotoAddFeedingFactors} />
            {/* <View style={globalStyles.container}>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <FlatList
            ListEmptyComponent={() => <ListEmpty />}
            data={this.state.factors}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={this.renderItem}
            initialNumToRender={this.state.factors.length}
            refreshing={this.state.isLoading}
            onRefresh={this.loadFeedingFactors}
            contentContainerStyle={
              this.state.factors.length === 0 ? globalStyles.container : null
            }
          />
        )}
      </View> */}
        </Container>
    );
}
