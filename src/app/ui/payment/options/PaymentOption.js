import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  WebView
} from "react-native";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { PaymentView } from "../../../components/Header";
import { ApiCall } from "../../../network/RestApi";
import { fetchData } from "../../../util/data/PreferenceData";
import { BASE_REQUEST } from "../../../network/ApiTools";
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
import { OkAlert } from "../../../util/OKAlert/OKAlert";
export default class PaymentOption extends Component {
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

  constructor() {
    super();
    this.state = {
      paymentMethod: -1,
      selected: "",
      partitaIva: false,
      invoiceRequired: false,
      paymentUrl: "",
      bearer: "",
      pay_item: "",
      setPaymentMethod: ""
    };
  }
  async componentDidMount() {
    bearer = await fetchData("Bearer").then(bearer => {
      return JSON.parse(bearer);
    });
    this.setState({ bearer: bearer });
    _this = this;
    loaderHandler.showLoader(Strings.Processing); //
    await this.getCustomerProfile();
    await this.loadPaymentList();
    setTimeout(function() {
      loaderHandler.hideLoader();
    }, 100);
  }
  async getCustomerProfile() {
    const queryString = ` query {
      profile {
      partitaIva,
      }   
      } `;

    loaderHandler.showLoader(Strings.Processing); //
    return await ApiCall(queryString, null).then(data => {
      let profileData = data.response.profile;
      loaderHandler.hideLoader();
      if (data.status == 1) {
        this.setState({ partitaIva: profileData.partitaIva });
      } else {
        OkAlert(Strings.fail_payList, data.message);
        this.setState({ partitaIva: null });
        return false;
      }
    });
  }
  //api calls timeslots
  async loadPaymentList() {
    const queryString = ` query{
      listPaymentMethods{
        id
        method
        url
      }
    }
       `;
    loaderHandler.showLoader(Strings.Processing); //
    return await ApiCall(queryString, null).then(data => {
      let listPaymentMethods = data.response.listPaymentMethods;
      let newList = [];
      if (data.status == 1) {
        listPaymentMethods.forEach(element => {
          var icon_name = element.method.replace(/\s+/g, "").toLowerCase();
          element.icon = "";
          if (icon_name == "wallet") {
            element.icon = require("../../../../res/images/" +
              "Wallet_icon.png");
          }
          if (icon_name == "paypal") {
            element.icon = require("../../../../res/images/" +
              "PayPal" +
              "_icon.png");
          }
          if (icon_name == "googlepay") {
            element.icon = require("../../../../res/images/" +
              "GooglePay" +
              "_icon.png");
          }
          if (icon_name == "applepay") {
            element.icon = require("../../../../res/images/" +
              "ApplePay" +
              "_icon.png");
          }
          if (icon_name == "visa") {
            element.icon = require("../../../../res/images/" +
              "Visa" +
              "_icon.png");
          }

          newList.push(element);
        });
      } else {
        OkAlert(Strings.fail_payList, data.message);
        return false;
      }
      loaderHandler.hideLoader();
      this.setState({ paymentMethod: newList });
    });
  }
  _setInvoiceRequire() {
    if (this.state.partitaIva) {
      this.setState({ invoiceRequired: !this.state.invoiceRequired });
    } else {
      this.setState({ invoiceRequired: false });
      OkAlert(Strings.set_partiva);
    }
  }
  async processPayment(pay_item) {
    let invoiceRequired = this.state.invoiceRequired;
    loaderHandler.showLoader(Strings.payment_process); //
    let customerOrderId = await fetchData("customerOrder");
    if (customerOrderId != "") {
      customerOrderId = parseInt(JSON.parse(customerOrderId));
    }
    let variables = {
      id: customerOrderId,
      paymentMethodId: pay_item.id,
      invoiceRequired: invoiceRequired
    };
    let queryString = `
    mutation ($id: Int!,$paymentMethodId : Int! ,$invoiceRequired : Boolean! ){
      setPaymentMethod(
        id:$id,
        paymentMethodId:$paymentMethodId,
        invoiceRequired:$invoiceRequired
      ) { 
        id 
        state
        address
        date
        deliveryDate
        deliveryTimeSlot
        paymentMethod
        totalAmount
        invoiceRequired
        customerOrderRows{
        customerOrderId
          id
          photo
          productId
          productName
          total
          unitsNumber
        }
       }
    }
    `;
    return await ApiCall(queryString, variables).then(data => {
      setPaymentMethod = data.response.setPaymentMethod;
      if (data.status == 1) {
        this.setState({
          pay_item: pay_item,
          setPaymentMethod: setPaymentMethod
        });
        if (pay_item.url != null) {
          pay_item_url =
            BASE_REQUEST +
            "" +
            pay_item.url +
            "?auth_token=" +
            this.state.bearer;
          // this.setState({ paymentUrl: pay_item_url });
          loaderHandler.hideLoader();
          this.props.navigation.navigate("Report", {
            itemData: pay_item,
            returnData: setPaymentMethod,
            paymentUrl: pay_item_url
          });
        } else {
          loaderHandler.hideLoader();
          this.props.navigation.navigate("Report", {
            itemData: pay_item,
            returnData: setPaymentMethod
          });
        }
      } else {
        OkAlert(Strings.failPayment, data.message);
        loaderHandler.hideLoader();
      }
    });
  }
 
  render() {
    let listItem = this.state.paymentMethod;
    if (listItem.length == 0 || listItem == -1) {
      return (
        <View style={styles.parentContainer}>
          <View style={styles.parentContainer}>
            <View style={styles.container}>
              <Text style={styles.headerText}>{Strings.payment_method}</Text>
              <View style={styles.no_payment}>
                {listItem == -1 ? (
                  <Text style={styles.loading}>{Strings.Processing}</Text>
                ) : (
                  <View>
                    <Text style={styles.no_payment_text}>
                      {Strings.no_payment_methods}
                    </Text>
                    <Text style={styles.no_payment_text}>
                      {Strings.thankyou_waiting}
                    </Text>
                  </View>
                )}
              </View>
              <View />
            </View>
          </View>
        </View>
      );
    } else {
      loaderHandler.hideLoader();
      return (
        <View style={styles.parentContainer}>
          <ScrollView style={styles.parentContainer}>
            <View style={styles.container}>
              <Text style={styles.headerText}>{Strings.payment_method}</Text>
              <View style={styles.part_one}>
                <View style={styles.part_one_label_wrap}>
                  <Text style={styles.part_one_label}>
                    {Strings.need_invoice}
                  </Text>
                </View>
                <View style={styles.part_one_swtich}>
                  <TouchableOpacity
                    style={styles.switchContainer}
                    onPress={() => {
                      this._setInvoiceRequire();
                    }}
                  >
                    {this.state.invoiceRequired ? (
                      <Image
                        style={styles.toggle_icon}
                        resizeMode={"contain"}
                        source={require("../../../../res/images/toggle-on.png")}
                      />
                    ) : (
                      <Image
                        style={styles.toggle_icon}
                        resizeMode={"contain"}
                        source={require("../../../../res/images/toggle-off.png")}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.flatListContainer}>
                <FlatList
                  data={listItem}
                  extraData={this.state}
                  keyExtractor={(x, i) => i.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={styles.paymentRow}>
                      {console.log(item.icon)}
                      <TouchableHighlight
                        style={styles.touchContainer}
                        onPress={() => this.processPayment(item)}
                        underlayColor={"#F37756"}
                      >
                        <Image
                          style={styles.card_icons}
                          resizeMode={"contain"}
                          source={item.icon}
                        />
                      </TouchableHighlight>
                    </View>
                  )}
                />
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
        </View>
      );
    }
  }
}
