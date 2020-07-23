import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";

import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: ["pages/index/index","pages/home/index"],
    tabBar: {
      backgroundColor: "#FFFFFF",
      color: "#AAAAAA",
      selectedColor: "#000000",
      list: [
        {
          pagePath: "pages/index/index",
          text: "玩具",
          iconPath: "./assets/back.png",
          selectedIconPath: "./assets/back.png",
        },
        {
          pagePath: "pages/home/index",
          text: "玩具",
          iconPath: "./assets/back.png",
          selectedIconPath: "./assets/back.png",
        },
      ],
    },
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
