import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import { LogoView } from "../../components/Header";
import Strings from "../../../res/strings/Strings";

export default class PaymentSuccess extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <View>
          <LogoView navigation={navigation} />
        </View>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      itemData: this.props.navigation.getParam("itemData"),
      returnData: this.props.navigation.getParam("returnData")
    };
  }
  async componentDidMount() {
    _this = this;
    global.cartCount = 0;
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }
  redirectNow(Page) {
    // EventRegister.emit("navigateOrderHome",Page);
    this.props.navigation.navigate(Page);
    // this.props.navigation.navigate(Page, {
    //   token: "<new token>"
    // })
  }
  render() {
    return (
      <View style={styles.parentContainer}>
        <ScrollView style={styles.parentContainer}>
          <View style={styles.PaymentSuccess}>
            <View style={styles.paymentWrap}>
              <Text style={styles.textSuccessLabel}>
                {Strings.payment_recieved}
              </Text>
            </View>

            <View style={styles.paymentWrap}>
              <Text style={styles.textSuccessLabelLight}>
                {Strings.review_orders}
              </Text>
              <TouchableOpacity
                onPress={() => this.redirectNow("OrderHistory")}
              >
                <Text style={styles.orderLink}>{Strings.orders}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.paymentWrap}>
              <TouchableOpacity onPress={() => this.redirectNow("Home")}>
                <Text style={styles.HomeLink}> {Strings.take_me_home}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
