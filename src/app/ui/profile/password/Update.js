import React, { Component } from "react";
import axios from "axios";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Platform,
  FlatList
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import CheckBox from "react-native-check-box";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";
import { ApiCall } from "../../../network/RestApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { OkAlert } from "../../../util/OKAlert/OKAlert";
let _this = null;
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
const BusyIndicator = require("react-native-busy-indicator");
const radio_props = [
  { label: Strings.female, value: "Female" },
  { label: Strings.male, value: "Male" }
];
export default class ChangePassword extends Component {
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
      password: "",
      confirm_password: "",
      sameString: 0
    };
  }
  componentDidMount() {
    _this = this;
  }

  __ChangePassword() {
    if (this.state.password == "" || this.state.confirm_password == "") {
      OkAlert(Strings.fill_both_password, "");
      return false;
    }

    if (this.state.password != this.state.confirm_password) {
      OkAlert(Strings.pass_mismatch, "");
      return false;
    }
    if (this.state.password.length < 8 ) {
      OkAlert(8 + " " + Strings.minimum_char, "");
      return false;
    }
    loaderHandler.showLoader(Strings.please_wait);
    const variables = {
      password: this.state.password,
      confirm_password: this.state.confirm_password
    };
    let queryString = `
    mutation ($password: String!,$confirm_password:String!){
      changeCustomerPassword(
        password: $password
        passwordConfirmation:$confirm_password
      )  {  id  }
    }
    `;
    ApiCall(queryString, variables).then(data => {
      let respPassword = data;
      if (data.status == 1) {
        let response = respPassword.response;
        OkAlert(Strings.password_updated, "");
      } else {
      }
      loaderHandler.hideLoader();
    });
    // const queryString = ` mutation updateProfile( $gender: String!,$codiceFiscale:String!,$partitaIva:String!,$indirizzoTelematico:String!)
    //   {updateProfile(codiceFiscale:$codiceFiscale,email:$email,gender: $gender,partitaIva: $partitaIva,indirizzoTelematico: $indirizzoTelematico)
    //   {firstName,gender,indirizzoTelematico,partitaIva}} `;
    // ApiCall(queryString, variables).then(data => {
    //   let responseRegister = data;
    //   console.log("update", responseRegister);
    // });
    // this.setState({ show: null });
    // console.log("sav last", this.state.gender);
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <KeyboardAwareScrollView style={styles.parentContainer} ref="scroll">
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.Update_password}</Text>
            <View style={styles.profileDetailWrapper}>
              <View style={styles.profileRow}>
                <Text style={styles.textLabel}>{Strings.Password}</Text>
                <TouchableOpacity style={styles.textInpuWrapper}>
                  <TextInput
                    returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                    placeholderTextColor="#ffffff"
                    secureTextEntry={true}
                    maxLength={25}
                    minLength={8}
                    underlineColorAndroid="transparent"
                    value={this.state.password}
                    onChangeText={value => this.setState({ password: value })}
                    style={[styles.textLabel, styles.textLabelInput]}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.profileRow}>
                <Text style={styles.textLabel}>{Strings.Confirm_password}</Text>
                <TouchableOpacity style={styles.textInpuWrapper}>
                  <TextInput
                    returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                    placeholderTextColor="#ffffff"
                    secureTextEntry={true}
                    maxLength={25}
                    underlineColorAndroid="transparent"
                    value={this.state.confirm_password}
                    onChangeText={value =>
                      this.setState({ confirm_password: value })
                    }
                    style={[styles.textLabel, styles.textLabelInput]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.profileRow}>
                <TouchableOpacity
                  onPress={() => this.__ChangePassword()}
                  style={styles.UpdateButton}
                >
                  <Text style={[styles.UpdateLabel]}>
                    {Strings.Update_password}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View />
          </View>
        </KeyboardAwareScrollView>
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
