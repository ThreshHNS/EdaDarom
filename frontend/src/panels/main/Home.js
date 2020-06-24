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
import Icon24Place from "@vkontakte/icons/dist/24/place";
import product4 from "../../img/product4.png";
import product5 from "../../img/product5.png";
import product6 from "../../img/product6.png";
import * as actions from "../../store/actions/food";
import { moment } from "../../utils";
import Detail from "./Detail";

const Home = ({ token, id, vkId, ownFood, foodOwn, activePanel }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [feedPanel, setFeedPanel] = useState(activePanel);

  const getDetails = (food) => {
    setSelectedFood(food);
    setFeedPanel("detail");
  };

  const onBackClick = () => {
    setFeedPanel(id);
  };

  useEffect(() => {
    console.log("token", token);
  }, [token]);

  useEffect(() => {
    if (token && vkId) {
      foodOwn(token, vkId);
    }
  }, [vkId, token, foodOwn]);

  return (
    <View id={id} activePanel={feedPanel}>
      <Panel id={id}>
        <PanelHeader>Мои объявления</PanelHeader>
        <Group separator="hide">
          {ownFood.length > 0 && (
            <CardGrid>
              {ownFood.map((food) => (
                <Tappable key={food.id} onClick={() => getDetails(food)}>
                  <div className="Card__Product">
                    <div className="Card__Product_image">
                      <img src={food.image} alt="Product Preview" />
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
                          Активно еще {moment(food.duration).fromNow(true)}
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

      <Detail id="detail" food={selectedFood} isOwn onBackClick={onBackClick} />
    </View>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
  vkId: PropTypes.number,
  ownFood: PropTypes.array,
  foodOwn: PropTypes.func,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  vkId: state.user.vkId,
  ownFood: state.food.own,
});

const mapDispatchToProps = (dispatch) => {
  return {
    foodOwn: (token, id) => dispatch(actions.foodOwn(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
