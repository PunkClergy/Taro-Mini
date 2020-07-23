import Taro, { Component, showActionSheet } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import { getToys } from "../../servers/servers";

export default class Index extends Component {
  // 初始化状态
  state = {
    leftList: [],
    rightList: [],
  };
  componentWillMount() {
    // 获取列表
    getToys()
      .then((res) => {
        const newData = res.data.toys;
        const leftList = [];
        const rightList = [];
        newData.map((item, num) => {
          num % 2 == 0 ? leftList.push(item) : rightList.push(item);
        });

        this.setState({
          rightList,
          leftList,
        });
      })
      .then((err) => {});
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  componentDidShow() {
    console.log("componentDidShow");
  }

  componentDidHide() {
    console.log("componentDidHide");
  }

  config = {
    navigationBarTitleText: "首页",
  };

  render() {
    const { leftList, rightList } = this.state;
    return (
      <View class="intro">
        <View class="list">
          <View class="left-list">
            {leftList.map((item) => (
              <View>
                <image src={item.cover} mode="widthFix"></image>
                <Text>111</Text>
              </View>
            ))}
          </View>
          <View class="right-list">
            {rightList.map((item) => (
              <View>
                <image src={item.cover} mode="widthFix"></image>
                <Text>333</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}
