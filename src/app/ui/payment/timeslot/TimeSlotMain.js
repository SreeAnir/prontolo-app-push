import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TouchableHighlight
} from "react-native";
import moment from "moment";
import styles from "./Style";
import { EventRegister } from "react-native-event-listeners";
import Strings from "../../../../res/strings/Strings";
import { PaymentView } from "../../../components/Header";
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
import { paymentTimeSlot, setSlotData } from "../../../components/TimeApi";

let _this = null;
//Flatlist
export default class TimeSlotMain extends Component {
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
      timeslots: []
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
    console.log(getDeliveryOptions);
    if (getDeliveryOptions != false) {
      this.setState({ timeslots: getDeliveryOptions });
    }
    loaderHandler.hideLoader(); //
  }
  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }
  _renderList(itemSel, index) {
    let colDivide = itemSel.timeSlots.length / 2;
    return (
      <View style={styles.timeSelectLong}>
        <Text style={styles.dateText}>
          {moment(itemSel.date).format("DD MMMM YYYY")}
        </Text>
        <View style={styles.timeSlotItemSingle}>
          <FlatList
            data={itemSel.timeSlots}
            keyExtractor={(x, i) => i.toString()}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.timeslotBar}>
                <TouchableOpacity
                 onPress={() => this.dateItemClick(item, itemSel.date)}
                  underlayColor={"#F37756"}
                >
                  <Text style={{ color: "#bcbcbc" }}> {item}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
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
                data={this.state.timeslots}
                extraData={this.state}
                keyExtractor={(x, i) => i.toString()}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => this._renderList(item, index)}
                // renderItem={({ item }) => (

                // )}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.footerContainer}>
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
      </View>
    );
  }
}
