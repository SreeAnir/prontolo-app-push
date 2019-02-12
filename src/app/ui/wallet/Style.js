import { StyleSheet, Platform } from "react-native";
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
  container: {
      flex : 1,
    flexDirection: "column",
    width: WIDTH,
    marginTop: 10
  },
  headerText: {
    color: "#959595",
    alignSelf: "center",
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
  balanceTitleText: {
    color: "#2f7a66",
    alignSelf: "center",
    fontSize: 22,
    marginTop:20,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },circleBg: {
    height: 250,
    width: 250,
    marginTop:20,
    alignSelf:'center',
    justifyContent: "center",
    alignItems: "center"
  },balanceAmountText: {
    color: "#fff",
    alignItems:'center',
    textAlign:'center',
    fontSize: 50,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })
  },balanceAmountContainer: {
    height: 250,
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },creditText: {
    color: "#fff",
    alignItems:'center',
    textAlign:'center',
    fontSize:18,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lMedium
      },
      android: {
        fontFamily: Strings.lMedium
      }
    })
  },creditRechargeText: {
    color: "#9b9b9b",
    alignItems:'center',
    textAlign:'center',
    fontSize:16,
    marginTop:20,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },creditDateText: {
    color: "#9b9b9b",
    alignItems:'center',
    textAlign:'center',
    marginTop:5,
    fontSize:16,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
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
    alignItems:'center'
  },
  iconBar1:{
    alignItems:"flex-end",
    paddingRight:15,
  },
  iconBar2:{
    alignItems:"flex-start",
    paddingLeft:15,
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
  }
});
