import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import Root from "@vkontakte/vkui/dist/components/Root/Root";
import View from "@vkontakte/vkui/dist/components/View/View";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import "@vkontakte/vkui/dist/vkui.css";

import { Welcome, Main } from "./panels";

import "./assets/style.css";

const App = () => {
  const [activePanel, setActivePanel] = useState("main");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    let alreadyLaucned = localStorage.getItem("alreadyLaunched");
    if (!alreadyLaucned) {
      localStorage.setItem("alreadyLaunched", true);
      setActivePanel("welcome");
    }
    setPopout(null);
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <Root activeView={activePanel}>
      <Welcome
        id="welcome"
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        popout={popout}
        fetchedUser={fetchedUser}
        go={go}
      />
      <Main id="main" activePanel={activePanel} popout={popout} go={go} />
    </Root>
  );
};

export default App;
