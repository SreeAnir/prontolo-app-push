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
import CheckBox from "react-native-check-box";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StackActions, NavigationActions } from "react-navigation";
import { BASE_URL } from "../../network/ApiTools";
import styles from "./Style";
import Strings from "../../../res/strings/Strings";
import { ApiCall } from "../../network/RestApi";
import { OkAlert } from "../../util/OKAlert/OKAlert";
import { setData } from "../../util/data/PreferenceData";

const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");

export default class LoginSuccess extends Component {
  constructor() {
    super();
    this.state = null
  }
  componentDidMount() {
    _this = this;
    this.props.navigation.navigate("Home");
  }
  render() {
    return <View style={styles.parentContainer} />;
  }
}
