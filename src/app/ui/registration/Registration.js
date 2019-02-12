import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Platform,
  Linking
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-material-dropdown";

import { BackView } from "../../components/Header";
import styles from "./Style";
import Strings from "../../../res/strings/Strings";
import { ApiCall } from "../../network/RestApi";
import { OkAlert } from "../../util/OKAlert/OKAlert";
import { request } from "graphql-request";
import CheckBox from "react-native-check-box";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
export default class Registration extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: Strings.registration,
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
      firstname: "",
      lastname: "",
      email: "",
      birthDate: "",
      occupation: "",
      checkboxOne: false,
      checkboxTwo: false,
      checkboxThree: false,
      checkboxFour: false,
      isDateTimePickerVisible: false
    };
  }
  componentDidMount() {
    loaderHandler.hideLoader();
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    var dt = date;

    var DateFormat = moment(date).format("DD/MM/YYYY");
    this.setState({
      birthDate: DateFormat
    });
    this._hideDateTimePicker();
  };
  submitRegistration() {
    if (!this.state.checkboxOne || !this.state.checkboxFour) {
      alert("Compilare tutti i campi");
      return false;
    }
    if (this.state.firstname == "") {
      OkAlert(Strings.reg_name + Strings.field_required, "");
    } else if (this.state.lastname == "") {
      OkAlert(Strings.reg_surname + Strings.field_required, "");
    } else if (this.state.email == "") {
      OkAlert(Strings.email + Strings.field_required, "");
    } else if (this.state.phoneNumber == "") {
      OkAlert(Strings.phone_number, Strings.field_required);
    } else if (this.state.birthDate == "") {
      OkAlert(Strings.reg_dob, Strings.field_required);
    } else if (this.state.occupation == "") {
      OkAlert(Strings.Occupation + Strings.field_required, "");
    } else {
      var mydate_conv = moment(this.state.birthDate, "DD/MM/YYYY");
      //format that date into a different format
      var bday = moment(mydate_conv).format("MM/DD/YYYY");
      bday = new Date(bday); //changign the format
      if (bday >= new Date()) {
        OkAlert(Strings.reg_dob + Strings.invalid, "");
        return false;
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
  }
  render() {
    let occupation_list = [
      {
        value: "Disoccupato"
      },
      {
        value: "Operaio"
      },
      {
        value: "Impiegato"
      },
      {
        value: "Libero professionista"
      },
      {
        value: "Dirigente"
      },
      {
        value: "Altro"
      }
    ];
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
            <Text style={styles.phone_number}>{Strings.reg_name}*</Text>

            <View style={styles.textInputFieldView}>
              <TextInput
                returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                placeholderTextColor="#ffffff"
                maxLength={30}
                underlineColorAndroid="transparent"
                value={this.state.firstname}
                onChangeText={value => this.setState({ firstname: value })}
                style={styles.textInputStyle}
              />
            </View>
            <Text style={styles.phone_number}>{Strings.reg_surname}*</Text>
            <View style={styles.textInputFieldView}>
              <TextInput
                value={this.state.lastname}
                returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                placeholderTextColor="#ffffff"
                maxLength={15}
                underlineColorAndroid="transparent"
                onChangeText={value => this.setState({ lastname: value })}
                style={styles.textInputStyle}
              />
            </View>
            <Text style={styles.phone_number}>{Strings.reg_email}*</Text>
            <View style={styles.textInputFieldView}>
              <TextInput
                returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                placeholderTextColor="#ffffff"
                maxLength={30}
                underlineColorAndroid="transparent"
                value={this.state.email}
                onChangeText={value => this.setState({ email: value })}
                style={styles.textInputStyle}
              />
            </View>
            <Text style={styles.phone_number}>{Strings.req_phone_number}*</Text>
            <View style={styles.textInputFieldView}>
              <TextInput
                returnKeyType={Platform.OS === "ios" ? "done" : "go"}
                placeholderTextColor="#ffffff"
                maxLength={15}
                value={this.state.phoneNumberPlus + this.state.phoneNumber}
                underlineColorAndroid="transparent"
                onChangeText={value =>
                  this.setState({ phoneNumber: value.substring(1) })
                }
                style={styles.textInputStyle}
              />
            </View>
            <Text style={styles.phone_number}>{Strings.reg_dob}*</Text>
            <View style={styles.textInputFieldView}>
              <TouchableOpacity onPress={this._showDateTimePicker}>
                <Text style={styles.dateText}>{this.state.birthDate}</Text>
              </TouchableOpacity>
              <DateTimePicker
                style={{ borderWidth: 1 }}
                // maximumDate={new Date()}
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
            </View>

            <Text style={styles.phone_number}>{Strings.reg_occupation}*</Text>

            <Dropdown
              onChangeText={value => {
                this.setState({ occupation: value });
              }}
              dropdownOffset={{ top: 15 }}
              pickerStyle={styles.dropDown}
              containerStyle={styles.dropDownContainer}
              rippleCentered={true}
              itemTextStyle={styles.dropDownTextStyle}
              selectedItemColor={"#959595"}
              baseColor={"#959595"}
              textColor={"#959595"}
              keyboardType="phone-pad"
              inputContainerStyle={{
                borderBottomColor: "transparent",
                paddingLeft: 15
                //   color: "#959595"
              }}
              data={occupation_list}
            />
            <Text style={styles.phone_number}>{Strings.reg_man}</Text>
            {/* CHECKBOX START */}

            <View style={styles.checkBoxFieldView}>
              <CheckBox
                style={styles.checkBoxFieldViewOne}
                onClick={() => {
                  this.setState({
                    checkboxOne: !this.state.checkboxOne
                  });
                }}
                checkBoxColor={"#dbdbdb"}
                isChecked={this.state.checkboxOne}
              />
              <Text
                style={[styles.checkBoxView, { marginRight: 30, marginTop: 7 }]}
              >
                {Strings.login_check_box_one}
                <Text
                  style={styles.checkBoxTextUnderLine}
                  onPress={() =>
                    Linking.openURL("https://www.prontolo.it/policy.html")
                  }
                >
                  {Strings.login_check_box_one_underline}
                </Text>
              </Text>
            </View>

            <CheckBox
              style={styles.checkBoxField}
              onClick={() => {
                this.setState({
                  checkboxTwo: !this.state.checkboxTwo
                  // checkboxOne: false,
                  // checkboxThree: false,
                  // checkboxFour: false
                });
              }}
              checkBoxColor={"#dbdbdb"}
              rightTextStyle={styles.checkBoxView}
              isChecked={this.state.checkboxTwo}
              rightText={Strings.login_check_box_two}
            />
            <CheckBox
              style={styles.checkBoxField}
              onClick={() => {
                this.setState({
                  checkboxThree: !this.state.checkboxThree
                  // checkboxTwo: false,
                  // checkboxOne: false,
                  // checkboxFour: false
                });
              }}
              checkBoxColor={"#dbdbdb"}
              rightTextStyle={styles.checkBoxView}
              isChecked={this.state.checkboxThree}
              rightText={Strings.login_check_box_three}
            />
            <View style={styles.checkBoxFieldView}>
              <CheckBox
                style={styles.checkBoxFieldViewOne}
                onClick={() => {
                  this.setState({
                    checkboxFour: !this.state.checkboxFour
                  });
                }}
                checkBoxColor={"#dbdbdb"}
                isChecked={this.state.checkboxFour}
              />
              <Text style={[styles.checkBoxView, { marginRight: 30 }]}>
                {Strings.login_check_box_four}
                <Text
                  style={styles.checkBoxTextUnderLine}
                  onPress={() =>
                    Linking.openURL("https://www.prontolo.it/term.html")
                  }
                >
                  {Strings.login_check_box_four_underline}
                </Text>
              </Text>
            </View>
            {/* CHECBOX END */}

            <TouchableOpacity onPress={() => this.submitRegistration()}>
              <View
                style={[
                  styles.regView,
                  this.state.checkboxFour && this.state.checkboxOne
                    ? styles.BtnActive
                    : styles.BtnFade
                ]}
              >
                <Text style={styles.regText}>{Strings.registration}</Text>
              </View>
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
