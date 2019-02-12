import React, { Component } from "react";
import { AsyncStorage } from "react-native";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import moment from "moment";
import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import Strings from "../../../res/strings/Strings";
import { PaymentView } from "../../components/Header";
import { ApiCall } from "../../network/RestApi";
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
import { OkAlert } from "../../util/OKAlert/OKAlert";
import { walletPay } from "../../components/PaymentProcess";

export default class OrderDetails extends Component {
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
    this.state = {
      itemData: this.props.navigation.getParam("itemData"),
      returnData: this.props.navigation.getParam("returnData"),
      paymentUrl: this.props.navigation.getParam("paymentUrl"),
      username: ""
    };
  }

  _selectProduct(item) {
    item.id = item.productId;
    this.props.navigation.navigate("ViewProduct", {
      itemDetails: item
    });
  }

  async componentDidMount() {
    _this = this;
    loaderHandler.showLoader(Strings.payment_process); //
    // await this._loadAddress();
    setTimeout(function() {
      loaderHandler.hideLoader();
    }, 50);
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }
  async _confirmPay() {
    loaderHandler.showLoader(Strings.payment_process);
    let paymentStatus = false;
    let pay_item = this.props.navigation.getParam("itemData");
    if (pay_item.method.toLowerCase() == "wallet") {
      paymentStatus = await walletPay(pay_item, setPaymentMethod);
      console.log("paymentStatus", paymentStatus);
      if (!paymentStatus) {
        Alert.alert(
          Strings.failWalltetPay,
          "",
          [
            {
              text: "Back",
              onPress: () => {
                this.props.navigation.goBack();
              }
            },
            {
              text: "Home",
              onPress: () => {
                this.props.navigation.navigate("Home", {
                  token: "<new token>"
                });
              }
            }
          ],
          { cancelable: false }
        );
        loaderHandler.hideLoader();
      } else {
        loaderHandler.hideLoader();
        this._successPayment();
      }
    }
    if (pay_item.url != "") {
      loaderHandler.hideLoader();
      this.props.navigation.navigate("bankView", {
        itemData: this.state.itemData,
        returnData: this.state.returnData,
        paymentUrl: this.state.paymentUrl
      });
    }
  }
  async _successPayment() {
    global.cartCount = 0;
    await AsyncStorage.removeItem("cartProducts");
    await AsyncStorage.removeItem("customerOrder");
    this.props.navigation.navigate("PaymentSuccess", {
      itemData: this.state.itemData,
      returnData: this.state.returnData
    });
  }
  _loadAddress() {
    const queryString = `query {
      profile {
      familyName,
      firstName,
      shippingAddresses{
        id,
        cap,
      citofono,
      civico,
      comune,
      interno,
      piano,
      predefinito,
      provincia,
      scala,
      stato,
      viaPiazza
      }
      }   
      }`;

    let returnData = ApiCall(queryString, null).then(data => {
      if (data.status == 1) {
        ProfileData = data.response.profile;
        this.setState({
          username: ProfileData.firstName + " " + ProfileData.familyName
        });
      }
    });
  }
  render() {
    let returnData = this.state.returnData;
    let listItem = returnData.customerOrderRows;
    let addressData = returnData.address;
    return (
      <View style={styles.parentContainer}>
        <ScrollView style={styles.parentContainer}>
          <View style={styles.container}>
            <View style={styles.profileDetailWrapper}>
              <View style={styles.profileRow}>
                <Text style={[styles.textLabel, styles.textBold]}>
                  {Strings.DELIVERY_ADD}
                </Text>
                <View style={styles.textInpuWrapper}>
                  <Image
                    style={styles.profile_icon}
                    resizeMode={"contain"}
                    source={require("../../../res/images/location.png")}
                  />
                  <View />
                  <View>
                    <Text style={[styles.textLabel, styles.textLight]}>
                      {addressData}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}>
                <Text style={[styles.textLabel, styles.textBold]}>
                  {Strings.TIMESLOT}
                </Text>
                <View style={styles.textInpuWrapper}>
                  <Image
                    style={styles.profile_icon}
                    resizeMode={"contain"}
                    source={require("../../../res/images/time_slot.png")}
                  />
                  <View />
                  <View>
                    <Text style={[styles.textLabel, styles.textBold]}>
                      {moment(returnData.deliveryDate).format("DD/MM/YYYY")}{" "}
                      {returnData.deliveryTimeSlot}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}>
                <Text style={[styles.textLabel, styles.textBold]}>
                  {Strings.PAYMENT_METHOD}
                </Text>
                <View style={styles.textInpuWrapper}>
                  <Image
                    style={styles.profile_icon}
                    resizeMode={"contain"}
                    source={require("../../../res/images/profile_payment.png")}
                  />
                  <View />
                  <View>
                    <Text style={[styles.textLabel, styles.textBold]}>
                      {returnData.paymentMethod}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}>
                <Text style={[styles.textLabel, styles.textBold]}>
                  {Strings.PRODUCTS}
                </Text>
                <View style={styles.textInpuWrapper}>
                  <Image
                    style={styles.orders_icon}
                    resizeMode={"contain"}
                    source={require("../../../res/images/profile_orders.png")}
                  />
                  <View />
                  <View style={styles.container}>
                    <View style={styles.flatListContainer}>
                      <FlatList
                        data={listItem}
                        extraData={this.state}
                        keyExtractor={(x, i) => i.toString()}
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                          <View style={styles.cartItemParentContainer}>
                            <View style={[styles.itemContainer, styles.box1]}>
                              <TouchableOpacity
                                onPress={() => this._selectProduct(item)}
                              >
                                <ImageBackground
                                  style={styles.bgImageStyle}
                                  source={require("../../../res/images/circle-small.png")}
                                >
                                  <Image
                                    style={styles.imageStyle}
                                    source={{ uri: item.photo }}
                                    resizeMode="contain"
                                  />
                                </ImageBackground>
                              </TouchableOpacity>
                              <View style={styles.textContainer}>
                                <Text style={styles.itemNameStyle}>
                                  {item.productName}
                                </Text>
                              </View>
                            </View>
                            <View style={[styles.box2]}>
                            <Text style={[styles.itemCount]}>
                              x{item.unitsNumber}
                            </Text>
                            </View>
                           
                            <Text style={[styles.itemPriceStyle, styles.box3]}>
                              {item.total}€
                            </Text>
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
          <View style={styles.totalPrice}>
            <Text style={styles.totalPriceText}>{Strings.cart_total}</Text>
            <Text style={styles.itemPriceStyle}>{returnData.totalAmount}€</Text>
          </View>
          <View style={styles.checkOutButtonContainer}>
            <TouchableOpacity
              onPress={() => this._confirmPay()}
              style={styles.buttonTextStyle}
            >
              <Text style={styles.buttonTextStyle}>{Strings.confirm_pay}</Text>
            </TouchableOpacity>
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
                source={require("../../../res/images/chat.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
