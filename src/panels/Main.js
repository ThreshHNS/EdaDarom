import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Epic,
  Tabbar,
  TabbarItem,
  View,
  Panel,
  PanelHeader,
  Group,
  CellButton,
  Text,
  PanelHeaderButton,
  platform,
  IOS,
} from "@vkontakte/vkui";
import Icon28LocationOutline from "@vkontakte/icons/dist/28/location_outline";
import Icon28ArticleOutline from "@vkontakte/icons/dist/28/article_outline";
import Icon28FavoriteOutline from "@vkontakte/icons/dist/28/favorite_outline";
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";
import Icon28AddCircleOutline from "@vkontakte/icons/dist/28/add_circle_outline";
import { Feed, Article, Favorite, Settings } from "./main";

const Main = ({ id, activePanel, popout, go }) => {
  const [activeStory, setActiveStory] = useState("feed");
  const onStoryChange = (e) => {
    setActiveStory(e.currentTarget.dataset.story);
  };
  return (
    <View activePanel={activePanel}>
      <Panel id={id}>
        <Epic
          activeStory={activeStory}
          tabbar={
            <Tabbar>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "new"}
                data-story="new"
              >
                <Icon28AddCircleOutline />
              </TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "feed"}
                data-story="feed"
              >
                <Icon28ArticleOutline />
              </TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "favorite"}
                data-story="favorite"
                label="12"
              >
                <Icon28FavoriteOutline />
              </TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "settings"}
                data-story="settings"
              >
                <Icon28SettingsOutline />
              </TabbarItem>
            </Tabbar>
          }
        >
          <Article id="article" activePanel="article" />
          <Feed id="feed" activePanel="feed" />
          <Favorite id="favorite" activePanel="favorite" />
          <Settings id="settings" activePanel="settings" />
        </Epic>
      </Panel>
    </View>
  );
};

Main.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Main;
