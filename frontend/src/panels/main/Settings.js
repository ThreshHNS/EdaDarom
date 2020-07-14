import React, { useState, useEffect } from "react";
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
  FixedLayout,
  Div,
  Link,
} from "@vkontakte/vkui";
import Icon32Place from "@vkontakte/icons/dist/32/place";
import * as actions from "../../store/actions/user";

import Location from "./Location";

const Settings = ({
  token,
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
  userUpdate,
}) => {
  const userProfile = {
    notifications_radius: radius,
    notifications_status: notificationStatus,
  };
  const [settingsPanel, setSettingsPanel] = useState(activePanel);
  const [profileValue, setProfileValue] = useState({
    notifications_radius: radius,
    notifications_status: notificationStatus,
  });

  useEffect(() => {
    setProfileValue({
      notifications_radius: radius,
      notifications_status: notificationStatus,
    });
  }, [radius, notificationStatus]);

  useEffect(() => {
    if (token && JSON.stringify(profileValue) !== JSON.stringify(userProfile)) {
      userUpdate(token, profileValue);
    }
  }, [token, profileValue]);

  const onChangeStatus = (e) => {
    const { name } = e.currentTarget;
    setProfileValue({ ...profileValue, [name]: !profileValue[name] });
  };

  const onChangeRadius = (e) => {
    const { name, value } = e.currentTarget;
    setProfileValue({ ...profileValue, [name]: parseInt(value) });
  };

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
                name="notifications_status"
                checked={profileValue["notifications_status"]}
                onChange={onChangeStatus}
              />
            }
          >
            Уведомления
          </Cell>
        </Group>
        <Group>
          <FormLayout>
            <Select
              name="notifications_radius"
              top="Радиус поиска"
              placeholder="Укажите радиус поиска еды"
              value={profileValue["notifications_radius"]}
              onChange={onChangeRadius}
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

        <FixedLayout vertical="bottom">
          <Div className="Settings__Footer">
            <Text>Наше сообщество:</Text>
            <Link href="https://vk.com/eda_darom_app">Еда даром</Link>
            <Text style={{ marginTop: 4, marginBottom: 4 }}>🍕</Text>
            <Text>Версия 0.1.2</Text>
          </Div>
        </FixedLayout>
      </Panel>

      <Location id="location" onBackClick={onBackClick} />
    </View>
  );
};

Settings.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
  token: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  radius: PropTypes.number,
  locationTitle: PropTypes.string,
  notificationStatus: PropTypes.bool,
  userUpdate: PropTypes.func,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  city: state.user.city,
  country: state.user.country,
  avatar: state.user.avatar,
  locationTitle: state.user.locationTitle,
  radius: state.user.radius,
  notificationStatus: state.user.notificationStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    userUpdate: (token, user) => dispatch(actions.userUpdate(token, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
