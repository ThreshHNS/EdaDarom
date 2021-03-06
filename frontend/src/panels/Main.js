import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Epic, Tabbar, TabbarItem } from "@vkontakte/vkui";
import Icon28HomeOutline from "@vkontakte/icons/dist/28/home_outline";
import Icon28NewsfeedOutline from "@vkontakte/icons/dist/28/newsfeed_outline";
import Icon28AddCircleOutline from "@vkontakte/icons/dist/28/add_circle_outline";
import Icon28PollSquareOutline from "@vkontakte/icons/dist/28/poll_square_outline";
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";
import { Home, Feed, Add, Rating, Settings } from "./main";
import * as actions from "../store/actions/user";

const Main = ({ isAuth, userLogin, queryParams }) => {
  const [activeStory, setActiveStory] = useState("feed");
  const onStoryChange = (e) => {
    setActiveStory(e.currentTarget.dataset.story);
  };

  useEffect(() => {
    if (!isAuth && queryParams) {
      userLogin(queryParams);
    }
  }, [isAuth, queryParams, userLogin]);

  return (
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
      <Home id="home" activePanel="home" setActiveStory={setActiveStory} />
      <Feed id="feed" activePanel="feed" />
      <Add id="add" activePanel="add" setActiveStory={setActiveStory} />
      <Rating id="rating" activePanel="rating" />
      <Settings id="settings" activePanel="settings" />
    </Epic>
  );
};

Main.propTypes = {
  isAuth: PropTypes.bool,
  userLogin: PropTypes.func,
  queryParams: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: !!state.user.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (queryParams) => dispatch(actions.userLogin(queryParams)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
