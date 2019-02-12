import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import styles from "./Style";
import Strings from "../../../res/strings/Strings";
import { BackViewWithIcon } from "../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ApiCall } from "../../network/RestApi";
import { EventRegister } from "react-native-event-listeners";

export default class Wallet extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <View>
          <BackViewWithIcon navigation={navigation} />
        </View>
      )
    };
  };

  constructor() {
    super();
    this.state = { credits: "0" };
  }

  async componentDidMount() {
    await this.init();
  }

  async init() {
    const queryString = `query {  
        getWallet
      {
        credits
      } 
      }`;

    let returnData = ApiCall(queryString, null).then(data => {
      if (data.status == 1) {
        let response = data.response;
        let getWallet = response.getWallet;
        if (getWallet != null) {
          let credits = getWallet.credits;
          this.setState({ credits: getWallet.credits });
        }
      } else {
        this.setState({ credits: "0" });
      }
    });
  }

  renderTabs() {
    return (
      <View style={styles.tabContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.buttonclickstyle,styles.iconBar1]}
            onPress={() => this.props.navigation.navigate("ProfileMenu")}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../res/images/profile.png")}
            />
          </TouchableOpacity>
          {/*<TouchableOpacity
            onPress={() => this.props.navigation.navigate("Favorite")}
            style={styles.buttonclickstyle}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../res/images/favourite.png")}
            />
          </TouchableOpacity>*/}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Catalog")}
            style={[styles.buttonclickstyle,styles.iconBar2]}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../res/images/catalogue.png")}
            />
          </TouchableOpacity>
          {/*<TouchableOpacity
            onPress={() => this.props.navigation.navigate("Settings")}
            style={styles.buttonclickstyle}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../res/images/settings.png")}
            />
          </TouchableOpacity>*/}
        </View>
      </View>
    );
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
        <KeyboardAwareScrollView style={styles.parentContainer}>
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.wallet_title}</Text>
            <Text style={styles.balanceTitleText}>
              {Strings.wallet_balance}
            </Text>
            <ImageBackground
              style={styles.circleBg}
              source={require("../../../res/images/bg_green.png")}
            >
              <View style={styles.balanceAmountContainer}>
                <Text style={styles.balanceAmountText}>
                  {this.state.credits}
                </Text>
                <Text style={styles.creditText}>{Strings.wallet_credit}</Text>
              </View>
            </ImageBackground>
            <Text style={styles.creditRechargeText}>
              {Strings.wallet_credit_recharge}
            </Text>
            <Text style={styles.creditDateText}>28/10/2018</Text>
          </View>
        </KeyboardAwareScrollView>
        {this.renderTabs()}
        <TouchableOpacity
          onPress={() => this.callPhone()}
          style={styles.buttonContainer}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonTextStyle}>{Strings.home_btn}</Text>
            <Image
              style={styles.chatImageStyle}
              resizeMode={"contain"}
              source={require("../../../res/images/chat.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
