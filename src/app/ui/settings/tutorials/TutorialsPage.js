import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Style";
import { LogoHeader } from "../../../components/Header";

let _this = null;
var images;
export default class TutorialsPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <View>
          <LogoHeader navigation={navigation} />
        </View>
      ),
      header: null
    };
  };
  constructor() {
    super();
    this.state = {
      isActive: false,
      backgroundImage: require("../../../../res/images/tutorials_1.png"),
      position: 0
    };
  }

  backgroundImageSet(position, event) {
    console.log("Event and Position",event,position)
    if (event == "-" && position == 0) {
      this.props.navigation.goBack();
    } else if (event == "+" && position < 4) {
      this.setState({
        backgroundImage: images[position + 1],
        position: position + 1
      });
    } else if (event == "-" && position > 0) {
      this.setState({
        backgroundImage: images[position - 1],
        position: position - 1
      });
    }
  }
  componentWillMount() {
    images = [
      require("../../../../res/images/tutorials_1.png"),
      require("../../../../res/images/tutorials_2.png"),
      require("../../../../res/images/tutorials_3.png"),
      require("../../../../res/images/tutorials_4.png"),
      require("../../../../res/images/tutorials_5.png")
    ];
  }
  componentDidMount() {
    _this = this;
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={styles.tutorialsBackground}
          resizeMode={"contain"}
          source={this.state.backgroundImage}
        />
        <View style={styles.tutorialsText}>
          <TouchableOpacity
            style={styles.tutorialsLeftArrow}
            onPress={() => this.backgroundImageSet(this.state.position, "-")}
          >
            <Image
              style={styles.tutorialsArrowImage}
              resizeMode={"contain"}
              source={require("../../../../res/images/tutorials_pre.png")}
            />
          </TouchableOpacity>

          <View style={styles.tutorialsTextMain}>
            <Text style={styles.tutorialsTextMainText}>TUTORIAL</Text>
            <Text style={styles.tutorialsTextMainCount}>
              {this.state.position + 1}/20
            </Text>
          </View>
          <TouchableOpacity
            style={styles.tutorialsRightArrow}
            onPress={() => this.backgroundImageSet(this.state.position, "+")}
          >
            <Image
              style={styles.tutorialsArrowImage}
              resizeMode={"contain"}
              source={require("../../../../res/images/tutorials_next.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
