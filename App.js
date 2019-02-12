/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createStackNavigator, StackNavigator } from "react-navigation";
import SplashScreen from "react-native-splash-screen";
import { fetchData, setData } from "./src/app/util/data/PreferenceData";
import { isEmpty } from "./src/app/util/tools/Utility";
import Login from "./src/app/ui/login/Login";
import LoginSuccess from "./src/app/ui/login/LoginSuccess";
import Registration from "./src/app/ui/registration/Registration";
import ResetPassword from "./src/app/ui/resetPassword/ResetPassword";
import Home from "./src/app/ui/home/Home";
import Favorite from "./src/app/ui/products/favorite/Favorite";
import Catalog from "./src/app/ui/products/catalog/Catalog";
import Wallet from "./src/app/ui/wallet/Wallet";
import Cart from "./src/app/ui/cart/Cart";
import ViewProduct from "./src/app/ui/products/details/ViewProduct";
import ProfileView from "./src/app/ui/profile/view/ViewProfile";
import ProfileMenu from "./src/app/ui/profile/menu/ProfileMenu";
import ViewAddress from "./src/app/ui/address/payment_address/ViewAddress";
import PaymentOption from "./src/app/ui/payment/options/PaymentOption";
import bankView from "./src/app/ui/payment/bankView/bankView";
import PaymentSuccess from "./src/app/ui/report/PaymentSuccess";
import PaymentActive from "./src/app/ui/payment/profile/PaymentActive";
import Report from "./src/app/ui/report/Report";
import OrderHistory from "./src/app/ui/orders/history/OrderHistory";
import OrderDetails from "./src/app/ui/orders/details/OrderDetails";
import Settings from "./src/app/ui/settings/menu/Settings";
import Tutorial from "./src/app/ui/settings/tutorials/Tutorial";
import AddNewAddress from "./src/app/ui/address/add/AddNewAddress";
import EditAddress from "./src/app/ui/address/edit/EditAddress";
import AddressList from "./src/app/ui/address/address_list/AddressList";
import TutorialsPage from "./src/app/ui/settings/tutorials/TutorialsPage";
import catalogProducts from "./src/app/ui/products/catalogProducts/catalogProducts";
import DefaultTimeSlot from "./src/app/ui/payment/timeslot/DefaultTimeSlot";
import TimeSlotMain from "./src/app/ui/payment/timeslot/TimeSlotMain";
import PrivacyPolicy from "./src/app/ui/privacy_policy/PrivacyPolicy";
import ChangePassword from "./src/app/ui/profile/password/Update";
import { AsyncStorage } from "react-native";
// import fcm, { NotificationActionType, FCMEvent } from 'react-native-fcm'

export const HomeStack = createStackNavigator({
  Home: { screen: Home },
  Login: { screen: Login, navigationOptions: { header: null } },
  LoginSuccess: { screen: LoginSuccess, navigationOptions: { header: null } },
  Wallet: { screen: Wallet },
  Cart: { screen: Cart },
  ViewProduct: { screen: ViewProduct },
  ViewAddress: { screen: ViewAddress },
  DefaultTimeSlot: { screen: DefaultTimeSlot },
  TimeSlotMain: { screen: TimeSlotMain },
  PaymentOption: { screen: PaymentOption },
  Report: { screen: Report },
  PaymentActive: { screen: PaymentActive },
  ProfileView: { screen: ProfileView },
  ProfileMenu: { screen: ProfileMenu },
  OrderDetails: { screen: OrderDetails },
  OrderHistory: { screen: OrderHistory },
  Tutorial: { screen: Tutorial },
  TutorialsPage: { screen: TutorialsPage },
  Settings: { screen: Settings },
  Favorite: { screen: Favorite },
  favoriteProductsDetails: { screen: ViewProduct },
  AddNewAddress: { screen: AddNewAddress },
  AddNewAddressFromPayment: { screen: AddNewAddress },
  EditAddress: { screen: EditAddress },
  AddressList: { screen: AddressList },
  Catalog: { screen: Catalog },
  catalogProducts: { screen: catalogProducts },
  catalogProductsDetails: { screen: ViewProduct },
  PrivacyPolicy: { screen: PrivacyPolicy },
  PasswordChange: { screen: ChangePassword },
  PaymentSuccess:{screen:PaymentSuccess} ,
  bankView: {screen:bankView} ,
});

const LoginAndRegistrationStack = createStackNavigator({
  Login: { screen: Login, navigationOptions: { header: null } },
  Home: { screen: HomeStack, navigationOptions: { header: null } },
  Registration: { screen: Registration },
  ResetPassword:{screen:ResetPassword },
});

 

global.cartCount = 0;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      isLoading: true,
      isLogin: false
    };
    this.checkLoginStatus();
  }

  async componentDidMount() {

    /*fcm.createNotificationChannel({
      id: 'default',
      name: 'Default',
      description: 'used for example',
      priority: 'high'
    })
    
    try {
      fcm.requestPermissions();
    } catch (e) {
      console.error(e);
    }

    fcm.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      var pushToken = { token: token };
      // setData("refresh_token", pushToken)
    });
    this.refreshTokenListener = fcm.on(FCMEvent.RefreshToken, (token) => {
      console.log(token)
      if (token != null && token.length > 0) {
        var pushToken = { token: token };
        // setData("refresh_token", pushToken)
      }

      // fcm token may not be available on first load, catch it here
    });
*/
    await this.init();
    // you might want to do the I18N setup here
    this.setState({
      isLoading: false
    });
  }

  async checkLoginStatus() {
    let checkLoginStatusToken = await fetchData("Bearer");
    let userDetails = JSON.parse(checkLoginStatusToken);
    if (isEmpty(userDetails) == false) {
      this.setState({ isLogin: true, token: userDetails });
    } else {
      this.setState({ isLogin: false, token: "" });
    }
  }

  async init() {
    let cartItemCount = await AsyncStorage.getItem("cartItemCount");
    if (cartItemCount != null) {
      global.cartCount = cartItemCount;
    }
  }
  componentWillMount() {
    // Hide splash screen
    SplashScreen.hide();
  }

  render() {
    if (this.state.isLogin === true) {
      console.log('hom')
      return <HomeStack />
    } else {
      console.log('reg')
      return <LoginAndRegistrationStack />
    }
    //  return <HomeStack />
  }
}
