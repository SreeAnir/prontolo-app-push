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
  webview_loader:{
    flex: 1,  
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom:20,
    textAlign:"center",
    flexDirection: "column",
    zIndex: 99,
    backgroundColor:"#EEE",
    height: "70%",
    textAlign:"center",
    alignItems:"center",
    borderWidth:1,
    borderColor:"#CCC"
  },
  webview_loader_text:{
    marginTop: 20,
    color: "#2e7867",
    alignSelf:"center",
    fontSize: 17,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  webview_loader_text_small:{
    margin: 15,
    color: "#2e7867",
    fontSize: 16,
    alignSelf:"center",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  imageMidLogo:{
    width:WIDTH-250,
    alignSelf:"center",
    marginTop:15,
    
  },
  parentWebContainer:{
    // backgroundColor: "#fff",
    // marginLeft:10,
    // height:"100%",
    // marginRight:10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: WIDTH,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15
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
  labelLight: {
    color: "#b3b3b3",
    alignSelf: "center",
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
  no_payment: {
    marginTop: 15,
    marginLeft: 5
  },
  no_payment_text: {
    marginTop: 15,
    alignSelf: "center",
    color: "#F37756",
    fontSize: 16,
    marginLeft: 5
  },
  loading: {
    marginTop: 15,
    alignSelf: "center",
    color: "#2e7867",
    fontSize: 17,
    marginLeft: 5
  },
  labelPayText: {
    marginTop: 15,
    color: "#F37756",
    fontSize: 14,
    marginLeft: 5
  },
  card_icon_wallet: {
    height: 25,
    width: 25,
    marginTop: 10,
    marginBottom: 10
  },
  part_one: {
    flex: 1,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 15,
    width: WIDTH - 60,
    flexDirection: "row"
  },
  part_one_label_wrap: {
    flex: 0.8,
    alignSelf: "flex-start"
  },
  part_one_label: {
    color: "#2e7965",
    fontSize: 15
  },
  part_one_swtich: {
    flex: 0.2,
    alignItems: "center"
  },
  toggle_icon: {
    width: 40,
    height: 25
  },
  switchContainer: {
    padding:5,
  },
  flatListContainer: {
    alignItems: "center",
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15
  },
  // addresstContainer: {
  //   marginBottom: 15,
  //   paddingTop: 10,
  //   paddingBottom: 10,
  // },
  selectedAddress: {
    backgroundColor: "#F37756"
  },
  // textAddress: {
  //   fontSize: 14,
  //   paddingLeft: 15,
  //   marginTop:5,
  //   paddingRight: 15,
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
    marginLeft: 10
  },
  totalTitleTextStyle: {
    alignSelf: "flex-start",
    marginLeft: 15,
    color: "#959595",
    fontSize: 16,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
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
  card_icons: {
    height: 25,
    marginTop: 10,
    marginBottom: 10
  },
  paymentRow: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#bcbcbc",
    flex: 1,
    flexDirection: "row",
    width: WIDTH - 60,
    alignSelf: "center",
    justifyContent: "center"
  },
  selectedPay: {
    backgroundColor: "#F37756",
    color: "#FFF"
  },
  PaymentRowDef: {},
  touchContainer: {
    height: 45,
    width: WIDTH - 60,
    alignItems: "center"
  },
  chatImageStyle: {
    width: 28,
    height: 28,
    marginLeft: 15,
    alignSelf: "center"
  }
});
