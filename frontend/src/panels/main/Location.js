import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Search,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FixedLayout,
} from "@vkontakte/vkui";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import bridge from "@vkontakte/vk-bridge";
import { getGeoInfo } from "../../utils/";
import * as actions from "../../store/actions/user";

const Location = ({ id, onBackClick, token, userUpdate }) => {
  const [suggestValue, setSuggestValue] = useState("");
  const [suggestView, setSuggestView] = useState();
  const [yMaps, setYMaps] = useState();
  const [geoLocation, setGeoLocation] = useState({
    lat: null,
    long: null,
    firstEntry: false,
    currentGeo: {},
    coordinates: null,
    title: null,
    address: null,
  });
  const mapRef = useRef();

  useEffect(() => {
    bridge.send("VKWebAppGetGeodata").then((data) => {
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
    });
  }, []);

  useEffect(() => {
    if (suggestView) {
      const addSuggestItem = (e) => {
        const itemValue = e.get("item").value;
        setSuggestValue(itemValue);
        const result = yMaps.geocode(itemValue);
        result.then((res) => {
          const firstGeoObject = res.geoObjects.get(0);
          const { coords, bounds, address, title } = getGeoInfo(firstGeoObject);
          mapRef.current.setBounds(bounds);
          setGeoLocation({
            ...geoLocation,
            coordinates: [coords],
            address,
            title,
          });
        });
      };

      suggestView.events.add("select", addSuggestItem);

      return () => {
        suggestView.events.remove("select", addSuggestItem);
      };
    }
  }, [suggestView, yMaps]);

  useEffect(() => {
    if (token && geoLocation.coordinates && geoLocation.address) {
      const [country, ...city] = geoLocation.address.split(", ", 3);
      const location_title = geoLocation.title;
      const geo = {
        type: "Point",
        coordinates: geoLocation.coordinates[0],
      };
      const user = {
        location_coordinates: geo,
        country,
        city: city.join(", "),
        location_title,
      };
      userUpdate(token, user);
    }
  }, [token, userUpdate, geoLocation]);

  const onLoadMap = (ymaps) => {
    const suggestView = new ymaps.SuggestView("suggest");
    setSuggestView(suggestView);
    setYMaps(ymaps);
  };

  const onMapClick = (e) => {
    const clickPos = e.get("coords");
    const result = yMaps.geocode(clickPos);
    result.then((res) => {
      const firstGeoObject = res.geoObjects.get(0);
      const { coords, bounds, address, title } = getGeoInfo(firstGeoObject);
      mapRef.current.setBounds(bounds);
      setGeoLocation({ ...geoLocation, coordinates: [coords], address, title });
      setSuggestValue(address);
    });
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => onBackClick()} />}>
        Локация
      </PanelHeader>
      <FixedLayout style={{ width: "100%" }}>
        <Search
          type="text"
          id="suggest"
          value={suggestValue}
          onChange={(e) => setSuggestValue(e.target.value)}
          style={{ width: "100%" }}
        />
      </FixedLayout>

      {geoLocation.coordinates && (
        <YMaps query={{ apikey: "" }}>
          <Map
            onClick={onMapClick}
            onLoad={(ymaps) => onLoadMap(ymaps)}
            defaultState={geoLocation.currentGeo}
            modules={["SuggestView", "geocode"]}
            instanceRef={mapRef}
            width="100%"
            height="85%"
            style={{ position: "absolute", width: "100%", height: "85%" }}
          >
            {geoLocation.coordinates.map((coordinate) => (
              <Placemark key={coordinate} geometry={coordinate} />
            ))}
          </Map>
        </YMaps>
      )}
    </Panel>
  );
};

Location.propTypes = {
  id: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    userUpdate: (token, user) => dispatch(actions.userUpdate(token, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
