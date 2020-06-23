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
import product1 from "../../img/product1.png";
import product2 from "../../img/product2.png";
import product3 from "../../img/product3.png";
import product4 from "../../img/product4.png";
import * as actions from "../../store/actions/food";
import { moment } from "../../utils";

import Detail from "./Detail";

const Feed = ({ id, activePanel, vkId, nearestFood, foodNearest }) => {
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
    if (vkId) {
      foodNearest(vkId);
    }
  }, [vkId, foodNearest]);

  return (
    <View id={id} activePanel={feedPanel}>
      <Panel id={id}>
        <PanelHeader>Еда даром</PanelHeader>
        <Group separator="hide">
          {nearestFood.length > 0 && (
            <CardGrid>
              {nearestFood.map((food) => (
                <Tappable key={food.id} onClick={() => getDetails(food)}>
                  <div className="Card__Product">
                    <div className="Card__Product_image">
                      <img src={food.photo_url} alt="Product Preview" />
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
                        <Icon24Place className="Card__Icon" />
                        <Text weight="regular" style={{ marginLeft: 4 }}>
                          {Math.floor(food.distance)} метров
                        </Text>
                      </div>
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

      <Detail id="detail" food={selectedFood} onBackClick={onBackClick} />
    </View>
  );
};

Feed.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  vkId: state.user.vkId,
  nearestFood: state.food.nearest,
});

const mapDispatchToProps = (dispatch) => {
  return {
    foodNearest: (id) => dispatch(actions.foodNearest(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
