import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Panel, PanelHeader } from "@vkontakte/vkui";

const Favorite = ({ id, activePanel }) => {
  return (
    <View id={id} activePanel={activePanel}>
      <Panel id={id}>
        <PanelHeader>Любимое</PanelHeader>
      </Panel>
    </View>
  );
};

Favorite.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
};

export default Favorite;
