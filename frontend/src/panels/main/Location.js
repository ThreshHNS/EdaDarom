import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import bridge from "@vkontakte/vk-bridge";

const Location = ({ id, onBackClick }) => {
  const [geoLocation, setGeoLocation] = useState({
    lat: null,
    long: null,
    firstEntry: false,
    currentGeo: {},
    coordinates: null,
  });
  const style = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "70%",
  };

  useEffect(() => {
    bridge
      .send("VKWebAppGetGeodata")
      .then((data) => {
        // Обработка события в случае успеха
        setGeoLocation({
          lat: data.lat,
          long: data.long,
          firstEntry: false,
          currentGeo: {
            center: [data.lat, data.long],
            zoom: 15,
          },
          coordinates: [[data.lat, data.long]],
        });
        console.log(data);
      })
      .catch((error) => {
        // Обработка события в случае ошибки
      });
  }, []);
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => onBackClick()} />}>
        Локация
      </PanelHeader>
      {geoLocation.coordinates && (
        <YMaps>
          <Map
            defaultState={geoLocation.currentGeo}
            instanceRef={(ref) => {
              ref && ref.behaviors.disable("drag");
            }}
            style={style}
          >
            {geoLocation.coordinates.map((coordinate) => (
              <Placemark geometry={coordinate} />
            ))}
          </Map>
        </YMaps>
      )}
    </Panel>
  );
};

Location.propTypes = {
  id: PropTypes.string.isRequired,
  onBackClick: PropTypes.string.isRequired,
};

export default Location;
