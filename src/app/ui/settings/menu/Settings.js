import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

let _this = null;
export default class Settings extends Component {
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
    this.state = { isActive: false };
  }
  componentDidMount() {
    _this = this;
  }
  render() {
    return (
      <View style={styles.parentContainer}>
        <KeyboardAwareScrollView style={styles.parentContainer}>
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.SETTINGS}</Text>
            <View style={styles.profileDetailWrapper}>
              {/* <View style={styles.lineSeparator} />
              <View style={styles.profileRow}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => this.props.navigation.navigate("Tutorial")}
                >
                  <Image
                    style={styles.icon_list}
                    resizeMode={"contain"}
                    source={require("../../../../res/images/notification_on.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Tutorial")}
                >
                  <Text style={styles.textLabelInfo}>
                    {Strings.notif_tutorial}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() =>
                    this.props.navigation.navigate("PrivacyPolicy")
                  }
                >
                  <Image
                    style={styles.icon_list}
                    resizeMode={"contain"}
                    source={require("../../../../res/images/lock.png")}
                  />
                </TouchableOpacity>
                <Text
                  style={styles.textLabelInfo}
                  onPress={() =>
                    this.props.navigation.navigate("PrivacyPolicy")
                  }
                >
                  {Strings.Privacy_Policy}
                </Text>
              </View>
              <View style={styles.lineSeparator} /> */}
             </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
