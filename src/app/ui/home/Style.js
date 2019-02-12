  import { StyleSheet, Platform , I18nManager} from "react-native";
  import Strings from "../../../res/strings/Strings";
  import Colors from "../../../res/colors/Colors";
  import { HEIGHT, WIDTH } from "../../util/tools/Utility";

  export default StyleSheet.create({
    headerStyle: {
      backgroundColor: "#fff",
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
    flatListContainer: {
      alignItems: "center",
      alignSelf:'center',
      justifyContent:'center',
      marginBottom: 5,
      marginTop: 10,
      width: WIDTH
    },
    container: {
      flexDirection: "column",
      width: WIDTH,
      marginTop: 10
    },
    headerText: {
      color: "#959595",
      alignSelf: "flex-start",
      marginLeft: 60,
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
    searchContainer: {
      flexDirection: "row",
      marginTop:10
    },
    searchIconStyle: {
      width: 20,
      height: 20,
      alignSelf: "center",
      marginLeft: 25
    },
    textInputStyle: {
      width: WIDTH,
      marginLeft: 10,
      fontSize: 14,
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
    div: {
      width: WIDTH - 30,
      height: 1,
      marginLeft: 15,
      backgroundColor: "#dddddd"
    },
    imageContainer: {
      width: (WIDTH - 30) / 2,
      height: (WIDTH - 30) / 2,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    },
    imageStyle: {
      height: 90,
      width: 90
    },
    bgImageStyle: {
      height: 150,
      width: 150,
      justifyContent: "center",
      alignSelf:'center',
      alignItems: "center",
    },
    itemContainer: {
      width: WIDTH / 2 - 20,
      alignSelf:'center',
      alignItems:'center',
    },
    itemNameStyle: {
      textAlign: "center",
      marginTop: 5,
      height:70,
      fontSize: 13,
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
    itemQtyStyle: {
      textAlign: "center",
      marginBottom: 5,
      color: "#bcbcbc",
      fontSize: 13,
      ...Platform.select({
        ios: {
          fontFamily: Strings.lLight
        },
        android: {
          fontFamily: Strings.lLight
        }
      })
    },
    noProducts:{
      textAlign:"center",
      marginLeft:15,
      marginRight:15,
      paddingTop:15,
      paddingBottom:15,
    },
    productNotFound:{
      color: "#f74242",
      fontSize: 16,
      alignSelf:"center"
      
    },
    productloading:{
      fontSize: 18,
      color:"#bcbcbc"
    },
    tabContainer: {
      flexDirection: "row",
      width: WIDTH,
      marginBottom:10
    },
    tabImageStyle: {
      width: 60,
      height: 60
    },
    buttonclickstyle:{
      width: 60,
      height: 60,
      flex:1,
    },
    iconBar1:{
      alignItems:"flex-end",
      paddingRight:15,
    },
    iconBar2:{
      alignItems:"flex-start",
      paddingLeft:15,
    },
    fav_style: {
      position: "absolute",
      zIndex: 100,
      marginLeft: 0,
      marginTop: 3,
      alignSelf: "flex-start"
    },
    fav_style_icon:{
      width: 20,
      height: 20,
    },
    buttonContainer: {
      width: WIDTH,
      flexDirection: "row",
      height: 55,
      justifyContent: "center",
      // marginTop: 15,
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
    } ,
    //Header logo
    lineHeader:{
      // borderBottomWidth:0.5,
      // borderBottomColor:"#CCC",
      // borderTopWidth:0.5,
      // borderTopColor:"#9e9e9e",
      // backgroundColor:"#9e9e9e",
      height:2,
      marginTop:5,
    },
    imgStyle: {
      height: 25,
      width: 30,
      marginLeft: 5,
      marginRight: 5
    },
    logoContainer: {
      width: WIDTH - 140
    },
    backContainer: {
      alignSelf: "center",
      width: 50
    },
    inViewHeader: {
      ...Platform.select({
        ios: {
          marginTop:35,
        },
        android: {
          marginTop: 5,
        }
      })
      
    },
    cartCountText: {
      color: "#FFF",
      fontSize: 12,
      lineHeight: 15,
      ...Platform.select({
        ios: {
          fontFamily: Strings.lBold
        },
        android: {
          fontFamily: Strings.lBold
        }
      })
    },
    cartCountTextWrap: {
      backgroundColor: "green",
      width: 18,
      height: 18,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: -14,
      borderWidth: 1,
      marginLeft: 5,
      zIndex: 1
    },
  
    cartDiv: {
      marginRight: 15,
      width: 50,
      alignItems: "center",
      flexDirection: "column"
    },
    cartDiv2: {
      marginRight: 15,
      width: 60,
      alignItems: "center",
      flexDirection: "column"
    },
    backimgStyle: {
      paddingRight: 10,
      height: 25,
      width: 25,
      marginRight: 5,
      alignSelf: "center",
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
    },
    logoImgStyle: {
      height: 30,
      width: 130,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
    },
    logoWrapper: {
      //marginLeft: 5,
      //marginRight: 5,
      //padding: 8,
      // transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
    },
    walletImgStyle: {
      height: 30,
      width: 70
    },
    mainHeaderStyle: {
      width: WIDTH,
      flexDirection: "row",
      paddingTop:0,
      paddingBottom:5,
    },
    iconsView: {
      flexDirection: "row",
      alignItems: "flex-end"
    },
    div: {
      width: 1,
      height: 30,
      backgroundColor: "#dddddd"
    },
    backViewContainer: {
      flexDirection: "row",
      alignItems: "flex-start"
    },
    iconsViewShipment: {
      flexDirection: "row",
      alignContent: "center"
    },
    twoIcon: {
      paddingLeft: 15,
      width: WIDTH - 50
    },
    threeIcon: {
      width: WIDTH - 30
    },
    iconsLabel: {
      flex: 1,
      alignContent: "space-around",
      color: "#9e9e9e",
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
    iconsDisabledLabel: {
      color: "#e0e0e0"
    }
    //header logo end
  });
