import { StyleSheet, Platform } from "react-native";
import Strings from "../../../res/strings/Strings";
import Colors from "../../../res/colors/Colors";
import { HEIGHT, WIDTH } from "../../util/tools/Utility";

export default StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.appcolor,
    height: 55,
    padding: 10
  },
  headerTitleStyle: {
    color: "#2e7867",
    alignSelf: "center",
    flexGrow: 0.5,
    textAlign: "center",
    fontSize: 17
  },
  parentContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: WIDTH,
    marginTop: 10
  },
  headerText: {
    color: "#959595",
    fontSize: 14,
    marginBottom: 10,
    paddingLeft: 15,
    textTransform: "uppercase",
    lineHeight: 26,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },
  profileDetailWrapper: {
    width: WIDTH
  },
  textSuccessLabel: {
    fontSize: 16,
    textAlign: "center",
    color: "#3f846f",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },
  textSuccessLabelLight: {
    fontSize: 17,
    textAlign: "center",
    color: "#3f846f",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  paymentWrap: {
    paddingTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d5d2d2",
    paddingBottom: 10
  },
  orderLink: {
    fontSize: 17,
    textAlign: "center",
    color: "#2e7867",
    marginTop: 5,
    marginBottom: 5,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },
  HomeLink: {
    color: "#2e7867",
    alignSelf: "center",
    fontSize: 17,
    backgroundColor: "#f37656",
    color: "#FFF",
    padding: 10
  },
  PaymentSuccess: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15
  },
  lineSeparator: {
    borderTopColor: "#d5d2d2",
    borderTopWidth: 1.5
  },
  profileRow: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15
  },
  textLight: {
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  textBold: {
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  textLabel: {
    paddingBottom: 0,
    paddingTop: 0,
    lineHeight: 25,
    marginRight: 10,
    fontSize: 14,
    fontWeight: "100",
    color: "#959595"
  },
  orders_icon: {
    width: 20,
    height: 20,
    marginRight: 0,
    alignSelf: "center",
    alignSelf: "flex-start",
    marginTop: 25
  },
  profile_icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    alignSelf: "center"
  },
  textInpuWrapper: {
    flexDirection: "row"
  },
  orderText: {
    alignSelf: "center",
    lineHeight: 20,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  deliveryStatus: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15
  },
  iconStatusWrap: {
    borderBottomWidth: 3,
    borderColor: "#d5d2d2",
    flex: 3,
    alignContent: "center",
    alignItems: "center",
    // marginLeft: 15,
    marginRight: 12,
    marginBottom: 10
  },
  iconStatus: {
    height: 30,
    width: 35
  },
  iconStatus_1: {
    width: 35,
    alignContent: "center",
    alignItems: "center",
    height: 30,
    backgroundColor: "red"
  },
  iconStatus_2: {
    height: 30,
    width: 35,
    backgroundColor: "red"
  },
  iconStatus_3: {
    width: 35,
    alignContent: "center",
    alignItems: "center",
    height: 25,
    backgroundColor: "red"
  },
  icontext: {
    alignSelf: "center",
    fontSize: 10,
    lineHeight: 20,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  buttonContainer: {
    width: WIDTH,
    flexDirection: "row",
    height: 55,
    justifyContent: "center",
    backgroundColor: "#2e7965"
  },
  buttonTextStyle: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 17,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  checkOutButtonContainer: {
    width: WIDTH,
    flexDirection: "row",
    height: 65,
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#f37656"
  },
  buttonTextStyle: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 17,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  chatImageStyle: {
    width: 28,
    height: 28,
    marginLeft: 15,
    alignSelf: "center"
  },
  /* Producst */
  flatListContainer: {
    alignItems: "flex-start",
    marginBottom: 5,
    padding: 3,
    width: WIDTH
  },
  box1: {
    flex: 0.7
  },
  box2: {
    flex: 0.1,
    marginTop: 15,
    marginLeft: 5,
    alignItems: "center",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  box3: {
    flex: 0.2
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 10
  },
  bgImageStyle: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    height: 34,
    width: 34
  },
  itemNameStyle: {
    textAlign: "left",
    alignContent: "center",
    fontSize: 10,
    color: "#282828",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lSemiBold
      },
      android: {
        fontFamily: Strings.lSemiBold
      }
    })
  },
  // itemQtyStyle: {
  //   textAlign: "center",
  //   alignSelf: "flex-start",
  //   marginBottom: 5,
  //   color: "#bcbcbc",
  //   fontSize: 10,
  //   ...Platform.select({
  //     ios: {
  //       fontFamily: Strings.lLight
  //     },
  //     android: {
  //       fontFamily: Strings.lLight
  //     }
  //   })
  // },
  textContainer: {
    alignSelf: "center",
    marginLeft: 3,
    width: "70%"
  },
  cartItemParentContainer: {
    flex: 1,
    width: WIDTH - 60,
    flexDirection: "row",
    flex: 1
  },
  itemCount: {
    color: "#3f846f",
    flex: 1,
    fontSize: 14,

    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  itemPriceStyle: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    color: "#3f846f",
    alignItems: "center",
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },
  totalPrice: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    paddingBottom: 3,
    flex: 0.1,
    marginRight: 15,
    alignSelf: "flex-end"
  },
  totalPriceText: {
    alignSelf: "flex-start",
    flex: 0.9,
    lineHeight: 45,
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  qtyBtnContainer: {
    width: 32,
    height: 26,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#f67659"
  },
  qtySelectionStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },
  qtyTextStyle: {
    textAlign: "center",
    alignSelf: "center",
    color: "#969696",
    padding: 5,
    fontSize: 11,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lMedium
      },
      android: {
        fontFamily: Strings.lMedium
      }
    })
  },
  qtyBorder: {
    width: 32,
    height: 26,
    borderWidth: 1,
    borderColor: "#dedcdd",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff"
  }
});
