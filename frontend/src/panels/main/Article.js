import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Panel, PanelHeader } from "@vkontakte/vkui";

const Article = ({ id, activePanel }) => {
  return (
    <View id={id} activePanel={activePanel}>
      <Panel id={id}>
        <PanelHeader>Предложения</PanelHeader>
      </Panel>
    </View>
  );
};

Article.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
};

export default Article;
