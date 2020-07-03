import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  View,
  Panel,
  PanelHeader,
  CardGrid,
  Title,
  Text,
  Group,
  Tappable,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import * as actions from "../../store/actions/food";
import { moment } from "../../utils";
import Detail from "./Detail";

const Home = ({ token, id, ownFood, foodOwn, activePanel }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [feedPanel, setFeedPanel] = useState(activePanel);
  const [historyPanel, setHistoryPanel] = useState([activePanel]);

  useEffect(() => {
    if (token) {
      foodOwn(token);
    }
  }, [token, foodOwn]);

  const getDetails = (food) => {
    const history = [...historyPanel];
    history.push("detail");
    if (feedPanel === activePanel) {
      bridge.send("VKWebAppEnableSwipeBack");
    }
    setSelectedFood(food);
    setHistoryPanel(history);
    setFeedPanel("detail");
  };

  const goBack = () => {
    const history = [...historyPanel];
    history.pop();
    const currentPanel = history[history.length - 1];
    if (currentPanel === activePanel) {
      bridge.send("VKWebAppDisableSwipeBack");
    }
    setHistoryPanel(history);
    setFeedPanel(activePanel);
  };

  return (
    <View
      id={id}
      history={historyPanel}
      activePanel={feedPanel}
      onSwipeBack={goBack}
    >
      <Panel id={id}>
        <PanelHeader>Мои объявления</PanelHeader>
        <Group separator="hide">
          {ownFood.length > 0 && (
            <CardGrid>
              {ownFood.map((food) => (
                <Tappable key={food.id} onClick={() => getDetails(food)}>
                  <div className="Card__Product">
                    <div className="Card__Product_image">
                      <img src={food.image_preview} alt="Product Preview" />
                    </div>
                    <div className="Card__Product_info">
                      <Title
                        level="2"
                        weight="semibold"
                        className="Card__Product_info_title"
                      >
                        {food.title}
                      </Title>
                      <div className="Card__Product_info_text">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          style={{ marginLeft: 5 }}
                        >
                          <circle cx="7" cy="7" r="7" fill="#B6F0B6" />
                          <circle cx="7" cy="7" r="4" fill="#4BB34B" />
                        </svg>
                        <Text
                          weight="regular"
                          className="Text__Secondary"
                          style={{ marginLeft: 8 }}
                        >
                          Активно еще {moment(food.end_date).fromNow(true)}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Tappable>
              ))}
            </CardGrid>
          )}
        </Group>
      </Panel>

      <Detail id="detail" food={selectedFood} isOwn goBack={goBack} />
    </View>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
  token: PropTypes.string,
  ownFood: PropTypes.array,
  foodOwn: PropTypes.func,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  ownFood: state.food.own,
});

const mapDispatchToProps = (dispatch) => {
  return {
    foodOwn: (token) => dispatch(actions.foodOwn(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
