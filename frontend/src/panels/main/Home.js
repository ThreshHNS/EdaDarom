import React, { useState } from "react";
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
import Detail from "./Detail";

const Home = ({ id, activePanel }) => {
  const [feedPanel, setFeedPanel] = useState(activePanel);

  const getDetails = (id) => {
    console.log(id);
    setFeedPanel("detail");
  };

  const onBackClick = () => {
    setFeedPanel(id);
  };

  return (
    <View id={id} activePanel={feedPanel}>
      <Panel id={id}>
        <PanelHeader>Мои объявления</PanelHeader>
        <Group separator="hide">
          <CardGrid>
            {/* TODO: IOS Style */}
            <Tappable>
              <div className="Card__Product" onClick={() => getDetails(123)}>
                <div className="Card__Product_image">
                  <img src={product4} alt="Product Preview" />
                </div>
                <div className="Card__Product_info">
                  <Title
                    level="2"
                    weight="semibold"
                    className="Card__Product_info_title"
                  >
                    Батон нарезной
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
                      Активно еще 2 дня
                    </Text>
                  </div>
                </div>
              </div>
            </Tappable>
            <Tappable>
              <div className="Card__Product" onClick={() => getDetails(123)}>
                <div className="Card__Product_image">
                  <img src={product5} alt="Product Preview" />
                </div>
                <div className="Card__Product_info">
                  <Title
                    level="2"
                    weight="semibold"
                    className="Card__Product_info_title"
                  >
                    Комплексный обед
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
                      Активно еще 5 часов
                    </Text>
                  </div>
                </div>
              </div>
            </Tappable>
          </CardGrid>
        </Group>
      </Panel>

      <Detail id="detail" productId={35} isOwn onBackClick={onBackClick} />
    </View>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
};

export default Home;
