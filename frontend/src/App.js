import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { Welcome, Main } from "./panels";

import "./assets/style.css";

const App = () => {
  const [scheme, setScheme] = useState(null);
  const [queryParams, setQueryParams] = useState();
  const [firstLauch, setFirstLaunch] = useState(false);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        setScheme(data.scheme);
      }
    });

    //  Init VK  Mini App
    bridge.send("VKWebAppInit");

    let alreadyLaucned = localStorage.getItem("alreadyLaunched");
    setQueryParams(window.location.search);

    if (!alreadyLaucned) {
      setFirstLaunch(true);
    }
  }, []);

  if (firstLauch) {
    return (
      <ConfigProvider isWebView={true} scheme={scheme}>
        <Welcome
          setFirstLaunch={setFirstLaunch}
          scheme={scheme}
          queryParams={queryParams}
        />
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider isWebView={true} scheme={scheme}>
      <Main queryParams={queryParams} />
    </ConfigProvider>
  );
};

export default App;
