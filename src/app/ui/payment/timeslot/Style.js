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
  timeSlotContainer: {
    flex: 1,
    flexDirection: "row"
  },
  timeSelectOne: {
    marginTop: 0.015 * HEIGHT,
    width: "100%",
    padding: 10
    // height:.17*HEIGHT,
  },
  timeSlotItems: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly"
  },
  timeSlotItemSingle: {
    width: "100%",
    marginTop: 10
  },
  timeSlotTouchable: {
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center"
  },
  timeSlotItemOne: {
    height: 55,
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
    marginRight: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#bcbcbc",
    flexWrap: "wrap"
  },
  timeSlotItem1: {
    width: "90%"
  },
  timeSlotItem2: {
    width: "45%",
    flexWrap: "wrap"
  },
  timeSlotMain: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#bcbcbc",
    borderWidth: 1
  },
  timeSelectLong: {
    width: "90%",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    justifyContent: "center",
    borderColor: "#bcbcbc"
  },
  timeslotBar: {
    borderWidth: 1,
    alignItems: "center",
    padding: 15,
    borderColor: "#bcbcbc",
    marginBottom: 10
  },
  dateText: {
    color: "#959595",
    fontSize: 14,
    paddingLeft: 15,
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
  }
});
