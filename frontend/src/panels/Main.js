import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Epic, Tabbar, TabbarItem, View, Panel } from "@vkontakte/vkui";
import Icon28HomeOutline from "@vkontakte/icons/dist/28/home_outline";
import Icon28NewsfeedOutline from "@vkontakte/icons/dist/28/newsfeed_outline";
import Icon28AddCircleOutline from "@vkontakte/icons/dist/28/add_circle_outline";
import Icon28PollSquareOutline from "@vkontakte/icons/dist/28/poll_square_outline";
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";
import { Home, Feed, Add, Rating, Settings } from "./main";
import bridge from "@vkontakte/vk-bridge";
import * as actions from "../store/actions/user";

const Main = ({ id, activePanel, isAuth, userGet, popout, go }) => {
  const [activeStory, setActiveStory] = useState("feed");
  const [vkUser, setVkUser] = useState(null);
  const onStoryChange = (e) => {
    setActiveStory(e.currentTarget.dataset.story);
  };

  useEffect(() => {
    console.log("start");
    bridge
      .send("VKWebAppGetUserInfo")
      .then((data) => {
        console.log("data", data);
        setVkUser(data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (vkUser && !isAuth) {
      console.log("vkuser", vkUser);
      userGet(vkUser);
    }
  }, [isAuth, vkUser]);

  return (
    <View activePanel={activePanel}>
      <Panel id={id}>
        <Epic
          activeStory={activeStory}
          tabbar={
            <Tabbar>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "home"}
                data-story="home"
              >
                <Icon28HomeOutline />
              </TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "feed"}
                data-story="feed"
              >
                <Icon28NewsfeedOutline />
              </TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "add"}
                data-story="add"
              >
                <Icon28AddCircleOutline />
              </TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "rating"}
                data-story="rating"
              >
                <Icon28PollSquareOutline />
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
          <Home id="home" activePanel="home" />
          <Feed id="feed" activePanel="feed" />
          <Add id="add" activePanel="add" />
          <Rating id="rating" activePanel="rating" />
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

const mapStateToProps = (state) => ({
  isAuth: !!state.user.vkId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    userGet: (id) => dispatch(actions.userGet(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
