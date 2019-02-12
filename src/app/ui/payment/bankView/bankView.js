import React, { Component } from "react";
import { View, Text, Image, WebView } from "react-native";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { PaymentView } from "../../../components/Header";
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
import { OkAlert } from "../../../util/OKAlert/OKAlert";
export default class BankView extends Component {
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
    let pay_item = this.props.navigation.getParam("itemData");
    let returnData = this.props.navigation.getParam("returnData");
    let paymentUrl = this.props.navigation.getParam("paymentUrl");
    this.state = {
      returnData: returnData,
      pay_item: pay_item,
      paymentUrl: paymentUrl
    };
    console.log("this.state", this.state);
  }

  _onNavigationStateChange(webViewState) {
    console.log(webViewState.url);
    if (/customer_failure_response/.test(webViewState.url)) {
      this.setState({ paymentUrl: "" });
      loaderHandler.hideLoader();
      this.props.navigation.pop(1);
      //this.props.navigation.goBack();
      alert(Strings.payment_bank_failed);
    }
    if (/customer_success_response/.test(webViewState.url)) {
      this.props.navigation.navigate("PaymentSuccess", {
        itemData: this.state.pay_item,
        returnData: this.state.returnData
      });
    }
    loaderHandler.hideLoader();
  }
  displaySpinner() {
    return (
      <View style={styles.webview_loader}>
        <Image
          style={styles.imageMidLogo}
          resizeMode={"contain"}
          source={require("../../../../res/images/logo.png")}
        />
        <Text style={styles.webview_loader_text_small}>{Strings.please_wait}</Text>
        <Text style={styles.webview_loader_text_small}>
          {Strings.processing_request}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.parentContainer}>
        <View
          style={{
            flex: 1,
            margin: 10,
            flexDirection: "column",
            height: "100%"
          }}
        >
          <WebView
            style={{
              flex: 1,
              marginTop: 10,
              flexDirection: "column",
              zIndex: 99,
              height: "100%"
            }}
            renderLoading={() => {
              return this.displaySpinner();
            }}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: this.state.paymentUrl }}
            startInLoadingState
          />
        </View>
      </View>
    );
  }
}
