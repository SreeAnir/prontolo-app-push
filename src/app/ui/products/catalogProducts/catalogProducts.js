import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList
} from "react-native";
import { EventRegister } from "react-native-event-listeners";
import styles from "./Style";
import Strings from "../../../../res/strings/Strings";
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");
import { OkAlert } from "../../../util/OKAlert/OKAlert";
import { ApiCall } from "../../../network/RestApi";
import { isEmpty } from "../../../util/tools/Utility";
let listItem;
let prodArray;
let fullReached = 0;
let loadAgain = null;
let this_ = null;
export default class catalogProducts extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerStyle: styles.headerStyle,
  //     headerTitleStyle: styles.headerTitleStyle,
  //     headerLeft: (
  //       <View>
  //         <BackViewWithIcon navigation={navigation} />
  //       </View>
  //     )
  //   };
  // };

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.__loadMore = this.__loadMore.bind(this);
    productList = props.navigation.state.params.productList;
    this.state = {
      test: true,
      loadingIcon: 0,
      productList: productList,
      searchTerm: props.navigation.state.params.searchTerm,
      cartTotal: global.cartCount,
      // empty arrays for showing design before loading
      catalogProduct: -1
    };
  }
  componentWillMount() {}

  componentDidMount() {
    fullReached=0;
    _this = this;
    favImage = [
      require("../../../../res/images/icon_fav.png"),
      require("../../../../res/images/icon_dislike.png")
    ];
    if (this.state.productList != "") {
      this.__getProducts();
    } else {
      this.__searchProduct(this.state.searchTerm);
    }
    loaderHandler.showLoader(
      Strings.Searchingfor + " " + this.state.searchTerm
    ); //
  }
  __scrollProducts() {
    // this.setState({ loadingIcon: 1 });
    this.__loadMore();
  }
  __loadMore() {
    if (fullReached == 1 || loadAgain != null) {
      clearInterval(loadAgain);
      this.setState({ loadingIcon: 0 });
    }
    if (fullReached == 0) {
      this.setState({ loadingIcon: 1 });
      lastIndex = this.state.catalogProduct.length;
      arrayLeft = listItem;
      arrayLeft = arrayLeft.splice(lastIndex, 10);
      prodArray = this.state.catalogProduct;
      if (!isEmpty(arrayLeft)) {
        prodArray = prodArray.concat(arrayLeft);
        this.setState({ catalogProduct: prodArray });
        console.log(
          "From " +
            this.state.catalogProduct.length +
            "rendered " +
            (lastIndex + 10)
        );
      } else {
        fullReached = 1;
        this.setState({ loadingIcon: 0 });
        console.log("Wow!Reached End of Products!!" + listItem.length);
      }
    }else{
      this.setState({ loadingIcon: 0 });
    }
    // console.log("prodArray",prodArray);
  }
  __searchProduct(term) {
    const queryString = ` query ($term:String!){searchProducts(term:$term) {
      allergens,
      description,
      id,
      ingredients,
      name,
      nutritionalTable,
      photo,
      price,
      }   
       } `;
    let variables = { term: term };
    loaderHandler.showLoader(Strings.Searchingfor); //
    ApiCall(queryString, variables).then(data => {
      let responseData = data.response;
      if (data.status != 1) {
        loaderHandler.hideLoader();
      } else {
        listItem = responseData.searchProducts;
        prodArray = listItem.slice(0, 8);
        this.setState({ catalogProduct: prodArray });
        this_ = this;
        loadAgain = setInterval(function() {
          this_.__loadMore();
          console.log("__loadMore")
        }, 500);
        setTimeout(function() {
          loaderHandler.hideLoader();
        }, 30);
      }
    });
  }

  __getProducts() {
    productList = this.state.productList;
    let sid = productList.id;
    const queryString = ` query ($id:String!){
    getProductsBySubcategory(id:$id) {
    allergens,
    description,
    id,
    ingredients,
    name,
    nutritionalTable,
    photo,
    price,
    }   
    }  `;
    const variables = {
      id: sid
    };
    loaderHandler.showLoader(Strings.Processing); //
    ApiCall(queryString, variables).then(data => {
      let responseData = data.response;
      if (data.status != 1) {
        loaderHandler.hideLoader();
        OkAlert(Strings.Error, responseData.errors[0].message);
      } else {
        let catalogProduct = responseData.getProductsBySubcategory;
        this.setState({ catalogProduct: catalogProduct });
        setTimeout(function() {
          loaderHandler.hideLoader();
        }, 30);
      }
    });
  }
  updateCartCount() {
    this.setState({ cartTotal: global.cartCount });
  }
  _onClick(item) {
    this.props.navigation.navigate("catalogProductsDetails", {
      itemDetails: item,
      onUpdate: () => this.updateCartCount()
    });
  }
  _changeFavorite(item) {
    console.log(item);
    console.log(" like", listItem[item.id].like);
    listItem[item.id].like = !listItem[item.id].like;
    this.setState({ test: !this.state.test });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener("phoneCallbuttonPressed");
  }

  callPhone() {
    EventRegister.emit("phoneCallbuttonPressed");
  }
  setGoback() {
    if (this.props.navigation.state.params.onUpdate != "undefined") {
      this.props.navigation.state.params.onUpdate();
    }
    this.props.navigation.goBack();
  }
  renderHeader() {
    return (
      <View style={[styles.mainHeaderStyle, styles.inViewHeader]}>
        <View style={styles.logoContainer}>
          <View style={styles.backViewContainer}>
            <TouchableOpacity
              style={styles.backContainer}
              onPress={() => {
                this.setGoback();
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../../../../res/images/back_arrow.png")}
                style={styles.backimgStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Image
                resizeMode="contain"
                source={require("../../../../res/images/logo.png")}
                style={styles.logoImgStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.iconsView}>
          <TouchableOpacity
            onPress={() => {
              if (this.props.navigation.state.routeName != "Wallet") {
                this.props.navigation.navigate("Wallet");
              }
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../../../res/images/wallet.png")}
              style={styles.walletImgStyle}
            />
          </TouchableOpacity>
          <View style={styles.div} />
          <TouchableOpacity
            style={styles.cartDiv2}
            onPress={() => {
              this.props.navigation.navigate("Cart");
            }}
          >
            {Number(this.state.cartTotal) > 0 ? (
              <View style={styles.cartCountTextWrap}>
                <Text style={styles.cartCountText}>
                  {Number(this.state.cartTotal)}
                </Text>
              </View>
            ) : (
              <View />
            )}
            <Image
              resizeMode="contain"
              source={require("../../../../res/images/cart.png")}
              style={styles.walletImgStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    // let listItemProp = productList;
    let catalogProduct = this.state.catalogProduct;

    return (
      <View style={styles.parentContainer}>
        {this.renderHeader()}
        <BusyIndicator
          size="large"
          color={"#2F7965"}
          textColor={"#e2be5a"}
          overlayColor={"#fff"}
        />
        {/* keyaware */}
        <View>
          <View style={styles.container}>
            <Text style={styles.headerText}>{Strings.CATALOG}</Text>
            <View style={styles.searchContainer}>
              {/* <Text style={styles.catalogItem}>{catalogProduct.subcategory}</Text> */}
            </View>
            <View style={styles.flatListContainer}>
              {catalogProduct.length == 0 ? (
                <View>
                  <View style={styles.noProducts}>
                    <Text style={styles.productNotFound}>
                      {Strings.Noproducts}
                    </Text>
                  </View>
                </View>
              ) : (
                <FlatList
                  data={catalogProduct}
                  extraData={this.state}
                  keyExtractor={(x, i) => i.toString()}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  onEndReached={() => this.__scrollProducts()}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <TouchableOpacity
                        style={styles.fav_style}
                        onPress={() => this._changeFavorite(item)}
                      >
                        <Image
                          style={styles.fav_style_icon}
                          resizeMode={"contain"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this._onClick(item)}>
                        <ImageBackground
                          style={styles.bgImageStyle}
                          source={require("../../../../res/images/circle.png")}
                        >
                          <Image
                            style={styles.imageStyle}
                            source={{ uri: item.photo }}
                            resizeMode="contain"
                          />
                        </ImageBackground>
                        <Text style={styles.itemNameStyle}>{item.name}</Text>
                        <Text style={styles.itemQtyStyle}>{item.price} €</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              )}

              {/* <Text onPress={() => this.__loadMore()}>More</Text> */}
            </View>
          </View>
        </View>
        {/* enfKeyscroll */}
        {this.state.loadingIcon == 1 ? (
          <Text style={styles.loadingTxt}>. . . .</Text>
        ) : (
          <Text />
        )}
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
    );
  }
}
