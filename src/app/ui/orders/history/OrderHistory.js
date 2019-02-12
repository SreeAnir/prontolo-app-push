import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Platform,
  ScrollView,
  FlatList
} from "react-native";
import { ApiCall } from "../../../network/RestApi";
import moment from "moment";

import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";

const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");

export default class OrderHistory extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <View>
          <LogoHeader navigation={navigation} />
        </View>
      )
    };
  };

  constructor() {
    super();
    this.state = {
      orderList: -1
    };
  }
  async _selectOrder(orderItem) {
    this.props.navigation.navigate("OrderDetails", {
      orderItem: orderItem
    });
  }
  async componentDidMount() {
    _this = this;
    loaderHandler.showLoader(Strings.fetching_orders);
    await this.loadOrderHistory();
  }
  async loadOrderHistory() {
    queryString = ` query {
      listOrdersHistory {
        id
        date
        paymentMethod
        state
        totalAmount
      }
    } `;

    ApiCall(queryString, null).then(data => {
      console.log("listOrdersHistory");
      console.log(data);
      loaderHandler.hideLoader();
      if (data.status) {
        let listOrdersHistory = data.response.listOrdersHistory;
        this.setState({ orderList: listOrdersHistory });
      }else{
        this.setState({ orderList: [] });
      }
    });
  }
  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }

  render() {
    if (this.state.orderList == -1) {
      return (
        <View style={styles.parentContainer}>
          <ScrollView style={styles.parentContainer}>
            <View>
              <Text style={styles.headerText}>{Strings.ORDERS_HISTORY}</Text>
            </View>
            <View>
              <Text style={styles.headerText}>{Strings.Processing}</Text>
            </View>
          </ScrollView>
        </View>
      );
    }else{
      if( (this.state.orderList.length ==0)){
        return (
          <View style={styles.parentContainer}>
            <ScrollView style={styles.parentContainer}>
              <View>
                <Text style={styles.headerText}>{Strings.ORDERS_HISTORY}</Text>
              </View>
              <View>
                <Text style={styles.headerText}>{Strings.no_orders_yet}</Text>
              </View>
            </ScrollView>
          </View>
        );
      }
    }

    let listItem = this.state.orderList;
    return (
      <View style={styles.parentContainer}>
        <ScrollView style={styles.parentContainer}>
          <View>
            <Text style={styles.headerText}>{Strings.ORDERS_HISTORY}</Text>
            <View style={styles.profileDetailWrapper}>
              <View style={styles.profileRow}>
                <View style={styles.textInpuWrapper}>
                  <View style={styles.container}>
                    <View style={styles.flatListContainer}>
                      <FlatList
                        data={listItem}
                        extraData={this.state}
                        keyExtractor={(x, i) => i.toString()}
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                          <View style={styles.lineSeparator}>
                            <View style={styles.cartItemParentContainer}>
                              <View style={styles.itemContainer}>
                                <Image
                                  style={styles.orders_icon}
                                  resizeMode={"contain"}
                                  source={require("../../../../res/images/green_order.png")}
                                />
                                <TouchableOpacity
                                  onPress={() => this._selectOrder(item)}
                                >
                                  <View style={styles.textContainer}>
                                    <Text style={styles.itemNameStyle}>
                                      {moment(item.date).format(
                                        "DD/MM/YYYY"
                                      )}{" "}
                                      {Strings.Delivered_to_customer}
                                    </Text>
                                    <Text style={styles.itemNameStyle}>
                                      {item.paymentMethod}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                              <View style={styles.itemPriceCol}>
                                <Text style={styles.itemPriceStyle}>
                                  {item.totalAmount}€
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                      />
                    </View>
                  </View>

                  <View />
                </View>
              </View>
            </View>
            <View />
          </View>
        </ScrollView>
        <BusyIndicator
          size="large"
          color={"#2F7965"}
          textColor={"#e2be5a"}
          overlayColor={"#fff"}
        />
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
