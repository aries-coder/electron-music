import NavHeader from "./components/nav-header";
import { ConfigProvider, message } from "antd";
import { useEffect } from "react";
import { loveAnimate } from "./utils/animate";
import createRouter from "./router";
import AriesAudio from "./components/aries-audio";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  window.$message = messageApi;

  useEffect(() => {
    document.onclick = loveAnimate;
  }, []);

  return (
    <div className="h-full w-full">
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff6600",
          },
        }}
      >
        <div className="h-[9%]">
          <NavHeader />
        </div>
        <div className="h-[80%] w-full">{createRouter()}</div>
        <div className="h-[11%]">
          <AriesAudio />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default App;
