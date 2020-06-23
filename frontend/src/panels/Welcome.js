import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import {
  View,
  Panel,
  ModalRoot,
  ModalCard,
  PanelHeader,
  Button,
  Group,
  Div,
  Gallery,
  Header,
  Text,
  ModalPageHeader,
  Spinner,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import * as actions from "../store/actions/user";

import pizza from "../img/pizza.png";
import person from "../img/person.png";
import home from "../img/home.png";

const Welcome = ({ id, activePanel, setActivePanel, popout, go, userPost }) => {
  const [galleryPage, setGalleryPage] = useState(0);
  const [geoLocation, setGeoLocation] = useState({
    lat: null,
    long: null,
    firstEntry: false,
    currentGeo: {},
    coordinates: null,
  });
  const [geoModal, setGeoModal] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [vkUser, setVkUser] = useState();

  useEffect(() => {
    if (vkUser && geoLocation && geoLocation.coordinates) {
      console.log("geo", geoLocation);
      const geo = {
        type: "Point",
        coordinates: geoLocation.currentGeo.center,
      };
      const user = {
        vk_id: vkUser.id,
        first_name: vkUser.first_name,
        last_name: vkUser.last_name,
        avatar_url: vkUser.photo_max_orig,
        location_coordinates: geo,
      };
      userPost(user);
      localStorage.setItem("alreadyLaunched", true);
    }
  }, [vkUser, geoLocation, userPost]);

  useEffect(() => {
    if (galleryPage === 2) {
      bridge
        .send("VKWebAppGetUserInfo")
        .then((data) => {
          setVkUser(data);
        })
        .catch((error) => {
          console.log(error);
        });

      bridge
        .send("VKWebAppGetGeodata")
        .then((data) => {
          console.log("geodata", data);
          // Обработка события в случае успеха
          if (data.available) {
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
          }
        })
        .catch((error) => {
          console.log(error);
          // Обработка события в случае ошибки
        });
    }
  }, [galleryPage]);

  const modal = (
    <ModalRoot activeModal={geoModal}>
      <ModalCard
        id="geo"
        onClose={() => setGeoModal(null)}
        header={<ModalPageHeader>Ты на карте</ModalPageHeader>}
      >
        {!mapVisible && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Spinner size="large" />
          </div>
        )}
        {geoLocation.coordinates && (
          <YMaps>
            <div style={{ marginTop: 20, marginBottom: 12 }}>
              <Map
                width="100% "
                defaultState={geoLocation.currentGeo}
                instanceRef={(ref) => {
                  ref && ref.behaviors.disable("drag") && setMapVisible(true);
                }}
              >
                {geoLocation.coordinates.map((coordinate) => (
                  <Placemark key={coordinate} geometry={coordinate} />
                ))}
              </Map>
            </div>
          </YMaps>
        )}
        <Button
          size="l"
          stretched
          onClick={() => setActivePanel("main")}
          style={{ padding: "4px 0px" }}
        >
          Сохранить
        </Button>
      </ModalCard>
    </ModalRoot>
  );

  const FirstSlide = () => (
    <Panel id={id} centered>
      <div className="Welcome__Icon">
        <img src={pizza} alt="Pizza Icon" />
      </div>
      <Text
        weight="regular"
        style={{ textAlign: "center", width: "75%", color: "#404040" }}
      >
        Ежегодно в мире выбрасывается около 884 млн тонн еды...
      </Text>
    </Panel>
  );

  const SecondSlide = () => (
    <Panel id={id} centered>
      <div className="Welcome__Icon">
        <img src={person} alt="Soup Icon" />
      </div>
      <Text
        weight="regular"
        style={{ textAlign: "center", width: "70%", color: "#404040" }}
      >
        Но зачем выбрасывать, если можно ее кому-нибудь отдать?
      </Text>
    </Panel>
  );

  const ThirdSlide = () => (
    <Panel id={id} centered>
      <div className="Welcome__Icon">
        <img src={home} alt="Location Icon" />
      </div>
      <Text
        weight="regular"
        style={{ textAlign: "center", width: "75%", color: "#404040" }}
      >
        Обменивайся лишней едой с теми, кто живет неподалеку.
      </Text>
    </Panel>
  );

  const renderButton = (page) => {
    switch (page) {
      case 0:
        return (
          <Button
            size="l"
            stretched
            className="Welcome__Button"
            style={{ margin: "0px 20px", padding: "4px 0px" }}
            onClick={() => setGalleryPage(1)}
          >
            Это ужасно!
          </Button>
        );
      case 1:
        return (
          <Button
            size="l"
            stretched
            className="Welcome__Button"
            style={{ margin: "0px 20px", padding: "4px 0px" }}
            onClick={() => setGalleryPage(2)}
          >
            Действительно
          </Button>
        );
      case 2:
        return (
          <Button
            size="l"
            stretched
            mode="commerce"
            className="Welcome__Button"
            style={{ margin: "0px 20px", padding: "4px 0px" }}
            onClick={() => setGeoModal("geo")}
          >
            Определить локацию
          </Button>
        );
      default:
        return (
          <Button size="l" stretched>
            Согласен!
          </Button>
        );
    }
  };
  return (
    <View activePanel={activePanel} popout={popout} modal={modal}>
      <Panel id={id}>
        <PanelHeader>Еда даром</PanelHeader>

        <Group header={<Header mode="secondary"></Header>}>
          <Gallery
            slideWidth="100%"
            style={{ height: "100%", paddingBottom: 85, postion: "relative" }}
            bullets="dark"
            onChange={(number) => setGalleryPage(number)}
            slideIndex={galleryPage}
          >
            <FirstSlide />
            <SecondSlide />
            <ThirdSlide />
          </Gallery>
        </Group>
        <Div style={{ display: "flex", marginTop: 15 }}>
          {renderButton(galleryPage)}
        </Div>
      </Panel>
    </View>
  );
};

Welcome.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    userPost: (user) => dispatch(actions.userPost(user)),
  };
};

export default connect(null, mapDispatchToProps)(Welcome);
