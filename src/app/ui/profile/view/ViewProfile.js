import React, { Component } from "react";
import axios from "axios";

import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import CheckBox from "react-native-check-box";
import DateTimePicker from "react-native-modal-datetime-picker";
import { OkAlert } from "../../../util/OKAlert/OKAlert";
import moment from "moment";
import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";
import { ApiCall } from "../../../network/RestApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
let _this = null;
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
const BusyIndicator = require("react-native-busy-indicator");
const radio_props = [
  { label: Strings.female, value: "Female" },
  { label: Strings.male, value: "Male" }
];
export default class ViewProfile extends Component {
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
    let profile_item = {
      first_name: "",
      last_name: "",
      dob: "",
      phone_no: "",
      id: 0,
      email: "",
      fiscal_code: "",
      telematic_address: "",
      piva: "",
      indirizzo_telematico: "000000",
      check_telematico: 0,
      show: 0,
      gender: "Male",
      isDateTimePickerVisible: false
    };

    this.state = profile_item;
    this._radioButtonPress = this._radioButtonPress.bind(this);
    this.fetchData();
  }
  fetchData() {
    const queryString = ` query {
      profile {
      birthDate,
      codiceFiscale,
      email,
      familyName,
      firstName,
      gender,
      id,
      indirizzoTelematico,
      occupation,
      partitaIva,
      phoneNumber,
      shippingAddresses{
        id
      }
      }   
      } `;

    let returnData = ApiCall(queryString, null).then(data => {
      ProfileData = data.response.profile;
      if (data.status == 1) {
        if (ProfileData != null) {
          console.log("ProfileData.birthDate", ProfileData.birthDate);
          loaderHandler.hideLoader();
          this.setState({ first_name: ProfileData.firstName });
          this.setState({ last_name: ProfileData.familyName });
          this.setState({ email: ProfileData.email });
          this.setState({ fiscal_code: ProfileData.codiceFiscale });
          this.setState({
            dob: moment(ProfileData.birthDate).format("DD/MM/YYYY")
          });
          this.setState({ phone_no: ProfileData.phoneNumber });
          this.setState({ gender: ProfileData.gender });
          this.setState({ piva: ProfileData.partitaIva });
          if (ProfileData.indirizzoTelematico != null) {
            this.setState({ isChecked: true });
            this.setState({
              telematic_address: ProfileData.indirizzoTelematico
            });
          }
          return true;
        } else {
          alert("Failed");
          return false;
        }
      } else {
        alert(" Failed");
        return false;
      }
      alert("Please check");
    });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    var dt = date;
    var DateFormat = moment(date).format("DD/MM/YYYY");
    this.setState({
      dob: DateFormat
    });

    this._hideDateTimePicker();
    this.textOnFoxus("dob");
  };

  _radioButtonPress = itemVal => {
    alert(itemVal);
    //this.setState({ key: itemVal });
  };

  componentDidMount() {
    _this = this;
    loaderHandler.showLoader(Strings.please_wait);
  }

  changeTelematico(option_checked) {
    //check_telematico
    this.setState({ check_telematico: !option_checked });
    this.refs.scroll.scrollIntoView(9);
  }
  selectAddress(item) {
    this.props.navigation.navigate("paymentOption");
  }
  textOnFoxus(field) {
    this.setState({ show: field });
  }
  saveField(gender) {
    alert("Saving Field");
  }
  isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isAlphaNumeric(str) {
    var code, i, len;
    //if length less
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (
        !(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)
      ) {
        // lower alpha (a-z)
        return false;
      }
    }
    return true;
  }
  updateProfile() {
    //Add code to validate the date with today's date
    if (this.state.firstname == "") {
      OkAlert(Strings.reg_name + Strings.field_required, "");
      return false;
    } else if (this.state.last_name == "") {
      OkAlert(Strings.reg_surname + Strings.field_required, "");
      return false;
    } else if (this.state.email == "") {
      OkAlert(Strings.email + Strings.field_required, "");
      return false;
    } else if (this.state.birthDate == "") {
      OkAlert(Strings.dob + Strings.field_required, "");
      return false;
    } else if (!this.state.gender) {
      OkAlert(Strings.gender + Strings.field_required, "");
      return false;
    } else if (this.state.fiscal_code) {
      //if not null check format
      if (this.state.fiscal_code.length < 16) {
        OkAlert(Strings.fiscal_code + ": 16 " + Strings.minimum_char, "");
        return false;
      }
      if (this.isAlphaNumeric(this.state.fiscal_code) == "false") {
        OkAlert(Strings.invalid + " " + Strings.fiscal_code, "");
        return false;
      }
    }
    if (this.state.piva != null && this.state.piva != "") {
      if (this.state.piva.length < 11) {
        OkAlert(Strings.piva + ": 11 " + Strings.minimum_char, "");
        return false;
      }
      if (isNaN(this.state.piva)) {
        // if not a number
        OkAlert(Strings.invalid + " " + Strings.piva, "");
        return false;
      }
    }
    if (this.state.check_telematico) {
      if (!this.state.telematic_address) {
        //if not null check format email
        OkAlert(Strings.Telematic_address + Strings.field_required, "");
        return false;
      }
      if (!this.isValidEmail(this.state.telematic_address)) {
        OkAlert(Strings.invalid + " " + Strings.Telematic_address, "");
        return false;
      }
    } else {
      this.state.telematic_address = "";
    }
    var mydate_conv = moment(this.state.dob, "DD/MM/YYYY");
    //format that date into a different format
    var bday = moment(mydate_conv).format("MM/DD/YYYY");
    bday = new Date(bday); //changign the format
    if (bday >= new Date()) {
      OkAlert(Strings.reg_dob + Strings.invalid, "");
      return false;
    }
    //if validated
    loaderHandler.showLoader(Strings.please_wait);
    const variables = {
      firstName: this.makeEmpty(this.state.first_name),
      familyName: this.makeEmpty(this.state.last_name),
      email: this.makeEmpty(this.state.email),
      birthDate: this.makeEmpty(this.state.dob),
      gender: this.makeEmpty(this.state.gender),
      codiceFiscale: this.makeEmpty(this.state.fiscal_code),
      partitaIva: this.makeEmpty(this.state.piva),
      indirizzoTelematico: this.makeEmpty(this.state.telematic_address)
    };
    const queryString = ` mutation updateProfile($birthDate: String!, $email: String!, $firstName: String!,$familyName: String!,$gender: String!,$codiceFiscale:String!,$partitaIva:String!,$indirizzoTelematico:String!)
      {updateProfile(birthDate:$birthDate,familyName: $familyName,firstName:$firstName,codiceFiscale:$codiceFiscale,email:$email,gender: $gender,partitaIva: $partitaIva,indirizzoTelematico: $indirizzoTelematico) 
      {birthDate,codiceFiscale,email,familyName,firstName,gender,indirizzoTelematico,partitaIva}} `;
    ApiCall(queryString, variables).then(data => {
      let responseRegister = data;

      if (data.status == 1) {
        OkAlert(Strings.profile_updated, "");
        loaderHandler.hideLoader();
      } else {
        OkAlert("Fail to Update", data.message);
      }
      console.log("update", responseRegister);
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }
  makeEmpty(stringNull) {
    typeof stringNull;
    if (stringNull == null) {
      return "";
    } else {
      return stringNull;
    }
  }
  render() {
    var pickerDefault = new Date();
    if (this.state.dob != "") {
      pickerDefault = new Date(this.state.dob);
      pickerDefault = moment(pickerDefault).format("DD-MM-YYYY");
      pickerDefault = new Date(pickerDefault); //changign the format
    }

    return (
      <View style={styles.parentContainer}>
        <KeyboardAwareScrollView style={styles.parentContainer} ref="scroll">
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.DETAILS}</Text>
            <View style={styles.profileDetailWrapper}>
              <View style={styles.profileRow}>
                <Text style={styles.textLabel}>Nome</Text>
                <TouchableOpacity style={styles.textInpuWrapper}>
                  <TextInput
                    onFocus={() => {
                      this.textOnFoxus("first_name");
                    }}
                    maxLength={25}
                    style={[styles.textLabel, styles.textLabelInput]}
                    onChangeText={text => {
                      this.setState({ first_name: text });
                    }}
                    value={this.state.first_name}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.profileRow}>
                <Text style={styles.textLabel}>Cognome</Text>

                <TouchableOpacity style={styles.textInpuWrapper}>
                  <TextInput
                    onFocus={() => {
                      this.textOnFoxus("last_name");
                    }}
                    maxLength={25}
                    style={[styles.textLabel, styles.textLabelInput]}
                    onChangeText={text => {
                      this.setState({ last_name: text });
                    }}
                    value={this.state.last_name}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.profileRow}>
                <RadioForm formHorizontal={true} animation={true}>
                  {radio_props.map((obj, i) => {
                    return (
                      <RadioButton labelHorizontal={true} key={i}>
                        <RadioButtonInput
                          obj={obj}
                          index={i}
                          isSelected={
                            obj.value == this.state.gender ? true : false
                          }
                          borderWidth={1}
                          buttonInnerColor={
                            obj.value == this.state.gender ? "#DCDCDC" : "#fff"
                          }
                          buttonOuterColor={
                            this.state.key === i ? "grey" : "#DCDCDC"
                          }
                          buttonSize={10}
                          buttonOuterSize={20}
                          buttonStyle={{}}
                          buttonWrapStyle={{ marginLeft: 0 }}
                          onPress={value => {
                            this.setState({ gender: value });
                          }}
                        />
                        <RadioButtonLabel
                          obj={obj}
                          index={i}
                          labelHorizontal={true}
                          labelStyle={styles.textLabel}
                          labelWrapStyle={{ marginRight: 20 }}
                        />
                      </RadioButton>
                    );
                  })}
                </RadioForm>
              </View>
              <View style={styles.profileRow}>
                <Text style={styles.textLabel}>{Strings.dob}</Text>

                <View style={styles.textInpuWrapper}>
                  <TouchableOpacity onPress={this._showDateTimePicker}>
                    <Text style={[styles.textLabel, styles.textLabelInput]}>
                      {this.state.dob}
                    </Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    date={pickerDefault}
                    // date={
                    //   this.state.dob != ""
                    //     ? new Date(pickerDefault)
                    //     : new Date()
                    // }
                    style={{ borderWidth: 1 }}
                    // maximumDate={new Date()}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                  />
                </View>
              </View>
              <View style={styles.profileRow}>
                <Text style={styles.textLabel}>{Strings.ph_no}</Text>
                <TouchableOpacity style={styles.textInpuWrapper}>
                  <TextInput
                    onFocus={() => {
                      this.textOnFoxus("phone_no");
                    }}
                    maxLength={15}
                    style={[styles.textLabel, styles.textLabelInput]}
                    onChangeText={text => {
                      this.setState({ phone_no: text });
                    }}
                    value={this.state.phone_no}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.profileRow}>
                <Text style={styles.textLabel}>{Strings.email}</Text>
                <TouchableOpacity style={styles.textInpuWrapper}>
                  <TextInput
                    onFocus={() => {
                      this.textOnFoxus("email");
                    }}
                    maxLength={100}
                    style={[styles.textLabel, styles.textLabelInput]}
                    onChangeText={text => {
                      this.setState({ email: text });
                    }}
                    value={this.state.email}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.profileRow}>
                <Text style={styles.textLabel}>{Strings.fiscal_code}</Text>
                <TouchableOpacity style={styles.textInpuWrapper}>
                  <TextInput
                    onFocus={() => {
                      this.textOnFoxus("fiscal_code");
                    }}
                    minLength={16}
                    maxLength={20}
                    style={[styles.textLabel, styles.textLabelInput]}
                    onChangeText={text => {
                      this.setState({ fiscal_code: text });
                    }}
                    value={this.state.fiscal_code}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.profileRow}>
                <Text style={styles.textLabel}>{Strings.piva}</Text>
                <View style={styles.twoOptions}>
                  {/* <TouchableOpacity style={styles.textInpuWrapper}> */}
                  <TextInput
                    onFocus={() => {
                      this.textOnFoxus("piva");
                    }}
                    maxLength={20}
                    minLength={11}
                    style={[styles.textLabel, styles.leftBox]}
                    onChangeText={text => {
                      this.setState({ piva: text });
                    }}
                    value={this.state.piva}
                  />
                  <View style={[styles.rightBox]}>
                    <CheckBox
                      returnKeyType="next"
                      style={styles.rightBox}
                      onClick={() => {
                        this.setState({
                          isChecked: !this.state.isChecked
                        });
                        this.changeTelematico(this.state.isChecked);
                      }}
                      checkBoxColor={"#dbdbdb"}
                      rightTextStyle={styles.checkBoxView}
                      isChecked={this.state.isChecked}
                      rightText={Strings.Telematic_address}
                    />
                    {this.state.isChecked ? (
                      <Text style={[styles.textLabel]}>
                        {Strings.Telematic_address}
                      </Text>
                    ) : (
                      <Text />
                    )}
                  </View>
                  {/* </TouchableOpacity> */}
                </View>
              </View>

              {this.state.isChecked ? (
                <View style={styles.profileRow}>
                  <Text style={styles.textLabel}>
                    {Strings.telematic_address}
                  </Text>
                  <TouchableOpacity style={styles.textInpuWrapper}>
                    <TextInput
                      ref="9"
                      onFocus={() => {
                        this.textOnFoxus("telematic_address");
                      }}
                      maxLength={80}
                      style={[styles.textLabel, styles.textLabelInput]}
                      onChangeText={text => {
                        this.setState({ telematic_address: text });
                      }}
                      value={this.state.telematic_address}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
              <View style={styles.profileRow}>
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => this.updateProfile()}
                >
                  <Text style={styles.saveBtnTxt}>
                    {Strings.Update_profile}
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
