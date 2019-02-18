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

import { ApiCall } from "../../../network/RestApi";
import moment from "moment";
import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");

export default class OrderDetails extends Component {
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

  constructor(props) {
    super(props);
    let orderItem = this.props.navigation.getParam("orderItem");
    _this = this;
    this.state = {
      orderItem: orderItem,
      OrderRecap: ""
    };
  }
  async componentDidMount() {
    loaderHandler.showLoader(Strings.Processing);
    let orderItem = this.state.orderItem;
    await this._getItemDetails(orderItem.id);
  }
  _getItemDetails(itemId) {
    let variables = {
      id: parseInt(itemId)
    };
    let queryString = `  query($id:Int!){
        getOrderRecap(id:$id){
        id
        address
        date
        deliveryTimeSlot
        paymentMethod
        deliveryDate
        state
        totalAmount
        customerOrderRows{
        productId
        productName
        unitsNumber
        photo
        total
        }
        }
        } `;

    ApiCall(queryString, variables).then(data => {
      loaderHandler.hideLoader();
      console.log("getOrderRecap", data);
      if (data.status) {
        let getOrderRecap = data.response.getOrderRecap;
        this.setState({ OrderRecap: getOrderRecap });
      }
    });
  }
  _selectProductFromOrder(item) {
    console.log("_selectProduct", item);
    item.id = item.productId;
    this.props.navigation.navigate("ViewProduct", {
      itemDetails: item
    });
  }
  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }
  renderData(itemProd) {
    return (
      <View style={styles.cartItemParentContainer}>
        <View style={styles.label1}>
          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => this._selectProductFromOrder(itemProd)}
            >
              <ImageBackground
                style={styles.bgImageStyle}
                source={require("../../../../res/images/circle-small.png")}
              >
                <Image
                  style={styles.imageStyle}
                  source={{ uri: itemProd.photo }}
                  resizeMode="contain"
                />
              </ImageBackground>
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.itemNameStyle}>{itemProd.productName}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.label2]}>
          <Text style={[styles.itemCount]}>x{itemProd.unitsNumber}</Text>
        </View>
        <View style={[styles.label3]}>
          <Text style={[styles.itemPriceStyle, styles.label3]}>
            {itemProd.total}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    let OrderRecap = this.state.OrderRecap;
    let orderStatusString = Strings.CONFIRMED;
    let orderStatus = 1;
    if (OrderRecap.state == "payed" || OrderRecap.state == "Forwarded") {
      orderStatus = 1;
      orderStatusString = Strings.CONFIRMED;
    }
    if (OrderRecap.state == "Shipped") {
      orderStatus = 2;
      orderStatusString = Strings.IN_TRANSIT;
    }
    if (OrderRecap.state == "Received") {
      orderStatus = 3;
      orderStatusString = Strings.DELIVERED;
    }
    if (OrderRecap != "") {
      listItem = OrderRecap.customerOrderRows;
      return (
        <View style={styles.parentContainer}>
          <ScrollView style={styles.parentContainer}>
            <View style={styles.container}>
              <Text style={styles.orderText}>
                {Strings.ORDERNUM} {OrderRecap.id}
              </Text>
              <Text style={styles.orderText}>
                {moment(OrderRecap.date).format("DD/MM/YYYY")}{" "}
                {orderStatusString}
              </Text>
              <View style={styles.iconsWrapper}>
                <View style={styles.deliveryStatus}>
                  <View
                    style={[
                      styles.iconStatusWrap,
                      orderStatus == 1
                        ? styles.iconBorderActive
                        : styles.iconBorderDefault
                    ]}
                  >
                    <Image
                      style={styles.iconStatus}
                      resizeMode={"center"}
                      source={require("../../../../res/images/confim_order.png")}
                    />
                    <Text style={styles.icontext}>{Strings.CONFIRMED}</Text>
                  </View>
                  <View
                    style={[
                      styles.iconStatusWrap,
                      orderStatus == 2
                        ? styles.iconBorderActive
                        : styles.iconBorderDefault
                    ]}
                  >
                    <Image
                      style={styles.iconStatus}
                      resizeMode={"center"}
                      source={require("../../../../res/images/transit_order.png")}
                    />
                    <Text style={styles.icontext}>{Strings.IN_TRANSIT}</Text>
                  </View>
                  <View
                    style={[
                      styles.iconStatusWrap,
                      orderStatus == 3
                        ? styles.iconBorderActive
                        : styles.iconBorderDefault
                    ]}
                  >
                    <Image
                      style={styles.iconStatus}
                      resizeMode={"center"}
                      source={require("../../../../res/images/deliverd.png")}
                    />
                    <Text style={styles.icontext}>{Strings.DELIVERED}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.headerText}>{Strings.summary}</Text>
              <View style={styles.profileDetailWrapper}>
                <View style={styles.profileRow}>
                  <Text style={[styles.textLabel, styles.textBold]}>
                    {Strings.DELIVERY_ADD}
                  </Text>
                  <View style={styles.textInpuWrapper}>
                    <Image
                      style={styles.profile_icon}
                      resizeMode={"contain"}
                      source={require("../../../../res/images/location.png")}
                    />
                    <View />
                    <View>
                      <Text style={[styles.textLabel, styles.textLight]}>
                        {OrderRecap.address}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.profileRow}>
                  <Text style={[styles.textLabel, styles.textBold]}>
                    {Strings.TIMESLOT}
                  </Text>
                  <View style={styles.textInpuWrapper}>
                    <Image
                      style={styles.profile_icon}
                      resizeMode={"contain"}
                      source={require("../../../../res/images/time_slot.png")}
                    />
                    <View />
                    <View>
                      <Text style={[styles.textLabel, styles.textBold]}>
                        {moment(OrderRecap.deliveryDate).format("DD/MM/YYYY")}{" "}
                        {OrderRecap.deliveryTimeSlot}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.profileRow}>
                  <Text style={[styles.textLabel, styles.textBold]}>
                    {Strings.PAYMENT_METHOD}
                  </Text>
                  <View style={styles.textInpuWrapper}>
                    <Image
                      style={styles.profile_icon}
                      resizeMode={"contain"}
                      source={require("../../../../res/images/profile_payment.png")}
                    />
                    <View />
                    <View>
                      <Text style={[styles.textLabel, styles.textBold]}>
                        {OrderRecap.paymentMethod}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.profileRow}>
                  <Text style={[styles.textLabel, styles.textBold]}>
                    {Strings.PRODUCTS}
                  </Text>
                  <View style={styles.textInpuWrapper}>
                    <Image
                      style={styles.orders_icon}
                      resizeMode={"contain"}
                      source={require("../../../../res/images/profile_orders.png")}
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
                          renderItem={({ item }) => this.renderData(item)}
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
              <Text style={styles.itemPriceStyle}>
                {OrderRecap.totalAmount}€
              </Text>
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
    } else {
      return <View />;
    }
  }
}
