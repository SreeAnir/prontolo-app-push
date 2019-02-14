import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Platform,
  FlatList,
  Alert,
  AsyncStorage,
  I18nManager
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";

import styles from "./Style";
import Strings from "../../../res/strings/Strings";
import { ApiCall } from "../../network/RestApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EventRegister } from "react-native-event-listeners";
import { setData, removeData } from "../../util/data/PreferenceData";
import call from "react-native-phone-call";
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");

let _this = null;
var favImage;
var listItemProduct;
global.logoutList = 0;
export default class Home extends Component {
  static navigationOptions = { header: null };
  constructor() {
    super();
    this.state = {
      test: true,
      searchTerm: "",
      productDetail: "-1",
      product_search: 0
    };
  }
  async componentDidMount() {
    EventRegister.addEventListener("navigateOrderHome", pageOption => {
      let navOption = [
        NavigationActions.navigate({ routeName: pageOption }),
        NavigationActions.navigate({ routeName: "Home" })
      ];
      if (pageOption == "Home") {
        navOption = [NavigationActions.navigate({ routeName: "Home" })];
      }
      console.log("pageOption", pageOption);
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: navOption
      });
      this.props.navigation.dispatch(resetAction);
      return true;
      // this.props.navigation.navigate("ViewProduct", {
      //   itemDetails: this.state.productDetail
      // });
    });
    favImage = [
      require("../../../res/images/icon_fav.png"),
      require("../../../res/images/icon_dislike.png")
    ];
    await this._loadProducts();
    if (global.logoutList == 0) {
      global.logoutList = 1;
      this.listener = EventRegister.addEventListener("logOutCall", data => {
        this.logOutOnSessionExpired();
      });
    }
    _this = this;
  }

  async _loadProducts() {
    queryString = `query{
      homeProducts{
          id
          name
          photo
          price
          description
        }
    }
     `;
    let variables = null;

    loaderHandler.showLoader(Strings.Processing); //
    ApiCall(queryString, variables).then(data => {
      this.setState({ product_search: 0 });
      let responseData = data.response;
      if (data.status != 1) {
        alert("No Products Found");
      } else {
        listItemProduct = responseData.homeProducts;
        console.log("homeProducts", responseData.homeProducts);
        this.setState({ productDetail: listItemProduct });
        this._loadCartProductsApi();
      }
    });
  }

  async _searchProduct() {
    let term = this.state.searchTerm;
    if (term == "") {
      await this._loadProducts();
    } else if (term.length < 3) {
      alert("3" + Strings.minimum_char);
      return false;
    } else {
      const queryString = ` query ($term:String!){searchProducts(term:$term) {
      allergens,
      id,
      name,
      photo,
      price,
      }   
       } `;
      let variables = { term: term };
      loaderHandler.showLoader(Strings.Searchingfor); //
      ApiCall(queryString, variables).then(data => {
        this.setState({ product_search: 1 });
        let responseData = data.response;
        if (data.status != 1) {
          alert("No Products Found");
        } else {
          listItemProduct = responseData.searchProducts;
          console.log("homeProducts", responseData.searchProducts);
          this.setState({ productDetail: listItemProduct });
        }
        loaderHandler.hideLoader();
      });
    }
  }
  componentWillMount() {
    this.listener = EventRegister.addEventListener("logOutCall", data => {
      this.logOutOnSessionExpired();
    });

    this.listener = EventRegister.addEventListener(
      "phoneCallbuttonPressed",
      data => {
        this.callPhone();
      }
    );
  }

  callPhone() {
    const args = {
      number: "00390289608402",
      prompt: false
    };
    call(args).catch(console.error);
  }
  logOutOnSessionExpired() {
    this.logoutService();
    AsyncStorage.clear();
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  async logoutService() {
    AsyncStorage.clear();
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  _selectProduct(item) {
    this.props.navigation.navigate("ViewProduct", {
      itemDetails: item,
      onUpdate: () => this._loadCartProductsApi()
    });
  }
  _changeFavorite(item) {
    //   listItemProduct[item.id].like = !listItemProduct[item.id].like;
    //  // console.log("favorite",listItemProduct[item.id].like)
    //   this.setState({ test: !this.state.test });
  }
  async _loadCartProductsApi() {
    let queryString = `query  {  
      getCustomerOrder {
        id
        orderTimestamp
        totalAmount
        customerOrderRows  {
          id
          productName
          photo
          unitsNumber
          total
        }
      } }
      `;
    loaderHandler.showLoader(Strings.Processing); //
    await ApiCall(queryString, null).then(data => {
      let dataResponse = data.response;
      console.log("dataResponse", dataResponse);
      if (data.status == 1) {
        loaderHandler.hideLoader();
        prodList = dataResponse.getCustomerOrder;
        let cartCount = 0;
        let orderId = prodList.id;
        setData("customerOrder", Number(orderId));
        let customerOrderRows = prodList.customerOrderRows;
        for (itm of customerOrderRows) {
          cartCount = parseInt(itm.unitsNumber) + parseInt(cartCount);
        }
        if (parseInt(cartCount) > 0) {
          setData("cartItemCount", JSON.stringify(cartCount));
          this.setState({ cartItemCount: cartCount });
          global.cartCount = JSON.stringify(cartCount);
        }
        listItemProduct = this.state.productDetail;
        this.forceUpdate();
      } else {
        setData("cartItemCount", 0);
        removeData("customerOrder");
        global.cartCount = JSON.stringify(0);
        setTimeout(function() {
          loaderHandler.hideLoader();
        }, 15);
      }
    });
  }
  render() {
    //global.cartCount = this.state.cartItemCount;
    return (
      <View style={styles.parentContainer}>
        <View style={[styles.mainHeaderStyle, styles.inViewHeader]}>
          <View style={styles.logoContainer}>
            <View >
              <Image
                resizeMode="contain"
                source={require("../../../res/images/logo.png")}
                style={styles.logoImgStyle}
              />
            </View>
          </View>
          <View style={styles.iconsView}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Wallet");
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../../../res/images/wallet.png")}
                style={styles.walletImgStyle}
              />
            </TouchableOpacity>
            <View style={styles.div} />
            <TouchableOpacity
              style={styles.cartDiv}
              onPress={() =>
                this.props.navigation.navigate("Cart", {
                  onUpdate: () => this._loadCartProductsApi()
                })
              }
            >
              {Number(global.cartCount) > 0 ? (
                <View style={styles.cartCountTextWrap}>
                  <Text style={styles.cartCountText}>
                    {Number(global.cartCount)}
                  </Text>
                </View>
              ) : (
                <View />
              )}
              <Image
                resizeMode="contain"
                source={require("../../../res/images/cart.png")}
                style={styles.walletImgStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineHeader} />
        {/* headder end */}
        <View>
          <Text style={[styles.headerText, styles.fixedLine]}>
            {this.state.product_search == 0
              ? Strings.home_latest_product_purchased
              : Strings.PRODUCTS}
          </Text>
          <View style={[styles.searchContainer, styles.fixedLine]}>
            <Image
              resizeMode="contain"
              source={require("../../../res/images/search.png")}
              style={styles.searchIconStyle}
            />
            <TextInput
              returnKeyType={Platform.OS === "ios" ? "done" : "go"}
              placeholderTextColor="#ffffff"
              placeholder={Strings.home_search}
              placeholderTextColor="#959595"
              underlineColorAndroid="transparent"
              onChangeText={value => this.setState({ searchTerm: value })}
              style={styles.textInputStyle}
              onEndEditing={() => this._searchProduct()}
            />
          </View>
        </View>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.div} />
            {listItemProduct != "" && listItemProduct != "-1" ? (
              <View style={styles.flatListContainer}>
                <FlatList
                  data={listItemProduct}
                  extraData={this.state}
                  keyExtractor={(x, i) => i.toString()}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <TouchableOpacity
                        style={styles.fav_style}
                        onPress={() => this._changeFavorite(item)}
                      >
                        <Image
                          style={styles.fav_style_icon}
                          resizeMode={"contain"}
                          source={item.like ? favImage[0] : favImage[1]}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this._selectProduct(item)}
                      >
                        <ImageBackground
                          style={styles.bgImageStyle}
                          source={require("../../../res/images/circle.png")}
                        >
                          <Image
                            style={styles.imageStyle}
                            source={{ uri: item.photo }}
                            resizeMode="contain"
                          />
                        </ImageBackground>
                        <Text style={styles.itemNameStyle}>{item.name}</Text>
                        {/* <Text style={styles.itemQtyStyle}>5+</Text> */}
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            ) : (
              <View>
                <View style={styles.noProducts}>
                  {listItemProduct == "-1" ? (
                    <Text style={styles.productloading}>
                      {Strings.ProductLoading}
                    </Text>
                  ) : (
                    <Text style={styles.productNotFound}>
                      {Strings.Noproducts}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        <BusyIndicator
          size="large"
          color={"#2F7965"}
          textColor={"#e2be5a"}
          overlayColor={"#fff"}
        />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.buttonclickstyle, styles.iconBar1]}
            onPress={() => this.props.navigation.navigate("ProfileMenu")}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../res/images/profile.png")}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Favorite")}
            style={styles.buttonclickstyle}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../res/images/favourite.png")}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Catalog")}
            style={[styles.buttonclickstyle, styles.iconBar2]}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../res/images/catalogue.png")}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Settings", {})}
            style={styles.buttonclickstyle}
          >
            <Image
              style={styles.tabImageStyle}
              resizeMode={"contain"}
              source={require("../../../res/images/settings.png")}
            />
          </TouchableOpacity> */}
        </View>
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
