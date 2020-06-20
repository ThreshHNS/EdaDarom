import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  Panel,
  PanelHeader,
  RichCell,
  Cell,
  Switch,
  Select,
  FormLayout,
  Avatar,
  Text,
  Group,
  Tappable,
} from "@vkontakte/vkui";
import Icon32Place from "@vkontakte/icons/dist/32/place";

import Location from "./Location";

const Settings = ({ id, activePanel }) => {
  const [settingsPanel, setSettingsPanel] = useState(activePanel);
  const [isNotifications, setIsNotifications] = useState(true);

  const onBackClick = () => {
    setSettingsPanel(id);
  };

  return (
    <View id={id} activePanel={settingsPanel}>
      <Panel id={id}>
        <PanelHeader>Локация</PanelHeader>
        <RichCell
          disabled
          before={
            <Avatar
              size={72}
              src={
                "https://sun9-58.userapi.com/c841434/v841434178/39c39/1epfQKlYgkI.jpg"
              }
            />
          }
          caption="Санкт-Петербург"
        >
          Андрей Вельц
        </RichCell>
        <Group>
          <Cell
            description="Получать уведомления о еде рядом."
            asideContent={
              <Switch
                checked={isNotifications}
                onChange={() => setIsNotifications(!isNotifications)}
              />
            }
          >
            Уведомления
          </Cell>
        </Group>
        <Group>
          <FormLayout>
            <Select
              disabled={!isNotifications}
              top="Радиус поиска"
              placeholder="Укажите радиус поиска еды"
            >
              <option value="m">Мужской</option>
              <option value="f">Женский</option>
            </Select>
          </FormLayout>
        </Group>
        <Group>
          <Tappable onClick={() => setSettingsPanel("location")}>
            <Cell before={<Icon32Place />}>
              <Text weight="medium">Наб.Обводного канала,17</Text>
              <Text weight="regular" className="Text__Secondary">
                0.4км от вас
              </Text>
            </Cell>
          </Tappable>
        </Group>
      </Panel>

      <Location id="location" onBackClick={onBackClick} />
    </View>
  );
};

Settings.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
};

export default Settings;
