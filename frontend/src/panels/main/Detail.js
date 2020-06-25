import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  CardGrid,
  Cell,
  Title,
  Text,
  Card,
  Group,
  Div,
  SimpleCell,
  InfoRow,
} from "@vkontakte/vkui";
import { moment } from "../../utils";
import Icon32Place from "@vkontakte/icons/dist/32/place";

const Detail = ({ id, food, isOwn, onBackClick }) => {
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => onBackClick()} />}>
        Подробнее
      </PanelHeader>
      {food && (
        <>
          <CardGrid>
            <Card
              size="l"
              style={{
                backgroundImage: `url(${food.image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                marginTop: 14,
              }}
            >
              <div style={{ height: 183 }} />
            </Card>
          </CardGrid>
          <Group>
            <Title level="2" weight="semibold" style={{ marginLeft: 16 }}>
              {food.title}
            </Title>

            <Cell
              before={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  style={{ marginTop: 6 }}
                >
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
                Активно еще {moment(food.end_date).fromNow(true)}
              </Text>
            </Cell>
          </Group>
          {food.distance && (
            <Group>
              <Cell before={<Icon32Place />}>
                <Text weight="medium">Наб.Обводного канала,17</Text>
                <Text weight="regular" className="Text__Secondary">
                  {Math.floor(food.distance.toFixed(1) / 1000)}км от вас
                </Text>
              </Cell>
            </Group>
          )}
          <Group>
            <SimpleCell multiline>
              <InfoRow header="Описание">{food.description}</InfoRow>
            </SimpleCell>
          </Group>
          <Group>
            {!isOwn ? (
              <Div>
                <Button
                  size="xl"
                  href={`https://vk.com/im?sel=${food.user.properties.vk_id}`}
                >
                  Забрать
                </Button>
              </Div>
            ) : (
              <>
                <Div>
                  <Button size="xl">Забрали</Button>
                </Div>
                <Div>
                  <Button size="xl" mode="secondary">
                    Редактировать
                  </Button>
                </Div>
                <Div>
                  <Button size="xl" mode="secondary" className="Button__Remove">
                    Удалить
                  </Button>
                </Div>
              </>
            )}
          </Group>
        </>
      )}
    </Panel>
  );
};

Detail.propTypes = {
  id: PropTypes.string.isRequired,
  food: PropTypes.object,
  isOwn: PropTypes.bool,
  onBackClick: PropTypes.func.isRequired,
};

export default Detail;
