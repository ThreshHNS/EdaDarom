import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  View,
  Panel,
  PanelHeader,
  Placeholder,
  Button,
  CardGrid,
  Title,
  Text,
  Group,
  Tappable,
  PullToRefresh,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import Icon56InfoOutline from "@vkontakte/icons/dist/56/info_outline";
import * as actions from "../../store/actions/food";
import { moment } from "../../utils";

import Detail from "./Detail";
import Edit from "./Edit";

const Home = ({
  token,
  id,
  ownFood,
  isLoading,
  foodOwn,
  activePanel,
  setActiveStory,
}) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [homePanel, setHomePanel] = useState(activePanel);
  const [historyPanel, setHistoryPanel] = useState([activePanel]);
  const [popout, setPopout] = useState(null);

  useEffect(() => {
    if (token && !ownFood.length) {
      foodOwn(token);
    }
  }, [token, ownFood.length, foodOwn]);

  useEffect(() => {
    if (selectedFood) {
      const updatedFood = ownFood.find((item) => item.id === selectedFood.id);
      setSelectedFood(updatedFood);
    }
  }, [ownFood, selectedFood]);

  const getDetails = (food) => {
    const history = [...historyPanel];
    history.push("detail");
    if (homePanel === activePanel) {
      bridge.send("VKWebAppEnableSwipeBack");
    }
    setSelectedFood(food);
    setHistoryPanel(history);
    setHomePanel("detail");
  };

  const editFood = () => {
    const history = [...historyPanel];
    history.push("edit");
    if (homePanel === activePanel) {
      bridge.send("VKWebAppEnableSwipeBack");
    }
    setHistoryPanel(history);
    setHomePanel("edit");
  };

  const goBack = () => {
    const history = [...historyPanel];
    history.pop();
    const currentPanel = history[history.length - 1];
    if (currentPanel === activePanel) {
      bridge.send("VKWebAppDisableSwipeBack");
    }
    setHistoryPanel(history);
    setHomePanel(currentPanel);
  };

  const onRefresh = () => {
    if (token) {
      foodOwn(token);
    }
  };

  return (
    <View
      id={id}
      popout={popout}
      history={historyPanel}
      activePanel={homePanel}
      onSwipeBack={goBack}
    >
      <Panel id={id}>
        <PanelHeader>Мои объявления</PanelHeader>
        <PullToRefresh onRefresh={onRefresh} isFetching={isLoading}>
          <Group separator="hide">
            {ownFood.length > 0 ? (
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
            ) : (
              <Placeholder
                icon={<Icon56InfoOutline />}
                action={
                  <Button
                    size="l"
                    mode="tertiary"
                    onClick={() => setActiveStory("add")}
                  >
                    Опубликовать еду
                  </Button>
                }
                stretched
              >
                У вас еще нет
                <br />
                выставленных объявлений
              </Placeholder>
            )}
          </Group>
        </PullToRefresh>
      </Panel>

      <Detail
        id="detail"
        food={selectedFood}
        editFood={editFood}
        isOwn
        goBack={goBack}
      />

      <Edit
        id="edit"
        food={selectedFood}
        setPopout={setPopout}
        goBack={goBack}
      />
    </View>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
  token: PropTypes.string,
  ownFood: PropTypes.array,
  isLoading: PropTypes.bool,
  foodOwn: PropTypes.func,
  setActiveStory: PropTypes.func,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  ownFood: state.food.own,
  isLoading: state.food.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    foodOwn: (token) => dispatch(actions.foodOwn(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
