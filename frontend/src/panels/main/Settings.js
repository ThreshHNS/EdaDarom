import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Panel, PanelHeader } from "@vkontakte/vkui";

const Settings = ({ id, activePanel }) => {
  return (
    <View id={id} activePanel={activePanel}>
      <Panel id={id}>
        <PanelHeader>Настройки</PanelHeader>
      </Panel>
    </View>
  );
};

Settings.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
};

export default Settings;
