import React from "react";
import PropTypes from "prop-types";
import { View, Panel, PanelHeader, Text } from "@vkontakte/vkui";
import rating from "../../img/rating.png";

const Rating = ({ id, activePanel }) => {
  return (
    <View id={id} activePanel={activePanel}>
      <Panel id={id} centered>
        <PanelHeader>Рейтинг</PanelHeader>
        <div className="Welcome__Icon">
          <img src={rating} alt="Rating Icon" />
        </div>
        <Text
          weight="regular"
          style={{ textAlign: "center", width: "75%", color: "#404040" }}
        >
          Скоро мы добавим рейтинги и каждый сможет доказать насколько он крут
        </Text>
      </Panel>
    </View>
  );
};

Rating.propTypes = {
  id: PropTypes.string.isRequired,
  activePanel: PropTypes.string.isRequired,
};

export default Rating;
