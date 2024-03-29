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
    width: WIDTH,
    marginTop: 10
  },
  headerText: {
    color: "#959595",
    fontSize: 16,
    marginBottom: 10,
    textTransform: "uppercase",
    lineHeight: 26,
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
    paddingTop: 20,
    paddingBottom: 20,
    width: WIDTH - 5,
    alignSelf: "center",
    flex: 1
  },
  lineSeparator: {
    borderColor: "#808080",
    borderBottomWidth: 0.5,
  },
  statusContainer: {
    flex: 1,
    flexDirection: "row"
  },
  toggle_icon: {
    width: 40,
    height: 25,
  },
  textLabel: {
    flex: 0.9,
    paddingBottom: 0,
    paddingTop: 0,
    marginLeft: 15,
    marginRight: 15,
    lineHeight: 28,
    marginRight: 10,
    fontSize: 16,
    color: "#959595",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lato_bold
      },
      android: {
        fontFamily: Strings.lato_bold
      }
    })
  },
  buttonContainer: {
    width: 30
  },
  textLabelInfo: {
    paddingBottom: 0,
    paddingTop: 0,
    marginLeft: 15,
    marginRight: 15,
    lineHeight: 28,
    marginRight: 10,
    fontSize: 16,
    color: "#2e7966",
    ...Platform.select({
      ios: {
        fontFamily: Strings.lLight
      },
      android: {
        fontFamily: Strings.lLight
      }
    })
  }
});
