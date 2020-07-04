import React, { useState } from "react";
import { connect } from "react-redux";
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
import * as actions from "../../store/actions/food";

const Detail = ({ id, token, food, isOwn, foodUpdate, foodDelete, goBack }) => {
  const [isTaken, setIsTaken] = useState(false);

  const updateStatus = () => {
    if (token && food) {
      foodUpdate(token, food.id, { status: "Done" });
      setIsTaken(true);
    }
  };

  const deleteFood = () => {
    if (token && food) {
      foodDelete(token, food.id);
      goBack();
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>
        Подробнее
      </PanelHeader>
      {food && (
        <>
          <CardGrid>
            <Card size="l" style={{ marginTop: 14 }}>
              <img
                src={food.image}
                style={{
                  height: 193,
                  width: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
                alt="Product Preview"
              />
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
              <InfoRow header="Описание">
                {food.description ? food.description : "Отсутствует "}
              </InfoRow>
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
                  <Button disabled={isTaken} size="xl" onClick={updateStatus}>
                    Забрали
                  </Button>
                </Div>
                <Div>
                  <Button size="xl" mode="secondary">
                    Редактировать
                  </Button>
                </Div>
                <Div>
                  <Button
                    size="xl"
                    mode="secondary"
                    className="Button__Remove"
                    onClick={deleteFood}
                  >
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
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    foodUpdate: (token, id, food) =>
      dispatch(actions.foodUpdate(token, id, food)),
    foodDelete: (token, id) => dispatch(actions.foodDelete(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
