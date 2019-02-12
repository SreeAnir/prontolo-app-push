import { StyleSheet,Platform } from "react-native";
import Colors from "../../../res/colors/Colors";
import Strings from "../../../res/strings/Strings"
import { HEIGHT, WIDTH } from "../../util/tools/Utility";

export default StyleSheet.create({
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
    marginTop: 80,
  },
  logo_style: {
    width: 200,
    height: 50,
    marginBottom: 50,
    alignSelf: "center"
  },
  phone_number: {
    color: "#959595",
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 40,
    fontSize:14,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })
  },
  loginActive:{
    backgroundColor: '#f37656',
  },
  loginFade:{
    backgroundColor:"#d8aba0",
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
    borderColor: "#dddbdc",
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
    width: WIDTH - 80,
    paddingLeft:10,
  },
  
  loginView:{
    width:100,
    marginRight:30,
    height:40,
    alignSelf: 'center',
    marginTop: 25,
    marginLeft: 40,      
    flexDirection: 'row',  
    backgroundColor: '#f37656',
    justifyContent: 'center',
    alignItems: 'center',
}, 

loginActive:{
  backgroundColor: '#f37656',
},
loginFade:{
  backgroundColor:"#D5D2D2",
},
loginText: {
    textAlign: "center",
    color: "#ffffff",
    alignItems: 'center',
    fontSize: 18,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lRegular
      },
      android: {
        fontFamily: Strings.lRegular
      }
    })

}, noAccountText: {
    textAlign: "center",
    marginTop:20,
    color: "#2d7a68",
    alignItems: 'center',
    fontSize: 15,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })

}, registrationText: {
    textAlign: "center",
    marginTop:10,
    color: "#2d7a68",
    fontWeight: "bold",
    alignItems: 'center',
    fontSize: 15,
    ...Platform.select({
      ios: {
        fontFamily: Strings.lBold
      },
      android: {
        fontFamily: Strings.lBold
      }
    })

}
});
