import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { removeData } from "../../../util/data/PreferenceData";
import {StackActions, NavigationActions} from 'react-navigation'
let _this = null;

export default class ProfileMenu extends Component {
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
  }
  componentDidMount() {
    _this = this;
  }

  logout(){
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    removeData('Bearer')
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <KeyboardAwareScrollView style={styles.parentContainer}>
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.PROFILE}</Text>
            <View style={styles.profileDetailWrapper}>
              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}> 
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("ProfileView")}
                  style={styles.textInpuWrapper}
                >
                  <Image
                    style={styles.profile_icon}
                    resizeMode={"contain"}
                    source={require("../../../../res/images/profile_icon.png")}
                  />
                  <Text style={styles.textLabel}>{Strings.My_details}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}> 
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("PasswordChange")}
                  style={styles.textInpuWrapper}
                >
                  <Image
                    style={styles.profile_icon}
                    resizeMode={"contain"}
                    source={require("../../../../res/images/profile_icon.png")}
                  />
                  <Text style={styles.textLabel}>{Strings.Password_change}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}>
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("AddressList")}
                  style={styles.textInpuWrapper}
                >
                  <Image
                    style={styles.profile_icon}
                    resizeMode={"contain"}
                    source={require("../../../../res/images/location.png")}
                  />
                  <Text style={styles.textLabel}>{Strings.Address}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}>
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("PaymentActive")}
                  style={styles.textInpuWrapper}
                >
                
                  <Image
                    style={styles.profile_icon}
                    resizeMode={"contain"}
                    source={require("../../../../res/images/profile_payment.png")}
                  />
                  <Text style={styles.textLabel}>{Strings.Payment}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}>
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("OrderHistory")}
                  style={styles.textInpuWrapper}
                >
                  <Image
                    style={styles.profile_icon}
                    resizeMode={"contain"}
                    source={require("../../../../res/images/profile_orders.png")}
                  />
                  <Text style={styles.textLabel}>{Strings.order_history}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.lineSeparator} />
            </View>
            <View />
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.footerContainer}>
          <View style={styles.buttonContainer}>
            <View style={styles.lineSeparator} />
            <TouchableOpacity
              onPress={() => {
                // alert("Logging out ");
                this.logout();
              }}
            >
              <Text style={styles.footerLabel}>{Strings.Logout}</Text>
            </TouchableOpacity>
            <View style={styles.lineSeparator} />
          </View>
        </View>
      </View>
    );
  }
}
