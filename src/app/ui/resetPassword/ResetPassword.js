import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  TextInput,
  Platform
} from "react-native";

import { BackView } from "../../components/Header";
import styles from "./Style";
import Strings from "../../../res/strings/Strings";
import { ApiCall } from "../../network/RestApi";
import { OkAlert } from "../../util/OKAlert/OKAlert";
import { request } from "graphql-request";
import Style from "../products/details/Style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
export default class ResetPassword extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: Strings.password_reset,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackView />
        </TouchableOpacity>
      )
    };
  };

  constructor() {
    super();
    this.state = {
      phoneNumber: "39",
      phoneNumberPlus: "+",
      resetToken: "",
      tokenSendSuccess: false
    };
  }
  componentDidMount() {
    loaderHandler.hideLoader();
  }
  //If user want to reuqet for a new reset Token.
  async _generateToken() {
    loaderHandler.showLoader("Processing..."); //
      let variables = {
        phoneNumber: this.state.phoneNumberPlus+''+this.state.phoneNumber,
      };
      let queryString = `
      mutation ($phoneNumber: Int! ){
        requirePasswordReset(
          phoneNumber:$phoneNumber
        ) { 
          message
          }
      }`;
      return await ApiCall(queryString, variables).then(data => {
        if (data.status == 1) {
          console.log('data', data)
          this.setState({ tokenSendSuccess: true });
          OkAlert(Strings.new_password_sent);
          loaderHandler.hideLoader();
        } else {
          OkAlert("Sorry!!!", data.message);
          loaderHandler.hideLoader();
        }
      })
  }

  async _generatePassword() {
    loaderHandler.showLoader("Processing..."); //
    if (this.state.resetToken == "") {
      OkAlert(Strings.resetToken, Strings.field_required);
      loaderHandler.hideLoader();
    } else {
      let variables = {
        passwordResetToken: this.state.resetToken,
      };
      let queryString = `
      mutation ($passwordResetToken: Int! ){
        safePasswordReset(
          passwordResetToken:$passwordResetToken
        ) { 
          message
          }
      }`;
      return await ApiCall(queryString, variables).then(data => {
        if (data.status == 1) {
          console.log('data', data)
          OkAlert('Note!',Strings.passwor_reset_send);
          loaderHandler.hideLoader();
          this.props.navigation.goBack();
          // this.props.navigation.navigate("Login");
        } else {
          OkAlert("Sorry!!!", 'Password-reset-token not found');
          loaderHandler.hideLoader();
        }
      })
    }
  }
  submitRegistration() {
    if (!this.state.checkboxOne || !this.state.checkboxFour) {
      alert("Please enable check Box");
      return false;
    }

    if (this.state.firstname == "") {
      OkAlert(Strings.reg_name + Strings.field_required, "");
    } else {
      const variables = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        birthDate: this.state.birthDate,
        phoneNumber: this.state.phoneNumberPlus + this.state.phoneNumber,
        occupation: this.state.occupation
      };
      loaderHandler.showLoader("Processing.."); //
      const queryString = ` mutation createUser 
        (
             $birthDate: String!, $email: String!,$firstname: String!,$lastname: String!,
             $occupation: String!,$phoneNumber: String!)
        { 
          createCustomer( birthDate:$birthDate,familyName: $lastname,firstName:$firstname,
            occupation: $occupation,phoneNumber: $phoneNumber, email:$email ) 
          { birthDate,familyName,firstName,occupation,phoneNumber,email } } `;

      ApiCall(queryString, variables).then(data => {
        let responseRegister = data;
        loaderHandler.hideLoader();
        if (data.status) {
          OkAlert("Congratulations!!", "Your Registation is Successful");
          this.props.navigation.navigate("Login");
        } else {
          // let resData = data.response;
          //let apiResponse = resData.response.errors;
          apiMsg = data.message;
          OkAlert("Sorry!!!", apiMsg);
          return false;
        }
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
            <Text style={styles.text_notice}> {Strings.Do_you_have_token_enter_token}</Text>
            <View style={styles.textInputFieldView}>
              <TextInput
                returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                placeholderTextColor="#ffffff"
                maxLength={30}
                underlineColorAndroid="transparent"
                value={this.state.firstname}
                onChangeText={value => this.setState({ resetToken: value })}
                style={styles.textInputStyle}
              />
            </View>
            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => {
                this._generatePassword();
              }}
            >
              <Text style={styles.BtnActiveWhite}>
                Eseguire il reset della password
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divide}>
            <View style={styles.lineMid} />
            <View style={styles.lineOR}>
              <Text>{Strings.or}</Text>
            </View>
            <View style={styles.lineMid} />
          </View>
          <View style={styles.container}>
            {/* tokenSendSuccess */}
            {this.state.tokenSendSuccess ? (
              <View style={styles.notify}>
                <Text style={styles.text_notify}>
                 {Strings.you_will_sms_token}
                </Text>
               
              </View>
            ) : (
                <View />
              )}

            <Text style={styles.text_notice}>{Strings.request_new_token}</Text>
            <View style={styles.textInputFieldView}>
              <TextInput
                returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                placeholderTextColor="#ffffff"
                keyboardType="number-pad"
                maxLength={15}
                value={this.state.phoneNumberPlus + this.state.phoneNumber}
                underlineColorAndroid="transparent"
                onChangeText={value =>
                  this.setState({ phoneNumber: value.substring(1) })
                }
                style={styles.textInputStyle}
              />
            </View>
            <TouchableOpacity
              style={styles.btnSendNewRequest}
              onPress={() => {
                this._generateToken();
              }}
            >
              <Text style={styles.BtnActiveWhite}>
                Invia richiesta di reset della password
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
