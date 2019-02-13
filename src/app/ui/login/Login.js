import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Platform
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StackActions, NavigationActions } from "react-navigation";
import styles from "./Style";
import Strings from "../../../res/strings/Strings";
import { ApiCall } from "../../network/RestApi";
import { OkAlert } from "../../util/OKAlert/OKAlert";
import { setData, removeData } from "../../util/data/PreferenceData";
import FCM, { NotificationActionType, FCMEvent } from "react-native-fcm";


const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: "39",
      phoneNumberPlus: "+",
      password: ""
    };
  }
 componentDidMount() {
    _this = this;
    loaderHandler.hideLoader();
  }
  getPushToken(){
    FCM.getFCMToken().then(token => {
      console.log("token token",token);
     }); 
  }
  async loginApi() {
    removeData("cartProducts");
    removeData("customerOrder");
    removeData("Bearer");
    if (this.state.phoneNumber == "") {
      OkAlert(Strings.phone_number, Strings.field_required);
    } else if (this.state.phoneNumber.length <= 10) {
      OkAlert(Strings.phone_number + ": 10 " + Strings.minimum_char, "");
    } else if (this.state.password == "") {
      OkAlert(Strings.password, Strings.field_required);
    } else if (this.state.password.length <= 4) {
      OkAlert(Strings.password + ": 4 " + Strings.minimum_char, "");
    } else {
      loaderHandler.showLoader("Logging In"); //
      const queryString = ` query login($mobile:String!,$password:String){
        login(phoneNumber:$mobile ,password: $password) {
          token
          },
        }`;
      const variables = {
        mobile: this.state.phoneNumberPlus + this.state.phoneNumber,
        password: this.state.password
      };
      let returnData = await ApiCall(queryString, variables).then(data => {
        LoginData = data.response;
        loaderHandler.hideLoader();
        if (data.status == 1) {
          if (LoginData.login != null) {
            setData("Bearer", LoginData.login.token);
            removeData("customerOrder");
            const resetAction = StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({ routeName: "Home" })]
            });
            this.props.navigation.dispatch(resetAction);
            return true;
          } else {
            alert("Failed");
            return false;
          }
        } else {
          OkAlert(Strings.alert,Strings.login_failed);
          return false;
        }
        alert("Please check Login Details");
      });
    }
  }
  render() {
    return (
      <View style={styles.parentContainer}>
        <ImageBackground
          source={require("../../../res/images/login_reg_bg.jpg")}
          style={styles.bg_image}
        />
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Image
              style={styles.logo_style}
              resizeMode={"contain"}
              source={require("../../../res/images/logo.png")}
            />
            <Text style={styles.phone_number}>{Strings.phone_number}</Text>

            <View style={styles.textInputFieldView}>
              <TextInput
                returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                placeholderTextColor="#ffffff"
                keyboardType="phone-pad"
                maxLength={15}
                value={this.state.phoneNumberPlus + this.state.phoneNumber}
                underlineColorAndroid="transparent"
                onChangeText={value =>
                  this.setState({ phoneNumber: value.substring(1) })
                }
                style={styles.textInputStyle}
              />
            </View>
            <Text style={styles.phone_number}>{Strings.password}</Text>
            <View style={styles.textInputFieldView}>
              <TextInput
                returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                placeholderTextColor="#ffffff"
                secureTextEntry={true}
                maxLength={20}
                underlineColorAndroid="transparent"
                value={this.state.password}
                onChangeText={value => this.setState({ password: value })}
                style={styles.textInputStyle}
              />
            </View>

            <TouchableOpacity onPress={() => this.loginApi()}>
              <View style={[styles.loginView, styles.loginActive]}>
                <Text style={styles.loginText}>{Strings.login}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Registration")}
            >
              <Text style={styles.noAccountText}>
                {Strings.not_have_account}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Registration")}
            >
              <Text style={styles.registrationText}>
                {Strings.registration}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ResetPassword")}
            >
              <Text style={styles.noAccountText}>
                {Strings.password_reset}
              </Text>
            </TouchableOpacity>

          </View>
        </KeyboardAwareScrollView>
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
