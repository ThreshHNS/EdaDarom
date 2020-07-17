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
import { getGeoInfo } from "../../utils/";
import * as actions from "../../store/actions/user";

const YANDEX_API_KEY = process.env.REACT_APP_YANDEX_API_KEY;

const Location = ({ id, token, locationCoords, userUpdate, onBackClick }) => {
  const [suggestValue, setSuggestValue] = useState("");
  const [suggestView, setSuggestView] = useState();
  const [yMaps, setYMaps] = useState();
  const [geoLocation, setGeoLocation] = useState({
    currentGeo: {},
    coordinates: null,
    title: null,
    address: null,
  });
  const mapRef = useRef();

  useEffect(() => {
    if (locationCoords) {
      setGeoLocation({
        currentGeo: {
          center: locationCoords,
          zoom: 12,
        },
        coordinates: [locationCoords],
      });
    }
  }, [locationCoords]);

  useEffect(() => {
    if (suggestView) {
      const addSuggestItem = (e) => {
        const itemValue = e.get("item").value;
        setSuggestValue(itemValue);
        const result = yMaps.geocode(itemValue);
        result.then((res) => {
          const firstGeoObject = res.geoObjects.get(0);
          const { coords, bounds, address, title } = getGeoInfo(firstGeoObject);
          console.log("bounds", bounds);
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
  }, [suggestView, yMaps, geoLocation]);

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
        <YMaps query={{ apikey: YANDEX_API_KEY }}>
          <Map
            onClick={onMapClick}
            onLoad={(ymaps) => onLoadMap(ymaps)}
            options={{ suppressMapOpenBlock: true }}
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
  token: PropTypes.string,
  userUpdate: PropTypes.func,
  onBackClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  locationCoords: state.user.locationCoords,
});

const mapDispatchToProps = (dispatch) => {
  return {
    userUpdate: (token, user) => dispatch(actions.userUpdate(token, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
