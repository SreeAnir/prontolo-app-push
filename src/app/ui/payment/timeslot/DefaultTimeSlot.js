import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  Platform,
  FlatList,
  TouchableHighlight
} from "react-native";
import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { PaymentView } from "../../../components/Header";
import { paymentTimeSlot, setSlotData } from "../../../components/TimeApi";

const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");

import moment from "moment";

let _this = null;
//Small Grids
export default class DefaultTimeSlot extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <View>
          <PaymentView navigation={navigation} />
        </View>
      )
    };
  };
  constructor(props) {
    super(props);
    let selectedAdd = this.props.navigation.getParam("selectedAdd");
    let dropLocation = this.props.navigation.getParam("dropLocation");
    //checks if dropLocation=1(dropLocation)
    this.state = {
      selectedAdd: selectedAdd,
      dropLocation: dropLocation, //shipping address or drop location,
      timeSlotSelected: 0,
      dateSelected: 0,
      timeslotList: []
    };
  }

  async componentDidMount() {
    _this = this;
    loaderHandler.showLoader(Strings.Processing); //
    await this.loadtimeSlots();
  }
  //api calls timeslots
  async loadtimeSlots() {
    let getDeliveryOptions = await paymentTimeSlot();
    if (getDeliveryOptions != false) {
      let newList = [];
      let newStructure = {
        title: "",
        data: []
      };
      // for (itemSlot of getDeliveryOptions) {
      //   newStructure.title = itemSlot.date;
      //   newStructure.data = itemSlot.timeSlots;

      //   newList.push(newStructure);
      // }
      console.log(newList);
      this.setState({ timeslotList: getDeliveryOptions });
    }
    console.log(this.state.timeslotList);
    loaderHandler.hideLoader(); //
  }
  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  async dateItemClick(fixTs, FixDate) {
    //state set
    loaderHandler.showLoader(Strings.Processing); //
    this.setState({ timeSlotSelected: fixTs });
    this.setState({ dateSelected: FixDate });
    let setDeliveryOptions = await setSlotData(this, fixTs, FixDate);
    if (!setDeliveryOptions) {
      this.props.navigation.goBack();
    } else {
      this.setState({ setDeliveryOptions: setDeliveryOptions });
      if (setDeliveryOptions.state == "delivery_set") {
        this.props.navigation.navigate("PaymentOption", {
          setDeliveryOptions: setDeliveryOptions
        });
      } else {
        this.props.navigation.goBack();
      }
    }
    loaderHandler.hideLoader(); //
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }

  _renderList(itemSel, index) {
    let colDivide=(itemSel.timeSlots).length / 2;
    return (
    <View style={styles.timeSelectOne}>
      <Text style={styles.dateText}>
        {moment(itemSel.date).format("DD MMMM YYYY")}
      </Text>
      <View style={styles.timeSlotItems}>
        <FlatList
          data={itemSel.timeSlots}
          extraData={itemSel.timeSlots}
          keyExtractor={(x, i) => i.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={[
                styles.timeSlotItemOne,
                (colDivide >= 1 ? styles.timeSlotItem2  :  styles.timeSlotItem1)
               
              ]}
            >
              <TouchableHighlight
                style={styles.timeSlotTouchable}
                onPress={() => this.dateItemClick(item, itemSel.date)}
                underlayColor={"#F37756"}
              >
                <Text
                  style={{
                    color: "#bcbcbc",
                    alignSelf: "center"
                  }}
                >
                  {item} 
                </Text>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </View>
  ) };

  render() {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.parentContainer}>
          <BusyIndicator
            size="large"
            color={"#2F7965"}
            textColor={"#e2be5a"}
            overlayColor={"#fff"}
          />
          <ScrollView style={styles.container}>
            <Text style={styles.headerText}>{Strings.time_slot_address}</Text>
            <View style={styles.timeSlotContainer}>
              <FlatList
                data={this.state.timeslotList}
                extraData={this.state}
                keyExtractor={(x, i) => i.toString()}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => this._renderList(item, index)}
                // renderItem={({ item }) => (

                //   <View style={styles.timeSelectOne}>
                //     <Text style={styles.dateText}>
                //       {moment(item.title).format("DD MMMM YYYY")}
                //     </Text>
                //     <View style={styles.timeSlotItems}>
                //       <FlatList
                //         data={item.data}
                //         extraData={item.data}
                //         keyExtractor={(x, i) => i.toString()}
                //         numColumns={2}
                //         showsVerticalScrollIndicator={false}
                //         renderItem={({ item }) => (
                //           <View
                //             style={[
                //               styles.timeSlotItemOne,
                //               item.length == 1
                //                 ? styles.timeSlotItem1
                //                 : styles.timeSlotItem2
                //             ]}
                //           >
                //             <TouchableHighlight
                //               style={styles.timeSlotTouchable}
                //               onPress={() => this.dateItemClick(item, tsDate)}
                //               underlayColor={"#F37756"}
                //             >
                //               <Text
                //                 style={{
                //                   color: "#bcbcbc",
                //                   alignSelf: "center"
                //                 }}
                //               > {item}aa
                //               </Text>
                //             </TouchableHighlight>
                //           </View>
                //         )}
                //       />
                //     </View>
                //   </View>
                // )}
              />
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => this.callPhone()}
          style={styles.buttonContainer}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonTextStyle}>{Strings.home_btn}</Text>
            <Image
              style={styles.chatImageStyle}
              resizeMode={"contain"}
              source={require("../../../../res/images/chat.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
