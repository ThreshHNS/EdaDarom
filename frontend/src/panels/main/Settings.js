import React, { useState } from "react";
import { connect } from "react-redux";
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

const Settings = ({
  id,
  activePanel,
  firstName,
  lastName,
  avatar,
  city,
  radius,
  notificationStatus,
}) => {
  const [settingsPanel, setSettingsPanel] = useState(activePanel);
  const [isNotifications, setIsNotifications] = useState(notificationStatus);

  const onBackClick = () => {
    setSettingsPanel(id);
  };

  return (
    <View id={id} activePanel={settingsPanel}>
      <Panel id={id}>
        <PanelHeader>Настройки</PanelHeader>
        <RichCell
          disabled
          before={<Avatar size={72} src={avatar} />}
          caption="Санкт-Петербург"
        >
          {firstName} {lastName}
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
              value={radius}
            >
              <option value="1">1 км</option>
              <option value="2">2 км</option>
              <option value="3">3 км</option>
              <option value="4">4 км</option>
              <option value="5">5 км</option>
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

const mapStateToProps = (state) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  city: state.user.city,
  avatar: state.user.avatar,
  radius: state.user.radius,
  notificationStatus: state.user.notificationStatus,
});

export default connect(mapStateToProps)(Settings);
