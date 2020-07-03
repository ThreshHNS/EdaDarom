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
  country,
  radius,
  locationTitle,
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
          caption={country}
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
              <Text weight="medium">{locationTitle}</Text>
              <Text weight="regular" className="Text__Secondary">
                {city}
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
  country: state.user.country,
  avatar: state.user.avatar,
  radius: state.user.radius,
  locationTitle: state.user.locationTitle,
  notificationStatus: state.user.notificationStatus,
});

export default connect(mapStateToProps)(Settings);
