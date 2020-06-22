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
import Icon32Place from "@vkontakte/icons/dist/32/place";
import product1fSize from "../../img/product1_fullsize.png";

const Detail = ({ id, productId, isOwn, onBackClick }) => {
  return (
    <Panel id={id}>
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
          Фасоль в банке
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
            Фасоль в банках, остался месяц до истечения срока годности.
          </InfoRow>
        </SimpleCell>
      </Group>
      <Group>
        {!isOwn ? (
          <Div>
            <Button size="xl" href="https://vk.com/im?sel=53369046">
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
    </Panel>
  );
};

Detail.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
  isOwn: PropTypes.bool,
};

export default Detail;
