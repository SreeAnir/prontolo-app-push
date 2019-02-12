import { StyleSheet, Platform } from "react-native";
import Strings from "../../../../res/strings/Strings";
import Colors from "../../../../res/colors/Colors";
import { HEIGHT, WIDTH } from "../../../util/tools/Utility";

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
    marginTop: 10,
  },
  headerText: {
    color: "#959595",
    fontSize: 16,
    marginTop: 20,
    lineHeight: 20,
    flexDirection: "row",
    alignSelf: "center",
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
  profileRow: {
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
  chatImageStyle: {
    width: 28,
    height: 28,
    marginLeft: 15,
    alignSelf: "center"
  },
  /* Producst */
  flatListContainer: {
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 5,
    padding: 5
  },
  itemContainer: {
    alignSelf: "flex-start",
    flex: 0.8,
    paddingLeft:10,
    flexDirection:"row",
    marginTop:5,
  },
  bgImageStyle: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    height: 45,
    width: 45
  },
  itemNameStyle: {
    textAlign: "left",
    alignContent: "center",
    color: "#959595",
    fontSize: 10,
    marginRight:5,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
   
  itemQtyStyle: {
    textAlign: "center",
    alignSelf: "flex-start",
    marginBottom: 5,
    color: "#bcbcbc",
    fontSize: 10,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  textContainer: {
    flex:0.8,
    alignSelf: "center",
  },
  orders_icon: {
    flex:0.2,
     width: 20,
     height: 20,
     marginRight:10,
     marginTop:2,
  },
  cartItemParentContainer: {
    alignSelf: "center",
    width: WIDTH-30,
    flexDirection: "row",
    flex: 1,
  },
  itemCount: {
    flex: 1.5,
    textAlign: "center",
    marginRight: 5,
    marginTop: 15,
    marginLeft: 5,
    color: "#3f846f",
    alignItems: "center",
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
  itemPriceCol: {
    alignItems: "center",
    flex: 0.2
  },
  lineSeparator:{
    borderBottomWidth:1,
    borderBottomColor:'#dedcdd',
    paddingBottom:15,
    paddingTop:15,
  },
  itemPriceStyle: {
    marginTop: 5,
    marginBottom: 5,
    color: "#3f846f",
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
