import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  Button,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  CardGrid,
  Header,
  Cell,
  Separator,
  Title,
  Text,
  Card,
  Group,
  Div,
  Tappable,
  SimpleCell,
  InfoRow,
} from "@vkontakte/vkui";
import Icon32Place from "@vkontakte/icons/dist/32/place";
import Icon28Place from "@vkontakte/icons/dist/28/place";
import Icon24Place from "@vkontakte/icons/dist/24/place";
import product1 from "../../img/product1.png";
import product2 from "../../img/product2.png";
import product3 from "../../img/product3.png";
import product1fSize from "../../img/product1_fullsize.png";

const Feed = ({ id, activePanel }) => {
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
        <PanelHeader>Еда даром</PanelHeader>
        <Group separator="hide">
          <CardGrid>
            {/* TODO: IOS Style */}
            <Tappable>
              <div className="Card__Product" onClick={() => getDetails(123)}>
                <div className="Card__Product_image">
                  <img src={product1} alt="Product Image" />
                </div>
                <div className="Card__Product_info">
                  <Title
                    level="2"
                    weight="semibold"
                    style={{ marginBottom: 16 }}
                  >
                    Бабушкин супчик
                  </Title>
                  <div className="Card__Product_info_text">
                    <Icon24Place className="Card__Icon" />
                    <Text weight="regular" style={{ marginLeft: 4 }}>
                      200 метров
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
                      Активно еще 2 дня
                    </Text>
                  </div>
                </div>
              </div>
            </Tappable>
            <Tappable>
              <div className="Card__Product" onClick={() => getDetails(123)}>
                <div className="Card__Product_image">
                  <img src={product3} alt="Product Image" />
                </div>
                <div className="Card__Product_info">
                  <Title
                    level="2"
                    weight="semibold"
                    style={{ marginBottom: 16 }}
                  >
                    Пицца Пупа Жонс
                  </Title>
                  <div className="Card__Product_info_text">
                    <Icon24Place className="Card__Icon" />
                    <Text weight="regular" style={{ marginLeft: 4 }}>
                      400 метров
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
                      Активно еще 5 часов
                    </Text>
                  </div>
                </div>
              </div>
            </Tappable>
            <Tappable>
              <div className="Card__Product" onClick={() => getDetails(123)}>
                <div className="Card__Product_image">
                  <img src={product2} alt="Product Image" />
                </div>
                <div className="Card__Product_info">
                  <Title
                    level="2"
                    weight="semibold"
                    style={{ marginBottom: 16 }}
                  >
                    Яйца домашние
                  </Title>
                  <div className="Card__Product_info_text">
                    <Icon24Place className="Card__Icon" />
                    <Text weight="regular" style={{ marginLeft: 4 }}>
                      620 метров
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
                      Активно еще 9 часов
                    </Text>
                  </div>
                </div>
              </div>
            </Tappable>
            <Tappable>
              <div className="Card__Product" onClick={() => getDetails(123)}>
                <div className="Card__Product_image">
                  <img src={product2} alt="Product Image" />
                </div>
                <div className="Card__Product_info">
                  <Title
                    level="2"
                    weight="semibold"
                    style={{ marginBottom: 16 }}
                  >
                    Яйца домашние
                  </Title>
                  <div className="Card__Product_info_text">
                    <Icon24Place className="Card__Icon" />
                    <Text weight="regular" style={{ marginLeft: 4 }}>
                      400 метров
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
                      Активно еще 5 часов
                    </Text>
                  </div>
                </div>
              </div>
            </Tappable>
            <Tappable>
              <div className="Card__Product" onClick={() => getDetails(123)}>
                <div className="Card__Product_image">
                  <img src={product2} alt="Product Image" />
                </div>
                <div className="Card__Product_info">
                  <Title
                    level="2"
                    weight="semibold"
                    style={{ marginBottom: 16 }}
                  >
                    Яйца домашние
                  </Title>
                  <div className="Card__Product_info_text">
                    <Icon24Place className="Card__Icon" />
                    <Text weight="regular" style={{ marginLeft: 4 }}>
                      400 метров
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
                      Активно еще 5 часов
                    </Text>
                  </div>
                </div>
              </div>
            </Tappable>
          </CardGrid>
        </Group>
      </Panel>

      <Panel id="detail">
        <PanelHeader left={<PanelHeaderBack onClick={() => onBackClick()} />}>
          Подробнее
        </PanelHeader>
        <CardGrid>
          <Card
            size="l"
            style={{
              backgroundImage: `url(${product1fSize})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
          >
            <div style={{ height: 183 }} />
          </Card>
        </CardGrid>
        <Group>
          <Title level="2" weight="semibold" style={{ marginLeft: 16 }}>
            Бабушкин супчик
          </Title>

          <Cell
            before={
              <svg width="14" height="14" viewBox="0 0 14 14">
                <circle cx="7" cy="7" r="7" fill="#B6F0B6" />
                <circle cx="7" cy="7" r="4" fill="#4BB34B" />
              </svg>
            }
          >
            <Text
              weight="regular"
              className="Text__Secondary"
              style={{ marginLeft: 8 }}
            >
              Активно еще 5 часов
            </Text>
          </Cell>
        </Group>
        <Group>
          <Cell before={<Icon32Place />}>
            <Text weight="medium">Наб.Обводного канала,17</Text>
            <Text weight="regular" className="Text__Secondary">
              0.4км от вас
            </Text>
          </Cell>
        </Group>
        <Group>
          <SimpleCell multiline>
            <InfoRow header="Описание">
              Любимый супчик моей бабушки. Отдаю нуждающимся.
            </InfoRow>
          </SimpleCell>
        </Group>
        <Group>
          <Div>
            <Button size="xl">Забрать</Button>
          </Div>
        </Group>
      </Panel>
    </View>
  );
};

Feed.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
};

export default Feed;
