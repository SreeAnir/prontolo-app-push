import { StyleSheet, Platform } from "react-native";
import Colors from "../../../res/colors/Colors";
import Strings from "../../../res/strings/Strings";
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
    flex: 1
  },
  bg_image: {
    height: HEIGHT,
    width: WIDTH,
    position: "absolute"
  },
  container: {
    flexDirection: "column",
    width: WIDTH,
    marginTop: 20
  },
  logo_style: {
    width: 200,
    height: 50,
    marginBottom: 30,
    alignSelf: "center"
  },
  text_notice: {
    color: "#2e7867",
    alignSelf: "center",
    textAlign:"center",
    marginBottom: 5,
    marginLeft: 20,
    marginRight:20,
    width:WIDTH-55,
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  phone_number: {
    color: "#959595",
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 40,
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  textInputFieldView: {
    width: WIDTH - 80,
    marginRight: 30,
    height: 50,
    marginBottom: 20,
    marginTop: 5,
    marginLeft: 40,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#dddbdc"
  },
  btnSend: {
    width: WIDTH - 80,
    alignSelf: "center",
    backgroundColor: "#f37656",
    padding: 10,
    alignItems: "center"
  },
  btnSendNewRequest: {
    width: WIDTH - 80,
    alignSelf: "center",
    backgroundColor: "#2e7867",
    padding: 15,
    alignItems: "center"
  },
  dateText: {
    width: WIDTH - 100,
    marginTop: 15,
    marginLeft: 10,
    color: "#959595",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  textInputStyle: {
    width: WIDTH - 100,
    height: 50,
    marginLeft: 10,
    color: "#959595",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  regView: {
    width: 150,
    marginRight: 30,
    height: 40,
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 25,
    marginLeft: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  divide: {
    height:50,
    width: WIDTH - 90,
    alignSelf: "center",
    padding: 15,
    alignItems: "center",
    flex:1,
    marginTop:15,
    flexDirection:"row",
    alignItems:"center"
  },
  lineMid:{
    backgroundColor: "#959595",
    height:0.5,
    flex:0.4,
    alignSelf:"center",
    alignItems:"center"
  },
  lineOR:{
    flex:0.4,
    alignItems:"center"
  },
  notify:{
    backgroundColor:"#D5D2D2",
    borderColor:"#D5D2D2",
    borderWidth:0.5,
    padding:10,
    width: WIDTH - 90,
    marginBottom: 20,
    marginTop: 5,
    alignSelf:"center",
    alignItems:"center",
  },
  text_notify:{
    color: "#f37656",
    alignSelf:"center",
    fontSize:13,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  },
  BtnActive: {
    backgroundColor: "#f37656",
    color: "#FFF"
  },
  BtnActiveWhite: {
    color: "#FFF"
  },
  BtnFade: {
    backgroundColor: "#D5D2D2"
  },
  regText: {
    textAlign: "center",
    color: "#ffffff",
    alignItems: "center",
    fontSize: 18,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  dropDown: {
    width: WIDTH - 20,
    justifyContent: "center",
    alignSelf: "center",
    color: "#959595",
    paddingLeft: 10
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: "#dddbdc",
    width: WIDTH - 80,
    justifyContent: "center",
    height: 50,
    backgroundColor: "#ffffff",
    marginBottom: 5,
    marginLeft: 40
  },
  dropDownTextStyle: {
    color: "#959595"
  },
  checkBoxField: {
    width: WIDTH - 70,
    alignSelf: "flex-start",
    marginLeft: 30
  },
  checkBoxFieldView: {
    width: WIDTH - 70,
    alignSelf: "flex-start",
    marginLeft: 30,
    marginRight: 10,
    flexDirection: "row"
  },
  checkBoxFieldViewOne: {
    alignSelf: "center",
    marginRight: 10
  },
  checkBoxView: {
    color: "#f5927b",
    fontSize: 12,
    marginTop: 7
  },
  checkBoxTextUnderLine: {
    textDecorationLine: "underline"
  }
});
