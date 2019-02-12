import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
import { LogoHeader } from "../../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

let _this = null;
export default class Tutorial extends Component {
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
            <Text style={styles.headerText}>{Strings.setting_tutorials}</Text>
            <View style={styles.profileDetailWrapper}>
              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}>
                <View
                  onPress={() => this.props.navigation.navigate("ProfileView")}
                  style={styles.paymentWrapper}
                >
                  <Text style={styles.textLabelInfo} onPress={() => {
                        this.setState({ isActive: !this.state.isActive });
                      }}>
                    {Strings.do_you_want_notification}
                  </Text>
                  <View style={styles.statusContainer}>
                    <Text style={styles.textLabel} onPress={() => {
                        this.setState({ isActive: !this.state.isActive });
                      }}>
                      {Strings.notification_state}
                    </Text>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={() => {
                        this.setState({ isActive: !this.state.isActive });
                      }}
                    >
                      {this.state.isActive ? (
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
              </View>

              <View style={styles.lineSeparator} />
              <View style={styles.profileRow}>
                <View
                  // onPress={() => this.props.navigation.navigate("ProfileView")}
                  style={styles.paymentWrapper}
                >
                  <View style={styles.statusContainer}>
                    <Text style={styles.textLabelInfoOption} onPress={() => this.props.navigation.navigate("TutorialsPage")}>
                      {Strings.view_toturials}
                    </Text>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={() => this.props.navigation.navigate("TutorialsPage")}
                    >
                      <Image
                        style={styles.icon_phone}
                        resizeMode={"contain"}
                        source={require("../../../../res/images/notification_tut.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.lineSeparator} />
            </View>
            <View />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
